<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductStockEntrieResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'unitCost' => $this->unit_cost_formatted,
      'quantity' => $this->quantity,
      'supplier' => $this->whenLoaded('supplier', function () {
        return [
          'id' => $this->supplier->id,
          'name' => $this->supplier->name,
        ];
      }),
      'productVariation' => $this->whenLoaded('productVariation', function () {
        return [
          'id' => $this->productVariation->id,
          'color' => $this->productVariation->attributes->firstWhere(function ($attr) {
            return strtolower($attr->attribute->name) === 'cor';
          })?->value,
          'size' => $this->productVariation->attributes->first(function ($attr) {
            return strtolower($attr->attribute->name) === 'tamanho';
          })?->value,
          'product' => [
            'id' => $this->productVariation->product->id,
            'name' => $this->productVariation->product->name,
          ]
        ];
      }),
      'createdAt' => $this->created_at,
    ];
  }
}
