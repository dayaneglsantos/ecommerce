<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProductVariation\CreateVariationRequest;
use App\Http\Requests\ProductVariation\UpdateVariationRequest;
use App\Models\ProductVariation;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
  public function store(CreateVariationRequest $request)
  {
    try {
      // Transaction garante que ou todas as operações sejam concluídas com sucesso ou nenhuma seja aplicada em caso de falha
      DB::transaction(function () use ($request) {
        $validated = $request->validated();

        $validated['color_id'] = $validated['color'];
        $validated['size_id'] = $validated['size'];
        unset($validated['color']); // Remover o campo 'color' do array validado
        unset($validated['size']); // Remover o campo 'size' do array validado

        $variation = ProductVariation::create($validated);

        // Se for a primeira variação criada para o produto, define a cor padrão do produto
        $productVariations = $variation->product->variations;
        if ($productVariations->count() === 1) {
          $variation->product->default_color_id = $request->input('color');
          $variation->product->save();
        }
      });
      return redirect()->back()->with('success', 'Variação do produto criada com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao criar a variação do produto.');
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
  public function update(UpdateVariationRequest $request, ProductVariation $productVariation)
  {
    try {
      DB::transaction(function () use ($request, $productVariation) {
        $validated = $request->validated();

        if ((int)$validated['price'] !== (int)$productVariation->price) {
          $validated['old_price'] = $productVariation->price;
        } else {
          $validated['old_price'] = $productVariation->old_price;
        }

        $productVariation->update($validated);
      });
      return redirect()->back()->with('success', 'Variação do produto atualizada com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao atualizar a variação do produto.');
    }
  }

  // Remove uma variação específica do produto
  public function destroy(ProductVariation $productVariation)
  {
    try {

      $productVariation->delete();

      return redirect()->back()->with('success', 'Variação do produto excluída com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao excluir variação do produto.');
    }
  }


  // Remove todas as variações de uma cor específica
  public function destroyColor(Request $request)
  {
    try {
      $ids = $request->input('ids'); // IDs das variações a serem deletadas

      // Deleta todas as variações cujos IDs estão na lista fornecida
      ProductVariation::whereIn('id', $ids)->delete();
      return redirect()->back()->with('success', 'Cor do produto excluída com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao excluir cor do produto.');
    }
  }
}
