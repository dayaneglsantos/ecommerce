<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
      'slug' => $this->slug,
      'active' => $this->active,
      'description' => $this->description,
      'subCategories' => CategoryResource::collection($this->whenLoaded('childrenRecursive')),
      'parent' => new CategoryResource($this->whenLoaded('parentCategory')),
    ];
  }
}
