<?php

use App\Http\Controllers\CardController;
use Illuminate\Support\Facades\Route;

// Todas as rotas aqui recebem middleware 'auth' e prefix 'profile' e namespacing 'profile.'
Route::middleware('auth')
  ->prefix('cards')
  ->name('cards.')
  ->group(function () {
    Route::post('/', [CardController::class, 'store'])->name('store');
    Route::delete('/{card}', [CardController::class, 'destroy'])->name('destroy');
    Route::patch('/{card}/default', [CardController::class, 'default'])->name('default');
  });
