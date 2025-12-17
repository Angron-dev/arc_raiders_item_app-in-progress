<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateItemTypeRequest;
use App\Http\Requests\UpdateItemCanBeFoundRequest;
use App\Http\Requests\UpdateItemTypeRequest;
use App\Models\ItemType;
use App\Repository\ItemTypeReadRepository;
use App\Repository\ItemTypeWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ItemTypeController extends Controller
{
    private ItemTypeWriteRepository $itemTypeWriteRepository;
    private ItemTypeReadRepository $itemTypeReadRepository;

    public function __construct(
        ItemTypeReadRepository $itemTypeReadRepository,
        ItemTypeWriteRepository $itemTypeWriteRepository
    )
    {
        $this->itemTypeReadRepository = $itemTypeReadRepository;
        $this->itemTypeWriteRepository = $itemTypeWriteRepository;
    }

    public function getItemTypeById(int $id): JsonResponse
    {
        return response()->json($this->itemTypeReadRepository->getItemTypeById($id));
    }
    public function store(CreateItemTypeRequest $createItemTypeRequest): RedirectResponse
    {
        $itemType = $createItemTypeRequest->all();
        $newItemType = new ItemType($itemType);
        $this->itemTypeWriteRepository->save($newItemType);

        return redirect()->route('item_type.list');
    }
    public function update(int $id, UpdateItemTypeRequest $updateItemTypeRequest): JsonResponse
    {
        $itemType = $this->itemTypeReadRepository->getItemTypeById($id);
        $itemType->update($updateItemTypeRequest->validated());
        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $itemType,
        ]);
    }
    public function destroy(int $id): RedirectResponse
    {
        $itemType = $this->itemTypeReadRepository->getItemTypeById($id);
        $this->itemTypeWriteRepository->delete($itemType);

        return redirect()->route('item_type.list');
    }
}
