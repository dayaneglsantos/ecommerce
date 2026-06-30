<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ColorResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SizeResource;
use App\Http\Resources\SupplierResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  // Listagem de Produtos - Apenas retorna os produtos em JSON para o frontend
  public function list(Request $request)
  {
    try {

      $products = Product::query()->with('images', 'defaultColor')
        ->when($request->search, function ($query, $search) {
          $query->where('name', 'like', "%{$search}%");
        })
        ->when($request->brand, function ($query, $brands) {
          $query->whereIn('brand_id', (array) $brands); // (array) para garantir que seja um array, mesmo se for um único valor como "1"
        })
        ->when($request->category, function ($query, $categories) {
          $query->whereIn('category_id', (array) $categories);
        })
        ->latest()
        ->paginate($request->pageSize ?? 10)
        ->withQueryString();

      return ProductResource::collection($products);
    } catch (\Exception $e) {
      dd($e->getMessage());
    }
  }

  public function index()
  {
    $products = Product::all()->load('defaultColor', 'variations.color', 'variations.size', 'images');
    $brands = Brand::all();
    $categories = Category::all();
    $suppliers = Supplier::all();

    return Inertia::render('Products/index', [
      'products' => ProductResource::collection($products),
      'brands' => $brands,
      'categories' => CategoryResource::collection($categories),
      'suppliers' => SupplierResource::collection($suppliers),
    ]);
  }

  // Formulário de Criação de Produto
  public function create()
  {
    $brands = Brand::all();
    $categories = Category::all();
    $colors = Color::all();
    $sizes = Size::all();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
      'colors' => ColorResource::collection($colors),
      'sizes' => SizeResource::collection($sizes),
    ]);
  }

  // Criação de Produto
  public function store(ProductRequest $request)
  {
    try {
      $validatedData = $request->validated();

      $product = Product::create($validatedData);

      return redirect()->route('products.edit', $product->id)->with('success', 'Produto criado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar o produto.');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Product $product)
  {
    return Inertia::render('Products/index', [
      'product' => new ProductResource($product->load('variations.color', 'variations.size', 'defaultColor', 'images')),
    ]);
  }

  // Formulário de Edição de Produto
  public function edit(Product $product)
  {
    $brands = Brand::all();
    $categories = Category::all();
    $product->load('images', 'category.sizeGroup');
    $colors = Color::all();

    // Restringe os tamanhos disponíveis ao grupo vinculado à categoria do produto (quando houver)
    $sizes = $product->category?->size_group_id
      ? Size::where('size_group_id', $product->category->size_group_id)->orderBy('order')->get()
      : Size::orderBy('order')->get();

    return Inertia::render('Products/index', [
      'brands' => $brands,
      'categories' => $categories,
      'product' => new ProductResource($product->load('variations.color', 'variations.size', 'defaultColor')),
      'colors' => ColorResource::collection($colors),
      'sizes' => SizeResource::collection($sizes),
    ]);
  }

  // Atualização de Produto
  public function update(ProductRequest $request, Product $product)
  {
    try {
      $validatedData = $request->validated();
      $product->update($validatedData);

      return redirect()->back()->with('success', 'Produto atualizado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao atualizar o produto.');
    }
  }

  // Atualização da Cor Padrão do Produto
  public function updateDefaultColor(Request $request, Product $product)
  {
    try {
      $validatedData = $request->validate([
        'default_color_id' => 'required|exists:colors,id',
      ]);
      $product->default_color_id = $validatedData['default_color_id'];
      $product->save();

      return redirect()->back()->with('success', 'Cor definida como principal!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao definir cor principal.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product)
  {
    try {
      $product->delete();

      return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao excluir o produto.');
    }
  }
}
