<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImages extends Model
{
  /** @use HasFactory<\Database\Factories\ProductImagesFactory> */
  use HasFactory;

  protected $hidden = ['path'];

  protected $fillable = [
    'path',
    'is_primary',
  ];

  protected $casts = [
    'is_primary' => 'boolean',
  ];

  protected $appends = ["url"]; // Adiciona o atributo 'url' aos atributos serializados do modelo

  public function getUrlAttribute()
  {
    return Storage::url($this->path); // Gera a URL completa para acessar a imagem armazenada
  }

  public function productVariation()
  {
    return $this->belongsTo(ProductVariation::class, 'product_variation_id');
  }
}
