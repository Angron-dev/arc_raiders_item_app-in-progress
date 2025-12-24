<?php

namespace App\Providers;

use App\Repository\EloquentLootAreaReadRepository;
use App\Repository\EloquentLootAreaWriteRepository;
use App\Repository\EloquentItemReadRepository;
use App\Repository\EloquentItemTypeReadRepository;
use App\Repository\EloquentItemTypeWriteRepository;
use App\Repository\EloquentItemWriteRepository;
use App\Repository\EloquentRarityReadRepository;
use App\Repository\EloquentRarityWriteRepository;
use App\Repository\LootAreaReadRepository;
use App\Repository\LootAreaWriteRepository;
use App\Repository\ItemReadRepository;
use App\Repository\ItemTypeReadRepository;
use App\Repository\ItemTypeWriteRepository;
use App\Repository\ItemWriteRepository;
use App\Repository\RarityReadRepository;
use App\Repository\RarityWriteRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
        ItemReadRepository::class => EloquentItemReadRepository::class,
        ItemWriteRepository::class => EloquentItemWriteRepository::class,
        RarityReadRepository::class => EloquentRarityReadRepository::class,
        RarityWriteRepository::class => EloquentRarityWriteRepository::class,
        LootAreaReadRepository::class => EloquentLootAreaReadRepository::class,
        LootAreaWriteRepository::class => EloquentLootAreaWriteRepository::class,
        ItemTypeReadRepository::class => EloquentItemTypeReadRepository::class,
        ItemTypeWriteRepository::class => EloquentItemTypeWriteRepository::class,
    ];


    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
