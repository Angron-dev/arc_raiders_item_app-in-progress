<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\LootArea;

class EloquentLootAreaWriteRepository implements LootAreaWriteRepository
{
    public function save(LootArea $lootArea): void
    {
        $lootArea->save();
    }

    public function update(LootArea $lootArea): void
    {
        $lootArea->update();
    }

    public function delete(LootArea $lootArea): void
    {
        $lootArea->delete();
    }
}
