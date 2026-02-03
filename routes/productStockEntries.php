<?php

use App\Http\Controllers\ProductStockEntrieController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('entradas-produtos')
  ->name('productStockEntries.')
  ->group(function () {
    Route::get('/', [ProductStockEntrieController::class, 'index'])->name('index');
    // Route::get('/novo', [BrandController::class, 'create'])->name('create');
    Route::post('/', [ProductStockEntrieController::class, 'store'])->name('store');
    Route::get('/export', [ProductStockEntrieController::class, 'export'])->name('export');
    // Route::patch('/{productEntry}', [ProductStockEntrieController::class, 'update'])->name('update');
    // Route::delete('/{productEntry}', [ProductStockEntrieController::class, 'destroy'])->name('destroy');
  });
