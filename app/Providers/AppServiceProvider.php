<?php

namespace App\Providers;

use App\Repository\EloquentItemReadRepository;
use App\Repository\EloquentItemWriteRepository;
use App\Repository\ItemReadRepository;
use App\Repository\ItemWriteRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
        ItemReadRepository::class => EloquentItemReadRepository::class,
        ItemWriteRepository::class => EloquentItemWriteRepository::class,
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
