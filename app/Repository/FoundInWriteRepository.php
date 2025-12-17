<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\FoundIn;

interface FoundInWriteRepository
{
    public function save(FoundIn $itemFoundIn): void;
    public function update(FoundIn $itemFoundIn): void;
    public function delete(FoundIn $itemFoundIn): void;
}
