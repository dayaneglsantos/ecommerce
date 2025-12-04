<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
  ->prefix('profile')
  ->name('profile.')
  ->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');

    // Imagem de perfil
    Route::post('/image', [ProfileController::class, 'updateProfileImage'])->name('updateImage');
    Route::delete('/image', [ProfileController::class, 'destroyImage'])->name('destroyImage');
  });
