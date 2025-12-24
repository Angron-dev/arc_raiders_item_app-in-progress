<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\LootArea;

interface LootAreaWriteRepository
{
    public function save(LootArea $lootArea): void;
    public function update(LootArea $lootArea): void;
    public function delete(LootArea $lootArea): void;
}
