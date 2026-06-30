<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
  /** @use HasFactory<\Database\Factories\SizeFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'size_group_id',
    'value',
    'order',
  ];

  public function sizeGroup()
  {
    return $this->belongsTo(SizeGroup::class, 'size_group_id');
  }

  public function variations()
  {
    return $this->hasMany(ProductVariation::class, 'size_id');
  }
}
