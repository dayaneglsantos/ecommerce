<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImages extends Model
{
  /** @use HasFactory<\Database\Factories\ProductImagesFactory> */
  use HasFactory;

  protected $hidden = ['path', 'created_at', 'updated_at', 'position', 'product_id', 'attribute_id'];

  protected $with = ['attribute'];

  protected $fillable = [
    'path',
    'position',
    'product_id',
    'attribute_id',
  ];

  protected $appends = ["url"]; // Adiciona o atributo 'url' aos atributos serializados do modelo

  public function getUrlAttribute()
  {
    return Storage::url($this->path); // Gera a URL completa para acessar a imagem armazenada
  }

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }

  public function attribute()
  {
    return $this->belongsTo(AttributeValue::class, 'attribute_id');
  }
}
