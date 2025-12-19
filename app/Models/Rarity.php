<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rarity extends Model
{
    use HasFactory;

    protected $table = 'item_rarity';

    protected $fillable = [
        'rarity_name',
        'color'
    ];
}
