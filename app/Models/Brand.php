<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

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
    'website',
  ];

  public function getLogoAttribute()
  {
    return Storage::url($this->attributes['logo']); // Gera a URL completa para acessar a imagem armazenada
  }

  public function products()
  {
    return $this->hasMany(Product::class);
  }
}
