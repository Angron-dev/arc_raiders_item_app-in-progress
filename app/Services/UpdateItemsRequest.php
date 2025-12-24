<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class UpdateItemsRequest
{
    const string API_URL = 'https://metaforge.app/api/arc-raiders/items';

    public function updateItemsInDatabase(): void
    {
        $allItems = [];

        for ($i = 1; $i <= 6; $i++) {
            $response = Http::withoutVerifying()->get(self::API_URL, [
                'page' => $i,
                'limit' => 100,
            ]);

            if (!$response->successful()) {
                throw new \RuntimeException($response->body());
            }

            $allItems = array_merge($allItems, $response->json()['data']);
        }

        DB::transaction(function () use ($allItems) {

            foreach ($allItems as $item) {
                $rarityId = DB::table('item_rarity')
                    ->where('rarity_name', $item['rarity'])
                    ->value('id');

                if (!$rarityId && $item['rarity']) {
                    $rarityId = DB::table('item_rarity')->insertGetId([
                        'rarity_name' => $item['rarity'],
                        'color' => $this->attachColorToRarity($item['rarity']),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                $itemTypeId = DB::table('item_type')
                    ->where('item_type_name', $item['item_type'])
                    ->value('id');

                if (!$itemTypeId) {
                    $itemTypeId = DB::table('item_type')->insertGetId([
                        'item_type_name' => $item['item_type'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                $itemId = DB::table('items')->updateOrInsert(
                    ['item_name' => $item['name']],
                    [
                        'rarity_id' => $rarityId,
                        'price' => $item['value'],
                        'icon' => $item['icon'],
                        'description' => $item['description'],
                        'item_type_id' => $itemTypeId,
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );

                $itemId = DB::table('items')
                    ->where('item_name', $item['name'])
                    ->value('id');

                $lootAreas = array_filter(array_map(
                    'trim',
                    explode(',', $item['loot_area'] ?? '')
                ));

                $lootAreaIds = [];

                foreach ($lootAreas as $areaName) {
                    $lootAreaId = DB::table('loot_areas')
                        ->where('loot_area_name', $areaName)
                        ->value('id');

                    if (!$lootAreaId) {
                        $lootAreaId = DB::table('loot_areas')->insertGetId([
                            'loot_area_name' => $areaName,
                            'symbol' => $this->attachSymbolToLootArea($areaName),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }

                    $lootAreaIds[] = $lootAreaId;
                }

                $lootAreaIds = array_unique($lootAreaIds);

                DB::table('item_loot_area')
                    ->where('item_id', $itemId)
                    ->delete();

                foreach ($lootAreaIds as $lootAreaId) {
                    DB::table('item_loot_area')->insert([
                        'item_id' => $itemId,
                        'loot_area_id' => $lootAreaId,
                    ]);
                }
            }
        });
    }

    private function attachSymbolToLootArea(string $lootAreaName): string
    {
        $lootAreaName = str_replace(' ', '_', $lootAreaName);

        $fileName = "Icon_Loot_{$lootAreaName}.webp";

        $storagePath = "icons/{$fileName}";

        return Storage::url($storagePath);
    }

    private function attachColorToRarity(string $color): string
    {
        switch ($color) {
            case 'Common': return '#717471';
            case 'Uncommon': return '#41eb6a';
            case 'Rare': return '#1ecbfc';
            case 'Epic': return '#d8299b';
            case 'Legendary': return '#fbc700';
            default: return 'white';
        }
    }
}
