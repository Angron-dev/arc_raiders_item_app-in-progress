<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ItemType;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemTypeFactory extends Factory
{
    protected $model = ItemType::class;

    public function definition()
    {
        return [
          'item_type_name' => $this->faker->word(),
        ];
    }
}
