<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Item;

class EloquentItemWriteRepository implements ItemWriteRepository
{
    public function save(Item $item): void
    {
        $item->save();
    }

    public function delete(Item $item): void
    {
        $item->delete();
    }

    public function edit(Item $item): void
    {
        $item->update();
    }
}
