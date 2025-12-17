<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\FoundIn;

interface FoundInReadRepository
{
    public function getItemCanBeFoundById(int $id): FoundIn;
}
