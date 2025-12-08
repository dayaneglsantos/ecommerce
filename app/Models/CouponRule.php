<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponRule extends Model
{
  /** @use HasFactory<\Database\Factories\CouponRuleFactory> */
  use HasFactory;

  protected $fillable = [
    'description',
    'coupon_id',
    'ruleable_id',
    'ruleable_type',
    'exclude',
  ];

  public function coupon()
  {
    return $this->belongsTo(Coupon::class);
  }
}
