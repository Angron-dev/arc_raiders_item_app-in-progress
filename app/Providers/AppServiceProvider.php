<?php

namespace App\Providers;

use App\Repository\EloquentFoundInReadRepository;
use App\Repository\EloquentFoundInWriteRepository;
use App\Repository\EloquentItemReadRepository;
use App\Repository\EloquentItemTypeReadRepository;
use App\Repository\EloquentItemTypeWriteRepository;
use App\Repository\EloquentItemWriteRepository;
use App\Repository\EloquentRarityReadRepository;
use App\Repository\EloquentRarityWriteRepository;
use App\Repository\FoundInReadRepository;
use App\Repository\FoundInWriteRepository;
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
        FoundInReadRepository::class => EloquentFoundInReadRepository::class,
        FoundInWriteRepository::class => EloquentFoundInWriteRepository::class,
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
