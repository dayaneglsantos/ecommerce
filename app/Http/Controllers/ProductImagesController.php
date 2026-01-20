<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductImage\CreateProductImageRequest;
use App\Http\Requests\ProductImage\UpdateProductImageRequest;
use App\Models\Product;
use App\Models\ProductImages;

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
  public function store(CreateProductImageRequest $request, Product $product)
  {
    try {
      $validated = $request->validated();

      foreach ($validated['images'] as $imageData) {
        if (isset($imageData['file'])) {
          $path = $imageData['file']->store('product-images', 'public');
          $product->images()->create(['path' => $path, 'position' => $imageData['position'], 'attribute_id' => $validated['attribute_id']]);
        }
      }
      return redirect()->back()->with('success', 'Imagem do produto adicionada com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
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
  public function update(UpdateProductImageRequest $request, Product $product)
  {
    try {
      $validated = $request->validated();

      // Exclusão de imagens
      if (isset($validated['images_to_delete'])) {
        foreach ($validated['images_to_delete'] as $imageId) {
          $image = $product->images()->find($imageId);
          if ($image) {
            $image->delete(); // Excluir o registro do banco de dados
          }
        }
      }

      // Inclusão e atualização de imagens
      foreach ($validated['images'] as $imageData) {
        if (isset($imageData['file'])) { // Nova imagem para upload
          $path = $imageData['file']->store('product-images', 'public');
          $product->images()->create(['path' => $path, 'position' => $imageData['position'], 'attribute_id' => $validated['attribute_id']]);
        } else if (isset($imageData['id'])) { // Atualizar a posição da imagem existente
          $image = $product->images()->find($imageData['id']);
          if ($image) {
            $image->position = $imageData['position'];
            $image->save();
          }
        }
      }
      return redirect()->route('products.edit', $product->id)->with('success', 'Imagens do produto atualizadas com sucesso!');
    } catch (\Exception $e) {

      return redirect()->back()->with('error', 'Erro ao atualizar a imagens do produto.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductImages $productImages)
  {
    //
  }
}
