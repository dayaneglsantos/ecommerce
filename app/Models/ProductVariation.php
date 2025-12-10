<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
  /** @use HasFactory<\Database\Factories\ProductVariationFactory> */
  use HasFactory;

  protected $hidden = [
    'product_id',
    'supplier_id',
    'created_at',
    'updated_at',
  ];

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

  protected $casts = [
    'technical_specifications' => 'array',  // Informar ao Laravel que este campo JSON deve ser tratado como um array PHP.
    'old_price' => 'float',
    'price' => 'float',
  ];

  protected $with = ['images', 'supplier', 'product'];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }

  public function images()
  {
    return $this->hasMany(ProductImages::class, 'product_variation_id');
  }

  public function supplier()
  {
    return $this->belongsTo(Supplier::class);
  }
}
