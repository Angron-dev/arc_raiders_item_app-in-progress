<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use App\Repository\ItemReadRepository;
use App\Repository\ItemWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    private ItemReadRepository $itemReadRepository;
    private ItemWriteRepository $itemWriteRepository;

    public function __construct(ItemReadRepository $itemReadRepository, ItemWriteRepository $itemWriteRepository)
    {
        $this->itemReadRepository = $itemReadRepository;
        $this->itemWriteRepository = $itemWriteRepository;
    }

    public function list(Request $request): JsonResponse
    {
        $filters = $request->input();
        return response()->json($this->itemReadRepository->getPaginatedItems(filter: $filters));
    }
    public function show(int $id): JsonResponse
    {
        return response()->json($this->itemReadRepository->getItemById($id));
    }

    public function destroy(int $id): RedirectResponse
    {
        $item = $this->itemReadRepository->getItemById($id);
        $this->itemWriteRepository->delete($item);

        return redirect()->route('items.list');
    }
    public function store(CreateItemRequest $request): RedirectResponse
    {
        $itemData = $request->except('loot_areas');

        $newItem = new Item($itemData);
        $this->itemWriteRepository->save($newItem);

        $lootAreaIds = $request->input('loot_areas', []);
        if (!empty($lootAreaIds)) {
            $newItem->lootAreas()->sync($lootAreaIds);
        }

        return redirect()->route('items.list');
    }

    public function update(UpdateItemRequest $request, int $id): JsonResponse
    {
        $item = $this->itemReadRepository->getItemById($id);

        DB::transaction(function () use ($item, $request) {

            $item->update(
                $request->safe()->except('loot_areas')
            );
            $item->lootAreas()->sync(
                $request->validated('loot_areas')
            );
        });

        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $item->load('lootAreas'),
        ]);
    }

    public function getDeconstructComponents(int $id): JsonResponse
    {
        $item = $this->itemReadRepository->getItemById($id);
        $components = $item->deconstructComponents()->with(['rarity', 'lootAreas'])->get();
        return response()->json($components);
    }

    public function manageDeconstructComponents(Request $request, int $id): JsonResponse
    {
        $item = Item::findOrFail($id);

        $components = collect($request->input('components', []))
            ->mapWithKeys(fn ($c) => [
                $c['result_item_id'] => ['amount' => $c['amount']]
            ])
            ->toArray();

        $item->deconstructComponents()->sync($components);

        return response()->json([
            'message' => 'Deconstruct components synced',
            'components' => $components
        ]);
    }
}
