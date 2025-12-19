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
      'price' => $this->price_formatted,
      'oldPrice' => $this->old_price_formatted,
      'stockQuantity' => $this->stock_quantity,
      'pixDiscountType' => $this->pix_discount_type,
      'pixDiscountValue' => $this->pix_discount_formatted,
      'technicalSpecifications' => $this->technical_specifications,
      'images' => ProductImageResource::collection($this->whenLoaded('images')),
      'supplier' => new SupplierResource($this->whenLoaded('supplier')),
    ];
  }
}
