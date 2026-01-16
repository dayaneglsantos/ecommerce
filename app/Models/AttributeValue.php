<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
  /** @use HasFactory<\Database\Factories\AttributeValueFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
    'attribute_id'
  ];

  protected $fillable = [
    'attribute_id',
    'value'
  ];

  // Possuem várias imagens
  public function attributeImages()
  {
    return $this->hasMany(ProductImages::class, 'attribute_id')->orderBy('position');
  }

  // Pertencem a um atributo
  public function attribute()
  {
    return $this->belongsTo(Attribute::class, 'attribute_id');
  }

  // Possuem várias variações de produtos
  public function productVariations()
  {
    return $this->belongsToMany(ProductVariationAttribute::class, 'attribute_value_id');
  }
}
