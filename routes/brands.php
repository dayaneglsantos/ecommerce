<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('marcas')
  ->name('brands.')
  ->group(function () {
    Route::get('/', [BrandController::class, 'index'])->name('index');
    Route::get('/novo', [BrandController::class, 'create'])->name('create');
    Route::post('/', [BrandController::class, 'store'])->name('store');
    Route::patch('/{brand}', [BrandController::class, 'update'])->name('update');
    Route::delete('/{brand}', [BrandController::class, 'destroy'])->name('destroy');
  });
