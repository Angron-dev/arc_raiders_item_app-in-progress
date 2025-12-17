<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\ItemType;

class EloquentItemTypeReadRepository implements ItemTypeReadRepository
{
    public function getItemTypeById(int $id): ItemType
    {
        return ItemType::find($id);
    }
}
