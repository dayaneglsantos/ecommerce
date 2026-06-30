<?php

use App\Http\Controllers\SizeGroupController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('grupo-tamanho')
  ->name('sizeGroup.')
  ->group(function () {
    Route::post('/', [SizeGroupController::class, 'store'])->name('store');
    Route::delete('/{sizeGroup}', [SizeGroupController::class, 'destroy'])->name('destroy');
  });
