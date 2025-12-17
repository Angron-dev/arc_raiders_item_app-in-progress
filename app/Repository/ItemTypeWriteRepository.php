<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\ItemType;

interface ItemTypeWriteRepository
{
    public function save(ItemType $itemType): void;
    public function update(ItemType $itemType): void;
    public function delete(ItemType $itemType): void;
}
