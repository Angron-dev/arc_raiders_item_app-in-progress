<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\FoundIn;
use App\Models\Item;
use App\Models\ItemType;
use App\Models\Rarity;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition()
    {
        $foundIn = FoundIn::find(1);
        $rarity = Rarity::find(1);
        $itemType = ItemType::find(1);

        return [
            'item_name' => $this->faker->word(),
            'price' => $this->faker->numberBetween(1, 100000),
            'description' => $this->faker->sentence(),
            'found_in_id' => $foundIn->id ?? FoundIn::factory()->create()->id,
            'rarity_id' => $rarity->id ?? Rarity::factory()->create()->id,
            'item_type_id' => $itemType->id ?? ItemType::factory()->create()->id,
            'can_be_deconstructed' => $this->faker->boolean(),
            'icon' => $this->faker->imageUrl(),
        ];
    }
}
