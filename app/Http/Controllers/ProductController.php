<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Products/index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $brands = Brand::all();
    $categories = Category::all();

    return Inertia::render('Products/ProductForm', [
      'brands' => $brands,
      'categories' => $categories,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Product $products)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Product $products)
  {
    //
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
