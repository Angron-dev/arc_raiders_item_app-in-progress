<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ItemWriteRepository
{
    public function delete(Item $item): void;

    public function save(Item $item): void;
    public function edit(Item $item): void;
}
