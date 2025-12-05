<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Brand extends Model
{
  /** @use HasFactory<\Database\Factories\BrandFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'name',
    'slug',
    'logo',
    'status',
  ];

  public function products()
  {
    return $this->hasMany(Product::class);
  }
}
