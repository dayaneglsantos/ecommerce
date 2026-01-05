<?php

namespace App\Providers;

use App\Models\Brand;
use App\Models\ProductImages;
use App\Observers\BrandObserver;
use App\Observers\ProductImageObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
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

    JsonResource::withoutWrapping(); // Desabilita o "data" no retorno dos Resources

    ProductImages::observe(ProductImageObserver::class); // Registrando o Observer para ProductImages

    Brand::observe(BrandObserver::class); // Registrando o Observer para Brand
  }
}
