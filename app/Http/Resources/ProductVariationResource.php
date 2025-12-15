<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariationResource extends JsonResource
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
      'sku' => $this->sku,
      'color' => $this->color,
      'colorCode' => $this->color_code,
      'size' => $this->size,
      'price' => $this->price,
      'oldPrice' => $this->old_price,
      'stockQuantity' => $this->stock_quantity,
      'pixDiscountPercent' => $this->pix_discount_percent,
      'tecnicalSpecifications' => $this->tecnical_specifications,
      'images' => ProductImageResource::collection($this->whenLoaded('images')),
      'supplier' => new SupplierResource($this->whenLoaded('supplier')),
    ];
  }
}
