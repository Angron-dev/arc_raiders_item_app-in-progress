<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\FoundIn;

class EloquentFoundInWriteRepository implements FoundInWriteRepository
{
    public function save(FoundIn $itemFoundIn): void
    {
        $itemFoundIn->save();
    }

    public function update(FoundIn $itemFoundIn): void
    {
        $itemFoundIn->update();
    }

    public function delete(FoundIn $itemFoundIn): void
    {
        $itemFoundIn->delete();
    }
}
