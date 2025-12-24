<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LootArea extends Model
{
    use HasFactory;

    protected $table = 'loot_areas';

    protected $fillable = ['loot_area_name'];

    public function items()
    {
        return $this->belongsToMany(
            Item::class,
            'item_loot_area',
            'loot_area_id',
            'item_id'
        );
    }
}
