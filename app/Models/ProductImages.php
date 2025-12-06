<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
  /** @use HasFactory<\Database\Factories\ProductImagesFactory> */
  use HasFactory;

  protected $fillable = [
    'path',
    'is_primary',
  ];

  protected $casts = [
    'is_primary' => 'boolean',
  ];

  public function productVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'product_variation_id');
  }
}
