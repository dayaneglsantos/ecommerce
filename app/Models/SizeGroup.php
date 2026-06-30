<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeGroup extends Model
{
  /** @use HasFactory<\Database\Factories\SizeGroupFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'name',
  ];

  public function sizes()
  {
    return $this->hasMany(Size::class, 'size_group_id')->orderBy('order');
  }

  public function categories()
  {
    return $this->hasMany(Category::class, 'size_group_id');
  }
}
