<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\LootArea;
use App\Models\Item;
use App\Models\ItemType;
use App\Models\Rarity;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition()
    {
        $lootArea = LootArea::find(1);
        $rarity = Rarity::find(1);
        $itemType = ItemType::find(1);

        return [
            'item_name' => $this->faker->word(),
            'price' => $this->faker->numberBetween(1, 100000),
            'description' => $this->faker->sentence(),
            'rarity_id' => Rarity::factory(),
            'item_type_id' => ItemType::factory(),
            'can_be_deconstructed' => $this->faker->boolean(),
            'icon' => $this->faker->imageUrl(),
        ];
    }
}
