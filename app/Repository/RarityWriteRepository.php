<?php

namespace App\Repository;

use App\Models\Rarity;

interface RarityWriteRepository
{
    public function save(Rarity $itemRarity): void;
    public function update(Rarity $itemRarity): void;
    public function delete(Rarity $itemRarity): void;
}
