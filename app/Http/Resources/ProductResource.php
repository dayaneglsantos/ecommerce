<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use function PHPSTORM_META\type;

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
    $images = $this->productImages;

    $groupedVariations = $variations->groupBy(function ($variation) {
      $colorAttribute = $variation->attributeValues->first(function ($attrValue) {
        return $attrValue->attribute && $attrValue->attribute->name === 'cor';
      });

      return $colorAttribute && $colorAttribute->id;
    })
      ->map(function ($item) use ($images) {
        $firstItem = $item->first();

        $colorData = $firstItem->attributeValues->first(function ($attrValue) {
          return $attrValue->attribute && $attrValue->attribute->name === 'cor';
        });

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
              'oldPrice' => $var->old_price,
              'stockQuantity' => $var->stock_quantity,
              'sku' => $var->sku,
            ];
          })->values(),
          'images' => $images->filter(function ($img) use ($colorData) {
            return $colorData ? $colorData->id === $img->attribute_id : [];
          })->values(),
        ];
      })->values();

    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      'fullDescription' => $this->full_description,
      'slug' => $this->slug,
      // 'defaultVariation' => new ProductVariationResource($this->whenLoaded('defaultVariation')),
      'brand' => $this->whenLoaded('brand'), // Não foi criado Resource para Brand
      'category' => new CategoryResource($this->whenLoaded('category')),
      'variations' => $groupedVariations,
      'technicalSpecifications' => $this->technical_specifications,
      'reviews' => $this->whenLoaded('reviews'), // Não foi criado Resource para Review
    ];
  }
}
