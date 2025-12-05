<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('products')
  ->name('products.')
  ->group(function () {
    Route::get('/', [ProductsController::class, 'edit'])->name('edit');
  });
