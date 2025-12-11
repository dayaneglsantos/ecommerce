<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  // Listagem de Produtos
  public function index()
  {
    $products = Product::all()->load('defaultVariation');
    $brands = Brand::all();
    $categories = Category::all();

    return Inertia::render('Products/index', [
      'products' => ProductResource::collection($products),
      'brands' => $brands,
      'categories' => CategoryResource::collection($categories),
    ]);
  }

  // Formulário de Criação de Produto
  public function create()
  {
    $brands = Brand::all();
    $categories = Category::all();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
    ]);
  }

  // Criação de Produto
  public function store(ProductRequest $request)
  {
    try {
      $validatedData = $request->validated();

      $product = Product::create($validatedData);

      return redirect()->route('products.index')->with('success', 'Produto criado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar o produto: ' . $e->getMessage());
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Product $products)
  {
    //
  }

  // Formulário de Edição de Produto
  public function edit(Product $product)
  {
    $brands = Brand::all();
    $categories = Category::all();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Product $products)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $products)
  {
    //
  }
}
