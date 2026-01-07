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
    'product_variation_id',
    'attribute_value_id'
  ];

  protected $fillable = [
    'product_variation_id',
    'attribute_value_id'
  ];

  public function productVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'product_variation_id');
  }

  public function attributes()
  {
    return $this->hasMany(AttributeValue::class, 'attribute_value_id');
  }
}
