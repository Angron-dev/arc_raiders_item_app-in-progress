<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentItemReadRepository implements ItemReadRepository
{
    const int PER_PAGE = 50;
    public function getAllItems(): Collection
    {
        return Item::with('rarity', 'lootAreas', 'itemType')->get();
    }
    public function getPaginatedItems(?array $filter = null, int $perPage = self::PER_PAGE): LengthAwarePaginator
    {
        return Item::with('rarity', 'lootAreas', 'itemType')
            ->when($filter['item_name'] ?? null, fn($q, $itemName) =>
            $q->where('item_name', 'like', "%{$itemName}%")
            )
            ->when($filter['rarity_id'] ?? null, fn($q, $rarityId) =>
            $q->where('rarity_id', $rarityId)
            )
            ->when($filter['loot_area_id'] ?? null, function($q, $lootAreaId) {
                $q->whereHas('lootAreas', fn($q2) => $q2->where('loot_areas.id', $lootAreaId));
            })
            ->when($filter['item_type_id'] ?? null, fn($q, $typeId) =>
            $q->where('item_type_id', $typeId)
            )
            ->paginate($perPage);
    }

    public function getWeapons(int $perPage = self::PER_PAGE): LengthAwarePaginator
    {
        return Item::where('type', 'Weapon')->get()->paginate($perPage);
    }
    public function getItemById(int $id): Item
    {
        return Item::with('rarity', 'lootAreas', 'itemType')->find($id);
    }
}
