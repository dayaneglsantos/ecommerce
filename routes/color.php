<?php

use App\Http\Controllers\ColorController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('cor')
  ->name('color.')
  ->group(function () {
    Route::post('/', [ColorController::class, 'store'])->name('store');
    Route::delete('/{color}', [ColorController::class, 'destroy'])->name('destroy');
  });
