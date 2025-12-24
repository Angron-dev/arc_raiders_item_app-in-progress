<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\LootArea;

interface LootAreaReadRepository
{
    public function getLootAreaById(int $id): LootArea;
}
