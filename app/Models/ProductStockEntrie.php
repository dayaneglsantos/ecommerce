<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStockEntrie extends Model
{
  /** @use HasFactory<\Database\Factories\ProductStockEntrieFactory> */
  use HasFactory;

  protected $fillable = [
    'product_variation_id',
    'supplier_id',
    'quantity',
    'unit_cost',
  ];

  public function productVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'product_variation_id');
  }
}
