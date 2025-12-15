<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
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
    $suppliers = Supplier::all();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
      'suppliers' => $suppliers,
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
      return redirect()->route('products.index')->with('error', 'Erro ao criar o produto.');
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
    $suppliers = Supplier::all();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
      'suppliers' => $suppliers,
      'product' => new ProductResource($product->load('variations', 'defaultVariation')),
    ]);
  }

  // Atualização de Produto
  public function update(ProductRequest $request, Product $product)
  {
    try {
      $validatedData = $request->validated();
      $product->update($validatedData);

      return redirect()->route('products.index')->with('success', 'Produto atualizado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao atualizar o produto.');
    }
  }

  // Atualização da Variação Padrão do Produto
  public function updateDefaultVariation(Request $request, Product $product)
  {
    try {
      $validatedData = $request->validate([
        'default_variation_id' => 'required|exists:product_variations,id',
      ]);
      $product->default_variation_id = $validatedData['default_variation_id'];
      $product->save();

      return redirect()->back()->with('success', 'Variação definida como principal com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao definir a variação principal.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $products)
  {
    //
  }
}
