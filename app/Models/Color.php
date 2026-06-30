<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
  /** @use HasFactory<\Database\Factories\ColorFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'name',
    'hex_code',
  ];

  // Possuem várias variações de produtos
  public function variations()
  {
    return $this->hasMany(ProductVariation::class, 'color_id');
  }

  // Possuem várias imagens
  public function images()
  {
    return $this->hasMany(ProductImages::class, 'color_id')->orderBy('position');
  }
}
