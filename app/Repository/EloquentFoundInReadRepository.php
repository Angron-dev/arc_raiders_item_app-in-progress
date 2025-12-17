<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\FoundIn;

class EloquentFoundInReadRepository implements FoundInReadRepository
{
    public function getItemCanBeFoundById(int $id): FoundIn
    {
        return FoundIn::find($id);
    }
}
