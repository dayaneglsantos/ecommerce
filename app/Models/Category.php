<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  /** @use HasFactory<\Database\Factories\CategoryFactory> */
  use HasFactory;

  protected $hidden = [
    'created_at',
    'updated_at',
  ];

  protected $fillable = [
    'name',
    'slug',
    'description',
    'active',
    'parent_id',
    'size_group_id',
  ];

  protected $casts = [
    'active' => 'boolean',
  ];

  public function sizeGroup()
  {
    return $this->belongsTo(SizeGroup::class, 'size_group_id');
  }

  public function subCategories()
  {
    return $this->hasMany(Category::class, 'parent_id');
  }

  public function childrenRecursive()
  {
    return $this->subCategories()->with(['childrenRecursive', 'parentCategory']);
  }

  public function parentCategory()
  {
    return $this->belongsTo(Category::class, 'parent_id');
  }
}
