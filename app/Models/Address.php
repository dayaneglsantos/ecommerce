<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{

  protected $hidden = [
    'user_id',
    'created_at',
    'updated_at',
  ];

  use HasFactory; // Permite o uso de factories para o modelo Address

  protected $fillable = [
    'zip_code',
    'state',
    'city',
    'street',
    'number',
    'complement',
    'user_id',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
