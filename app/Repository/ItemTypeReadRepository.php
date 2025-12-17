<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\ItemType;

interface ItemTypeReadRepository
{
    public function getItemTypeById(int $id): ItemType;
}
