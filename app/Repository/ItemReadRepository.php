<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Item;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ItemReadRepository
{
    public function getAllItems(): Collection;
    public function getPaginatedItems(?array $filter = null, int $perPage): LengthAwarePaginator;
    public function getWeapons(int $perPage): LengthAwarePaginator;
    public function getItemById(int $id): Item;
}
