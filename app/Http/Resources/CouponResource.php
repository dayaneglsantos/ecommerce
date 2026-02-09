<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
      'code' => $this->code,
      'type' => $this->type,
      'discount' => [
        'type' => $this->discount_type,
        'value' => $this->discount_value,
      ],
      'startDate' => $this->start_date,
      'endDate' => $this->end_date,
      "minimumOrderValue" => $this->minimum_order_value,
      "availableQuantity" => $this->available_quantity,
      "availablePerUser" => $this->available_per_user,
      'createdAt' => $this->created_at,
    ];
  }
}
