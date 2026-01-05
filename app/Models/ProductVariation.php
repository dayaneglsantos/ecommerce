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
    'pix_discount_type',
    'pix_discount_value',
    'sku',
    'technical_specifications',
    'supplier_id',
  ];

  protected $casts = [
    'technical_specifications' => 'array',  // Informar ao Laravel que este campo JSON deve ser tratado como um array PHP.
    'old_price' => 'integer',
    'price' => 'integer',
    'pix_discount_value' => 'integer',
  ];

  protected $with = ['images', 'supplier', 'product'];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }

  public function images()
  {
    return $this->hasMany(ProductImages::class, 'product_variation_id')->orderBy('position');
  }

  public function supplier()
  {
    return $this->belongsTo(Supplier::class);
  }

  public function getPriceFormattedAttribute(): float
  {
    return $this->price / 100;
  }

  public function getOldPriceFormattedAttribute(): ?float
  {
    return $this->old_price !== null
      ? $this->old_price / 100
      : null;
  }

  public function getPixDiscountFormattedAttribute(): ?float
  {
    if ($this->pix_discount_type !== 'fixed') {
      return $this->pix_discount_value;
    }

    return $this->pix_discount_value / 100;
  }
}
