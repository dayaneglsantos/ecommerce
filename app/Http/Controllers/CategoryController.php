<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

  public function list(Request $request)
  {
    try {
      $products = Category::query()
        ->when($request->search, function ($query, $search) {
          $query->where('name', 'like', "%{$search}%");
        })->latest()
        ->paginate($request->pageSize ?? 10)
        ->withQueryString();

      return CategoryResource::collection($products);
    } catch (\Exception $e) {
      dd($e->getMessage());
    }
  }

  public function index()
  {
    // Apenas categorias principais com suas subcategorias carregadas recursivamente
    $categories = Category::whereNull('parent_id')
      ->with('childrenRecursive')
      ->get();

    $allCategories = Category::all();

    return Inertia::render('Categories/index', [
      'categories' => CategoryResource::collection($categories),
      'allCategories' => CategoryResource::collection($allCategories),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CategoryRequest $request)
  {
    try {
      $validated = $request->validated();
      Category::create($validated);
      return redirect()->back()->with('success', 'Categoria criada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar categoria');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Category $category)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CategoryRequest $request, Category $category)
  {
    try {
      $validated = $request->validated();
      $category->update($validated);
      return redirect()->back()->with('success', 'Categoria atualizada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao atualizar categoria');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    try {
      $category->delete();


      return redirect()->back()->with('success', 'Categoria deletada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao deletar categoria');
    }
  }
}
