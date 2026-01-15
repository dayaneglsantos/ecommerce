<?php

use App\Http\Controllers\AttributeValueController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('valor-atributo')
  ->name('attributeValue.')
  ->group(function () {
    // Route::get('/', [AttributeValueController::class, 'index'])->name('index');
    // Route::get('/novo', [AttributeValueController::class, 'create'])->name('create');
    Route::post('/', [AttributeValueController::class, 'store'])->name('store');
    // Route::patch('/{attributeValue}', [AttributeValueController::class, 'update'])->name('update');
    Route::delete('/{attributeValue}', [AttributeValueController::class, 'destroy'])->name('destroy');
  });
