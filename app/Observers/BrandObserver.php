<?php

namespace App\Observers;

use App\Models\Brand;
use Illuminate\Support\Facades\Storage;

class BrandObserver
{
  /**
   * Handle the Brand "created" event.
   */
  public function created(Brand $brand): void
  {
    //
  }

  /**
   * Handle the Brand "updated" event.
   */
  public function updated(Brand $brand): void
  {
    if ($brand->isDirty('logo')) { // Verifica se o campo 'logo' foi alterado
      $originalLogo = $brand->getRawOriginal('logo');
      if ($originalLogo && Storage::disk('public')->exists($originalLogo)) {
        Storage::disk('public')->delete($originalLogo);
      }
    }
  }

  /**
   * Handle the Brand "deleted" event.
   */
  public function deleted(Brand $brand): void
  {
    $path = $brand->getRawOriginal('logo'); // Pega o caminho original da logo
    if ($path && Storage::disk('public')->exists($path)) {
      Storage::disk('public')->delete($path);
    }
  }

  /**
   * Handle the Brand "restored" event.
   */
  public function restored(Brand $brand): void
  {
    //
  }

  /**
   * Handle the Brand "force deleted" event.
   */
  public function forceDeleted(Brand $brand): void
  {
    //
  }
}
