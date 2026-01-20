<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
  ->prefix('produtos')
  ->name('products.')
  ->group(function () {
    // Listagem de produtos
    Route::get('/', [ProductController::class, 'index'])->name('index');

    // Formulário de novo produto
    Route::get('/novo', [ProductController::class, 'create'])->name('create');

    // Detalhes de um produto
    Route::get('/{product}', [ProductController::class, 'show'])->name('show');

    // Criar novo produto - BACKEND
    Route::post('/', [ProductController::class, 'store'])->name('store');

    // Formulário de edição de produto
    Route::get('/editar/{product}', [ProductController::class, 'edit'])->name('edit');

    // Atualizar produto - BACKEND
    Route::patch('/{product}', [ProductController::class, 'update'])->name('update');

    // Atualizar cor padrão do produto - BACKEND
    Route::patch('/{product}/defaultColor', [ProductController::class, 'updateDefaultColor'])->name('updateDefaultColor');

    // Deletar produto - BACKEND
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
  });
