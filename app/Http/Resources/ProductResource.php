<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    $variations = $this->whenLoaded('variations');


    $groupedVariations = $variations->groupBy(function ($variation) {
      $colorAttribute = $variation->attributeValues->first(function ($attrValue) {
        return $attrValue->attribute && $attrValue->attribute->name === 'cor';
      });


      // Retorna o valor ou um fallback caso a variação não tenha cor cadastrada
      return $colorAttribute && $colorAttribute->id;
    })
      ->map(function ($item, $colorValueId) {
        // dd($item->first()->attributeValues->first()->value);
        $firstItem = $item->first();

        $colorData = $firstItem->attributeValues->first(function ($attrValue) {
          return $attrValue->attribute && $attrValue->attribute->name === 'cor';
        });
        // dd($colorData->value);

        return [
          'color' => $colorData ? $colorData->value : '',
          'sizes' => $item->map(function ($var) {
            $sizeData = $var->attributeValues->first(function ($attrValue) {
              return $attrValue->attribute && strtolower($attrValue->attribute->name) === 'tamanho';
            });
            return [
              'id' => $var->id,
              'size' => $sizeData ? $sizeData->value : '',
              'price' => $var->price,
              'oldPrice' => $var->oldPrice,
              'stockQuantity' => $var->stockQuantity,
              'sku' => $var->sku,
            ];
          })->values(),
          'images' => $this->images->filter(function ($img) use ($colorValueId) {
            return $img->attribute_value_id === $colorValueId;
          })->pluck('path')
        ];
      })->values();

    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      'fullDescription' => $this->full_description,
      'slug' => $this->slug,
      'defaultVariation' => new ProductVariationResource($this->whenLoaded('defaultVariation')),
      'brand' => $this->whenLoaded('brand'), // Não foi criado Resource para Brand
      'category' => new CategoryResource($this->whenLoaded('category')),
      'variations' => $groupedVariations,
      'technicalSpecifications' => $this->technical_specifications,
      'reviews' => $this->whenLoaded('reviews'), // Não foi criado Resource para Review
    ];
  }
}
