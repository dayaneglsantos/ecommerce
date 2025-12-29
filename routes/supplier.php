<?php

use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('fornecedores')
  ->name('suppliers.')
  ->group(function () {
    Route::get('/', [SupplierController::class, 'index'])->name('index');
    Route::get('/novo', [SupplierController::class, 'create'])->name('create');
    Route::post('/', [SupplierController::class, 'store'])->name('store');
    Route::patch('/{supplier}', [SupplierController::class, 'update'])->name('update');
    Route::delete('/{supplier}', [SupplierController::class, 'destroy'])->name('destroy');
  });
