<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateItemRarityRequest;
use App\Http\Requests\UpdateItemRarityRequest;
use App\Models\Rarity;
use App\Repository\RarityReadRepository;
use App\Repository\RarityWriteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class RarityController extends Controller
{
    private RarityReadRepository $rarityReadRepository;
    private RarityWriteRepository $rarityWriteRepository;

    public function __construct(
        RarityReadRepository $rarityReadRepository,
        RarityWriteRepository $rarityWriteRepository
    )
    {
        $this->rarityReadRepository = $rarityReadRepository;
        $this->rarityWriteRepository = $rarityWriteRepository;
    }

    public function getRarityById(int $id): JsonResponse
    {
        return response()->json($this->rarityReadRepository->getRarityById($id));
    }
    public function store(CreateItemRarityRequest $createRarityRequest): RedirectResponse
    {
        $itemRarity = $createRarityRequest->all();
        $newItemRarity = new Rarity($itemRarity);
        $this->rarityWriteRepository->save($newItemRarity);

        return redirect()->route('rarity.list');
    }
    public function update(int $id, UpdateItemRarityRequest $updateItemRarityRequest): JsonResponse
    {
        $itemRarity = $this->rarityReadRepository->getRarityById($id);
        $itemRarity->update($updateItemRarityRequest->validated());
        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $itemRarity,
        ]);
    }
    public function destroy(int $id): RedirectResponse
    {
        $itemRarity = $this->rarityReadRepository->getRarityById($id);
        $this->rarityWriteRepository->delete($itemRarity);

        return redirect()->route('rarity.list');
    }
}
