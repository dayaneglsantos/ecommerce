<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
  // Informações do usuário
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  // Imagem de perfil
  Route::post('/profile/image', [ProfileController::class, 'updateProfileImage'])->name('profile.updateProfileImage');
  Route::delete('/profile/image', [ProfileController::class, 'destroyImage'])->name('profile.destroyImage');
  // Endereços
  Route::post('/profile/address', [AddressController::class, 'update'])->name('profile.updateAddress');
  Route::delete('/profile/address/{address}', [AddressController::class, 'destroyAddress'])->name('profile.destroyAddress');
  Route::patch('/profile/address/{address}', [AddressController::class, 'default'])->name('profile.defaultAddress');
  // Cartões de pagamento
  Route::post('/payment-methods/store', [CardController::class, 'store'])->name('payment-methods.store');
  Route::delete('/cards/{card}', [CardController::class, 'destroy'])->name('cards.destroy');
});

require __DIR__ . '/auth.php';
