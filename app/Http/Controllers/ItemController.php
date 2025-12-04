<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Auth\UpdateItemRequest;
use App\Http\Requests\CreateItemRequest;
use App\Models\Item;
use App\Repository\ItemReadRepository;
use App\Repository\ItemWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

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
    public function getItemById(int $id): JsonResponse
    {
        return response()->json($this->itemReadRepository->getItemById($id));
    }

    public function destroy(int $id): RedirectResponse
    {
        $item = $this->itemReadRepository->getItemById($id);
        $this->itemWriteRepository->delete($item);

        return redirect()->route('items.list');
    }
    public function store(CreateItemRequest $createItemRequest): RedirectResponse
    {
        $item = $createItemRequest->all();
        $newItem = new Item($item);
        $this->itemWriteRepository->save($newItem);

        return redirect()->route('items.list');
    }

    public function update(UpdateItemRequest $request, int $id): JsonResponse
    {
        $item = $this->itemReadRepository->getItemById($id);
        $item->update($request->validated());

        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $item,
        ]);
    }

}
