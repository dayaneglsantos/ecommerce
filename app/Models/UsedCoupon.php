<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedCoupon extends Model
{
  /** @use HasFactory<\Database\Factories\UsedCouponFactory> */
  use HasFactory;

  public $timestamps = false; // Desativa timestamps se não forem necessários

  protected $fillable = [
    'user_id',
    'coupon_id',
    'used_at',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function coupon()
  {
    return $this->belongsTo(Coupon::class);
  }
}
