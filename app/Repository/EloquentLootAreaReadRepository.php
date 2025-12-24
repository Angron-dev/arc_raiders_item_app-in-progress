<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\LootArea;

class EloquentLootAreaReadRepository implements LootAreaReadRepository
{
    public function getLootAreaById(int $id): LootArea
    {
        return LootArea::find($id);
    }
}
