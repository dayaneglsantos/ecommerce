<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
  /** @use HasFactory<\Database\Factories\ProductVariationFactory> */
  use HasFactory;

  protected $fillable = [
    'product_id',
    'color',
    'color_code',
    'size',
    'old_price',
    'price',
    'stock_quantity',
    'pix_discount_percent',
    'sku',
    'technical_specifications',
    'supplier_id',
  ];

  public function product()
  {
    return $this->belongsTo(Product::class);
  }

  public function images()
  {
    return $this->hasMany(ProductImages::class);
  }
}
