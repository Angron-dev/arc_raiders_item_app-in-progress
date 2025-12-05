<?php

use App\Http\Controllers\ItemController;
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
    Route::get('/found_in', [SiteController::class, 'getAllFoundIn'])->name('found_in.all');
    Route::get('/item_types', [SiteController::class, 'getAllItemTypes'])->name('item_type.all');

    Route::group(['prefix' => 'rarity'], function () {
        Route::get('/{id}', [RarityController::class, 'getRarityById'])->name('api.rarity.single');
        Route::post('/create', [RarityController::class, 'store'])->name('api.rarity.create');
        Route::put('/edit/{id}', [RarityController::class, 'update'])->name('api.rarity.edit');
        Route::delete('/delete/{id}', [RarityController::class, 'destroy'])->name('api.rarity.delete');
    });
});
