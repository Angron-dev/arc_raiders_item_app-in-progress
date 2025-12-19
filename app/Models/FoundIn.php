<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoundIn extends Model
{
    use HasFactory;

    protected $table = 'item_can_be_found_in';

    protected $fillable = [
        'found_in_name',
    ];
}
