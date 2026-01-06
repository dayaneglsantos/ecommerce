<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariationAttribute extends Model
{
  /** @use HasFactory<\Database\Factories\ProductVariationAttributeFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'product_variation_id',
    'attribute_value_id'
  ];
}
