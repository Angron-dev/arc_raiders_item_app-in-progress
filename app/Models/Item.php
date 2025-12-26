<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @property int $id
 * @property string $item_name
 * @property int|null $loot_areas_ids
 * @property int|null $rarity_id
 * @property int|null $item_type_id
 * @property int|null $price
 * @property string|null $icon
 * @property string|null $description
 * @property bool $can_be_deconstructed
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';

    protected $fillable = [
        'item_name',
        'loot_areas_ids',
        'rarity_id',
        'item_type_id',
        'price',
        'icon',
        'description',
        'can_be_deconstructed',
    ];
    protected $casts = [
        'loot_areas_ids' => 'array',
        'can_be_deconstructed' => 'boolean',
    ];

    public function recipeComponents()
    {
        return $this->belongsToMany(Item::class, 'item_recipe_components', 'item_id', 'component_item_id')
            ->withPivot('amount');
    }

    public function deconstructComponents()
    {
        return $this->belongsToMany(
            Item::class,
            'item_deconstruction_components',
            'deconstruct_item_id',
            'result_item_id'
        )->withPivot('amount');
    }

    public function rarity()
    {
        return $this->belongsTo(Rarity::class, 'rarity_id', 'id');
    }

    public function lootAreas()
    {
        return $this->belongsToMany(
            LootArea::class,
            'item_loot_area',
            'item_id',
            'loot_area_id'
        );
    }

    public function itemType()
    {
        return $this->belongsTo(ItemType::class, 'item_type_id', 'id');
    }
}
