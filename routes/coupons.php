<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('cupons')
  ->name('coupons.')
  ->group(function () {
    Route::get('/', [CouponController::class, 'index'])->name('index');
    Route::get('/novo', [CouponController::class, 'create'])->name('create');
    Route::patch('/{coupon}', [CouponController::class, 'update'])->name('update');
    Route::post('/', [CouponController::class, 'store'])->name('store');
    // Formulário de edição de cupom
    Route::get('/editar/{coupon}', [CouponController::class, 'edit'])->name('edit');
    Route::delete('/{coupon}', [CouponController::class, 'destroy'])->name('destroy');
  });
