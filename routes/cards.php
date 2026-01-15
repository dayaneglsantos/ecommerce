<?php

use App\Http\Controllers\CardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
  ->prefix('cartoes')
  ->name('cards.')
  ->group(function () {
    Route::post('/', [CardController::class, 'store'])->name('store');
    Route::delete('/{card}', [CardController::class, 'destroy'])->name('destroy');
    Route::patch('/{card}/default', [CardController::class, 'default'])->name('default');
  });
