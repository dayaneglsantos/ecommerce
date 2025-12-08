<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('produtos')
  ->name('products.')
  ->group(function () {
    Route::get('/', [ProductController::class, 'create'])->name('create');
  });
