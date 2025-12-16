<?php

namespace App\Http\Controllers;

use App\Models\ProductImages;
use App\Models\ProductVariation;
use Illuminate\Http\Request;

class ProductImagesController extends Controller
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
  public function store(Request $request, ProductVariation $variation)
  {
    dd($request->all());
    try {
      // Lógica para salvar a imagem do produto
      return redirect()->back();
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao adicionar a imagem do produto.');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductImages $productImages)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductImages $productImages)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, ProductImages $productImages)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductImages $productImages)
  {
    //
  }
}
