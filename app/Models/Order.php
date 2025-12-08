<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  /** @use HasFactory<\Database\Factories\OrderFactory> */
  use HasFactory;

  protected $fillable = [
    'user_id',
    'coupon_id',
    'shipping_address_id',
    'status',
    'payment_method',
    'tracking_code',
    'shipping_service',
    'shipped_at',
    'delivered_at',
    'total_value',
    'shipping_cost',
    'discount_value',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }
}
