<?php

use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
  ->prefix('address')
  ->name('address.')
  ->group(function () {
    Route::post('/', [AddressController::class, 'store'])->name('create');
    Route::patch('/{address}', [AddressController::class, 'update'])->name('update');
    Route::patch('/{address}/default', [AddressController::class, 'default'])->name('default');
    Route::delete('/{address}', [AddressController::class, 'destroy'])->name('destroy');
  });
