<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('categorias')
  ->name('categories.')
  ->group(function () {
    Route::get('/list', [CategoryController::class, 'list'])->name('list');
    Route::get('/', [CategoryController::class, 'index'])->name('index');
    Route::post('/', [CategoryController::class, 'store'])->name('store');
    Route::patch('/{category}', [CategoryController::class, 'update'])->name('update');
    Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('destroy');
  });
