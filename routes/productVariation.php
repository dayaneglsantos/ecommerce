<?php

use App\Http\Controllers\ProductVariationController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->name('productVariation.')
  ->group(function () {
    Route::post('/', [ProductVariationController::class, 'store'])->name('store');
    Route::patch('/{productVariation}', [ProductVariationController::class, 'update'])->name('update');
  });
