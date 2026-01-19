<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImagesController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('imagens-produto')
  ->name('productImages.')
  ->group(function () {
    // Criar novas imagens para um produto específico
    Route::post('/{product}', [ProductImagesController::class, 'store'])->name('store');

    // Atualizar imagens de um produto específico
    Route::put('/{product}', [ProductImagesController::class, 'update'])->name('update');
  });
