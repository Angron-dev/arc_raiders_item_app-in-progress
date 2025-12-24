<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateLootAreaRequest;
use App\Http\Requests\UpdateLootAreaRequest;
use App\Models\LootArea;
use App\Repository\LootAreaReadRepository;
use App\Repository\LootAreaWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class LootAreaController extends Controller
{
    private LootAreaReadRepository $lootAreaReadRepository;
    private LootAreaWriteRepository $lootAreaWriteRepository;

    public function __construct(
        LootAreaReadRepository $lootAreaReadRepository,
        LootAreaWriteRepository $lootAreaWriteRepository
    )
    {
        $this->lootAreaReadRepository = $lootAreaReadRepository;
        $this->lootAreaWriteRepository = $lootAreaWriteRepository;
    }

    public function getLootAreaById(int $id): JsonResponse
    {
        return response()->json($this->lootAreaReadRepository->getLootAreaById($id));
    }
    public function store(CreateLootAreaRequest $createLootAreaRequest): RedirectResponse
    {
        $itemLootArea = $createLootAreaRequest->all();
        $newItemLootArea = new LootArea($itemLootArea);
        $this->lootAreaWriteRepository->save($newItemLootArea);

        return redirect()->route('loot_area.list');
    }
    public function update(int $id, UpdateLootAreaRequest $updateLootAreaRequest): JsonResponse
    {
        $itemLootArea = $this->lootAreaReadRepository->getLootAreaById($id);
        $itemLootArea->update($updateLootAreaRequest->validated());
        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $itemLootArea,
        ]);
    }
    public function destroy(int $id): RedirectResponse
    {
        $itemLootArea = $this->lootAreaReadRepository->getLootAreaById($id);
        $this->lootAreaWriteRepository->delete($itemLootArea);

        return redirect()->route('loot_area.list');
    }
}
