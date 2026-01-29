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

  protected $casts = [
    'unit_cost' => 'integer',
  ];

  public function productVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'product_variation_id');
  }

  public function supplier()
  {
    return $this->belongsTo(Supplier::class, 'supplier_id');
  }

  public function getUnitCostFormattedAttribute(): string
  {
    $formated = number_format($this->unit_cost / 100, 2, ',', '.');

    return $formated;
  }
}
