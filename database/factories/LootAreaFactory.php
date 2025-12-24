<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\LootArea;
use Illuminate\Database\Eloquent\Factories\Factory;

class LootAreaFactory extends Factory
{
    protected $model = LootArea::class;

    public function definition()
    {
        return [
          'loot_area_name' => $this->faker->word(),
        ];
    }
}
