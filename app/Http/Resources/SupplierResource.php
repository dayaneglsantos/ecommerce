<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
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
      'cnpj' => $this->cnpj,
      'email' => $this->email,
      'phoneNumber' => $this->phone_number,
      'contactName' => $this->contact_name,
      'address' => new AddressResource($this->whenLoaded('address')),
      'notes' => $this->notes,
      'status' => $this->status,
    ];
  }
}
