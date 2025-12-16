<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProductVariation\CreateVariationRequest;
use App\Http\Requests\ProductVariation\EditVariationRequest;
use App\Models\ProductVariation;
use Illuminate\Support\Facades\DB;

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
    dd($request->all());
    try {
      // Transaction garante que ou todas as operações sejam concluídas com sucesso ou nenhuma seja aplicada em caso de falha
      DB::transaction(function () use ($request) {
        $validated = $request->validated();
        $variation = ProductVariation::create($validated);

        if ($request->boolean('is_default')) {
          $variation->product->default_variation_id = $variation->id;
          $variation->product->save();
        }

        if ($request->hasFile('images')) {
          foreach ($request->file('images') as $image) {
            $path = $image->store('product_images', 'public'); // Armazena a imagem no disco 'public' dentro da pasta 'product_images'
            $variation->images()->create(['path' => $path]); // Cria o registro da imagem associada à variação do produto
          }
        }
      });
      return redirect()->back()->with('success', 'Variação do produto criada com sucesso!');
    } catch (\Exception $e) {
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
  public function update(EditVariationRequest $request, ProductVariation $productVariation)
  {
    dd($request->all());
    try {
      DB::transaction(function () use ($request, $productVariation) {
        $validated = $request->validated();
        $productVariation->update($validated);

        if ($request->hasFile('images')) {
          foreach ($request->file('images') as $image) {
            $path = $image->store('product_images', 'public'); // Armazena a imagem no disco 'public' dentro da pasta 'product_images'
            $productVariation->images()->create(['path' => $path]); // Cria o registro da imagem associada à variação do produto
          }
        }
      });
      return redirect()->back()->with('success', 'Variação do produto atualizada com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao atualizar a variação do produto.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductVariation $productVariation)
  {
    try {
      $productVariation->delete();

      // permanacer na mesma rota e apenas enviar mensagem
      return redirect()->back()->with('success', 'Variação do produto excluída com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao excluir a variação do produto.');
    }
  }
}
