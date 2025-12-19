<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Rarity;
use Illuminate\Database\Eloquent\Factories\Factory;

class RarityFactory extends Factory
{
    protected $model = Rarity::class;

    public function definition()
    {
        return [
          'rarity_name' => $this->faker->word(),
          'color' => $this->faker->hexColor(),
        ];
    }
}
