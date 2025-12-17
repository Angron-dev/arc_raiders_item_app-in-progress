<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('MainPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/items-list', function () {
    return Inertia::render('ItemsList');
})->middleware(['auth', 'verified'])->name('items.list');

Route::group(['prefix' => 'item'], function () {
    Route::get('/edit/{id}', function ($id) {
        return Inertia::render('Items/EditItem', [
            'itemId' => $id,
        ]);
    })->name('item.edit');

    Route::get('/create', function () {
        return Inertia::render('Items/CreateItem');
    })->name('item.create');

})->middleware(['auth', 'verified']);

Route::get('/item/{id}', function ($id) {
    return Inertia::render('Items/SingleItem', [
        'itemId' => $id,
    ]);
})->name('item.single');

Route::group(['prefix' => 'rarity'], function () {
    Route::get('/', function () {
        return Inertia::render('Rarity/RarityList');
    })->name('rarity.list');

    Route::get('/create', function () {
        return Inertia::render('Rarity/RarityCreate');
    })->name('rarity.create');

    Route::get('/edit/{id}', function ($id) {
        return Inertia::render('Rarity/RarityEdit', [
            'rarityId' => $id,
        ]);
    })->name('rarity.edit');

    Route::get('/{id}', function ($id) {
    return Inertia::render('Rarity/RaritySingle', [
        'rarityId' => $id,
    ]);
    })->name('rarity.single');
});

Route::group(['prefix' => 'found_in'], function () {
    Route::get('/', function () {
        return Inertia::render('FoundIn/FoundInList');
    })->name('found_in.list');

    Route::get('/create', function () {
        return Inertia::render('FoundIn/FoundInCreate');
    })->name('found_in.create');

    Route::get('/edit/{id}', function ($id) {
        return Inertia::render('FoundIn/FoundInEdit', [
            'foundInId' => $id,
        ]);
    })->name('found_in.edit');

    Route::get('/{id}', function ($id) {
        return Inertia::render('FoundIn/FoundInSingle', [
            'foundInId' => $id,
        ]);
    })->name('found_in.single');
});

Route::group(['prefix' => 'item_type'], function () {
    Route::get('/', function () {
        return Inertia::render('ItemType/ItemTypeList');
    })->name('item_type.list');

    Route::get('/create', function () {
        return Inertia::render('ItemType/ItemTypeCreate');
    })->name('item_type.create');

    Route::get('/edit/{id}', function ($id) {
        return Inertia::render('ItemType/ItemTypeEdit', [
            'itemTypeId' => $id,
        ]);
    })->name('item_type.edit');

    Route::get('/{id}', function ($id) {
        return Inertia::render('ItemType/ItemTypeSingle', [
            'itemTypeId' => $id,
        ]);
    })->name('item_type.single');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/site_api.php';
