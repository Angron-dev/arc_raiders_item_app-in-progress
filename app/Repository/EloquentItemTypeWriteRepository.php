<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\ItemType;

class EloquentItemTypeWriteRepository implements ItemTypeWriteRepository
{
    public function save(ItemType $itemType): void
    {
        $itemType->save();
    }

    public function update(ItemType $itemType): void
    {
        $itemType->update();
    }

    public function delete(ItemType $itemType): void
    {
        $itemType->delete();
    }
}
