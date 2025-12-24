<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\LootArea;
use App\Models\ItemType;
use App\Models\Rarity;
use Illuminate\Support\Collection;

class SiteController extends Controller
{
    function getAllRarity(): Collection
    {
        return Rarity::all();
    }
    function getAllLootAreas(): Collection
    {
        return LootArea::all();
    }
    function getAllItemTypes(): Collection
    {
        return ItemType::all();
    }
}
