<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStockEntrieRequest;
use App\Models\Product;
use App\Models\ProductStockEntrie;
use Illuminate\Http\Request;

class ProductStockEntrieController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
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
  public function store(ProductStockEntrieRequest $request, Product $product)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductStockEntrie $productStockEntrie)
  {
    //
  }
}
