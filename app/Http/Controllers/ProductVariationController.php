<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProductVariation\CreateVariationRequest;
use App\Http\Requests\ProductVariation\EditVariationRequest;
use App\Models\ProductVariation;
use Illuminate\Support\Facades\DB;
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
        $variation = ProductVariation::create($validated);

        if ($request->boolean('is_default')) {
          $variation->product->default_variation_id = $variation->id;
          $variation->product->save();
        }

        foreach ($validated['images'] as $imageData) {
          if (isset($imageData['file'])) {
            $path = $imageData['file']->store('product-images', 'public');
            $variation->images()->create(['path' => $path, 'position' => $imageData['position']]);
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
    try {
      DB::transaction(function () use ($request, $productVariation) {
        $validated = $request->validated();

        if ((int)$validated['price'] !== (int)$productVariation->price) {
          $validated['old_price'] = $productVariation->price;
        } else {
          $validated['old_price'] = $productVariation->old_price;
        }

        $productVariation->update($validated);

        // Exclusão de imagens
        if (isset($validated['images_to_delete'])) {
          foreach ($validated['images_to_delete'] as $imageId) {
            $image = $productVariation->images()->find($imageId);
            if ($image) {
              $image->delete(); // Excluir o registro do banco de dados
            }
          }
        }

        // Inclusão e atualização de imagens
        foreach ($validated['images'] as $imageData) {
          if (isset($imageData['file'])) { // Nova imagem para upload
            $path = $imageData['file']->store('product-images', 'public');
            $productVariation->images()->create(['path' => $path, 'position' => $imageData['position']]);
          } else if (isset($imageData['id'])) { // Atualizar a posição da imagem existente
            $image = $productVariation->images()->find($imageData['id']);
            if ($image) {
              $image->position = $imageData['position'];
              $image->save();
            }
          }
        }
      });
      return redirect()->back()->with('success', 'Variação do produto atualizada com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao atualizar a variação do produto.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductVariation $productVariation)
  {
    try {
      // DB::transaction(function () use ($productVariation) {
      //   $productVariations = $productVariation->product->variations;
      //   // Definir a outra variação como padrão quando a variação padrão for excluída e houver apenas duas variações
      //   if ($productVariations->count() === 2 && $productVariation->product->default_variation_id === $productVariation->id) {
      //     $otherVariation = $productVariations->firstWhere('id', '!=', $productVariation->id);
      //     $productVariation->product->default_variation_id = $otherVariation->id;
      //     $productVariation->product->save();
      //   }

      //   // 1. Deleta as imagens manualmente para disparar o Observer de cada imagem
      //   foreach ($productVariation->images as $image) {
      //     $image->delete();
      //   }

      //   $productVariation->delete();
      // });



      $productVariation->delete();

      return redirect()->back()->with('success', 'Variação do produto excluída com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao excluir variação do produto.');
    }
  }
}
