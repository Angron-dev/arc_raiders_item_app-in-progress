<?php

namespace App\Repository;

use App\Models\Rarity;

class EloquentRarityReadRepository implements RarityReadRepository
{
    public function getRarityById(int $id): Rarity
    {
        return Rarity::find($id);
    }
}
