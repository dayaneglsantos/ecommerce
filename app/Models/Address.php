<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
  use HasFactory; // Permite o uso de factories para o modelo Address

  protected $hidden = [
    'user_id',
    'created_at',
    'updated_at',
  ];

  protected $casts = [
    'default' => 'boolean', // Garante que 0/1 seja sempre true/false em PHP
  ];


  protected $fillable = [
    'zip_code',
    'state',
    'city',
    'street',
    'number',
    'complement',
    'user_id',
    'default',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
