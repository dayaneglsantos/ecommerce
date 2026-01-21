<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('categorias')
  ->name('categories.')
  ->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('index');
  });
