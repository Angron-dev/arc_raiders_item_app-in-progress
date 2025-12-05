<?php

namespace App\Repository;

use App\Models\Rarity;

class EloquentRarityWriteRepository implements RarityWriteRepository
{
    public function save(Rarity $itemRarity): void
    {
        $itemRarity->save();
    }

    public function update(Rarity $itemRarity): void
    {
        $itemRarity->update();
    }

    public function delete(Rarity $itemRarity): void
    {
        $itemRarity->delete();
    }
}
