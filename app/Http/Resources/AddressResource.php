<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'zipCode' => $this->zip_code,
      'state' => $this->state,
      'city' => $this->city,
      'street' => $this->street,
      'number' => $this->number,
      'complement' => $this->complement,
      'default' => $this->default,
    ];
  }
}
