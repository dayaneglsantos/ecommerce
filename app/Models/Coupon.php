<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
  /** @use HasFactory<\Database\Factories\CouponFactory> */
  use HasFactory;

  protected $fillable = [
    'type',
    'discount_type',
    'discount_value',
    'code',
    'status',
    'start_date',
    'end_date',
    'available_quantity',
    'available_per_user',
    'minimum_order_value',
  ];

  public function rules()
  {
    return $this->hasMany(CouponRule::class);
  }

  public function getMinimumOrderValueFormattedAttribute(): string
  {
    return number_format($this->minimum_order_value / 100, 2, ',', '.');
  }

  public function getDiscountValueFormattedAttribute(): string
  {
    if ($this->discount_type !== 'fixed') {
      return $this->discount_value;
    }

    return number_format($this->discount_value / 100, 2, ',', '.');
  }
}
