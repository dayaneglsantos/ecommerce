<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  /** @use HasFactory<\Database\Factories\ProductFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
    'default_variation_id',
    'brand_id',
    'category_id',
  ];

  protected $casts = [
    'technical_specifications' => 'array',  // Informar ao Laravel que este campo JSON deve ser tratado como um array PHP.
  ];

  protected $fillable = [
    'name',
    'slug',
    'description',
    'full_description',
    'brand_id',
    'category_id',
    'technical_specifications',
  ];

  protected $with = ['brand', 'category'];

  public function brand()
  {
    return $this->belongsTo(Brand::class, 'brand_id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id');
  }

  public function variations()
  {
    return $this->hasMany(ProductVariation::class, 'product_id');
  }

  public function defaultVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'default_variation_id');
  }

  public function productImages()
  {
    return $this->hasMany(ProductImages::class, 'product_id')->orderBy('position');
  }

  public function reviews()
  {
    return $this->hasMany(ProductReview::class, 'product_id');
  }
}
