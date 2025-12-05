<?php

namespace App\Repository;

use App\Models\Rarity;

interface RarityReadRepository
{
    public function getRarityById(int $id): Rarity;
}
