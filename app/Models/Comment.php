<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  /** @use HasFactory<\Database\Factories\CommentFactory> */
  use HasFactory;

  protected $fillable = [
    'content',
    'parent_id',
  ];

  public function parent()
  {
    return $this->belongsTo(Comment::class, 'parent_id');
  }

  public function replies()
  {
    return $this->hasMany(Comment::class, 'parent_id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}
