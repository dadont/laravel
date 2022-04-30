<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Observers\BlogCategoryObserver;
use App\Observers\BlogPostObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
          }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       BlogPost::observe(BlogPostObserver::class);
       BlogCategory::observe(BlogCategoryObserver::class);
    }
}
