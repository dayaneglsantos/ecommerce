<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Card extends Model
{
  /** @use HasFactory<\Database\Factories\CardFactory> */
  use HasFactory;

  protected $hidden = [
    'user_id',
    'created_at',
    'updated_at',
  ];

  protected $casts = [
    'is_default' => 'boolean', // Garante que 0/1 seja sempre true/false em PHP
  ];

  protected $fillable = [
    'user_id',
    'token',
    'last_four',
    'brand',
    'expiration_month',
    'is_default',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
