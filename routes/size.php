<?php

use App\Http\Controllers\SizeController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('tamanho')
  ->name('size.')
  ->group(function () {
    Route::post('/', [SizeController::class, 'store'])->name('store');
    Route::delete('/{size}', [SizeController::class, 'destroy'])->name('destroy');
  });
