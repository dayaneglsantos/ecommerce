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
    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      'fullDescription' => $this->full_description,
      'slug' => $this->slug,
      'defaultVariation' => new ProductVariationResource($this->whenLoaded('defaultVariation')),
      'brand' => $this->whenLoaded('brand'), // Não foi criado Resource para Brand
      'category' => new CategoryResource($this->whenLoaded('category')),
      'variations' => ProductVariationResource::collection($this->whenLoaded('variations')),
      'reviews' => $this->whenLoaded('reviews'), // Não foi criado Resource para Review
    ];
  }
}
