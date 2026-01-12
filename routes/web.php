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

require __DIR__ . '/auth.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/address.php';
require __DIR__ . '/cards.php';
require __DIR__ . '/products.php';
require __DIR__ . '/productVariation.php';
require __DIR__ . '/supplier.php';
require __DIR__ . '/brands.php';
require __DIR__ . '/attributeValue.php';
