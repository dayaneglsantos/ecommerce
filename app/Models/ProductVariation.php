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
  ];

  protected $casts = [
    'old_price' => 'integer',
    'price' => 'integer',
    'pix_discount_value' => 'integer',
  ];

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }

  public function attributes()
  {
    return $this->belongsToMany(AttributeValue::class, 'product_variation_attributes', 'product_variation_id', 'attribute_value_id');
  }

  public function entries()
  {
    return $this->hasMany(ProductStockEntrie::class, 'product_variation_id');
  }

  // ========== Ajuste de valores retornados ==========

  public function getPriceFormattedAttribute(): string
  {
    return number_format($this->price / 100, 2, ',', '.');
  }

  public function getOldPriceFormattedAttribute(): ?string
  {
    return $this->old_price !== null
      ? number_format($this->old_price / 100, 2, ',', '.')
      : null;
  }

  public function getPixDiscountValueFormattedAttribute(): ?string
  {
    if ($this->pix_discount_type !== 'fixed') {
      return $this->pix_discount_value;
    }

    return number_format($this->pix_discount_value / 100, 2, ',', '.');
  }
}
