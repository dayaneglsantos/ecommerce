<?php

namespace App\Observers;

use App\Models\ProductImages;
use Illuminate\Support\Facades\Storage;

class ProductImageObserver
{
  /**
   * Handle the ProductImages "created" event.
   */
  public function created(ProductImages $productImages): void
  {
    //
  }

  /**
   * Handle the ProductImages "updated" event.
   */
  public function updated(ProductImages $productImages): void
  {
    //
  }

  /**
   * Handle the ProductImages "deleted" event.
   */
  public function deleted(ProductImages $image): void
  {
    // Se o caminho da imagem existir, exclua o arquivo físico
    $path = $image->getRawOriginal('path');
    if ($path && Storage::disk('public')->exists($path)) {
      Storage::disk('public')->delete($path);
    }
  }

  /**
   * Handle the ProductImages "restored" event.
   */
  public function restored(ProductImages $productImages): void
  {
    //
  }

  /**
   * Handle the ProductImages "force deleted" event.
   */
  public function forceDeleted(ProductImages $productImages): void
  {
    //
  }
}
