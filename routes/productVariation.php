<?php

use App\Http\Controllers\ProductVariationController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('variacao-produto')
  ->name('productVariation.')
  ->group(function () {
    Route::post('/', [ProductVariationController::class, 'store'])->name('store');
    Route::patch('/{productVariation}', [ProductVariationController::class, 'update'])->name('update');
    Route::delete('/{productVariation}', [ProductVariationController::class, 'destroy'])->name('destroy');
  });
