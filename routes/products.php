<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('produtos')
  ->name('products.')
  ->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/novo', [ProductController::class, 'create'])->name('create');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::get('/{product}', [ProductController::class, 'edit'])->name('edit');
    Route::patch('/{product}', [ProductController::class, 'update'])->name('update');
    Route::patch('/{product}/defaultVariation', [ProductController::class, 'updateDefaultVariation'])->name('updateDefaultVariation');
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
  });
