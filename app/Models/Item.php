<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @property int $id
 * @property string $item_name
 * @property int|null $found_in_id
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
        'found_in_id',
        'rarity_id',
        'item_type_id',
        'price',
        'icon',
        'description',
        'can_be_deconstructed',
    ];

    public function recipeComponents()
    {
        return $this->belongsToMany(Item::class, 'item_recipe_components', 'item_id', 'component_item_id')
            ->withPivot('amount');
    }

    public function deconstructComponents()
    {
        return $this->belongsToMany(Item::class, 'item_deconstruct_components', 'item_id', 'component_item_id')
            ->withPivot('amount');
    }

    public function rarity()
    {
        return $this->belongsTo(Rarity::class, 'rarity_id', 'id');
    }

    public function foundIn()
    {
        return $this->belongsTo(FoundIn::class, 'found_in_id', 'id');
    }
    public function itemType()
    {
        return $this->belongsTo(ItemType::class, 'item_type_id', 'id');
    }
}
