<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductVariationRequest;
use App\Models\ProductVariation;
use Illuminate\Http\Request;

class ProductVariationController extends Controller
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
  public function store(ProductVariationRequest $request)
  {
    try {
      $validatedData = $request->validated();
      ProductVariation::create($validatedData);

      return redirect()->route('products.index')->with('success', 'Variação do produto criada com sucesso!');
    } catch (\Exception $e) {
      return redirect()->route('products.index')->with('error', 'Erro ao criar a variação do produto.');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductVariation $productVariation)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductVariation $productVariation)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(ProductVariationRequest $request, ProductVariation $productVariation)
  {
    try {
      $validated = $request->validated();
      $productVariation->update($validated);

      return redirect()->route('products.index')->with('success', 'Variação do produto atualizada com sucesso!');
    } catch (\Exception $e) {
      return redirect()->route('products.index')->with('error', 'Erro ao atualizar a variação do produto.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductVariation $productVariation)
  {
    //
  }
}
