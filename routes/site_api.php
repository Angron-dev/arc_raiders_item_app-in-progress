<?php

use App\Http\Controllers\LootAreaController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemTypeController;
use App\Http\Controllers\RarityController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'api'], function () {
    Route::get('/item/{id}', [ItemController::class, 'getItemById'])->name('api.item.single');
    Route::delete('/item/delete/{id}', [ItemController::class, 'destroy'])->name('item.delete');
    Route::post('/item/create', [ItemController::class, 'store'])->name('api.item.create');
    Route::put('/item/edit/{id}', [ItemController::class, 'update'])->name('api.item.edit');
    Route::get('/items', [ItemController::class, 'list'])->name('api.items.list');

    Route::get('/item_rarity', [SiteController::class, 'getAllRarity'])->name('rarity.all');
    Route::get('/loot_areas', [SiteController::class, 'getAllLootAreas'])->name('loot_area.all');
    Route::get('/item_types', [SiteController::class, 'getAllItemTypes'])->name('item_type.all');

    Route::group(['prefix' => 'rarity'], function () {
        Route::get('/{id}', [RarityController::class, 'getRarityById'])->name('api.rarity.single');
        Route::post('/create', [RarityController::class, 'store'])->name('api.rarity.create');
        Route::put('/edit/{id}', [RarityController::class, 'update'])->name('api.rarity.edit');
        Route::delete('/delete/{id}', [RarityController::class, 'destroy'])->name('api.rarity.delete');
    });
    Route::group(['prefix' => 'loot_area'], function () {
        Route::get('/{id}', [LootAreaController::class, 'getLootAreaById'])->name('api.loot_area.single');
        Route::post('/create', [LootAreaController::class, 'store'])->name('api.loot_area.create');
        Route::put('/edit/{id}', [LootAreaController::class, 'update'])->name('api.loot_area.edit');
        Route::delete('/delete/{id}', [LootAreaController::class, 'destroy'])->name('api.loot_area.delete');
    });
    Route::group(['prefix' => 'item_type'], function () {
        Route::get('/{id}', [ItemTypeController::class, 'getItemTypeById'])->name('api.item_type.single');
        Route::post('/create', [ItemTypeController::class, 'store'])->name('api.item_type.create');
        Route::put('/edit/{id}', [ItemTypeController::class, 'update'])->name('api.item_type.edit');
        Route::delete('/delete/{id}', [ItemTypeController::class, 'destroy'])->name('api.item_type.delete');
    });
});
