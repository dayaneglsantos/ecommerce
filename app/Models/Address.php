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
    'default',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function addressable()
  {
    // morphTo diz ao Eloquent para olhar para addressable_id e addressable_type para descobrir a qual modelo este endereço pertence
    return $this->morphTo();
  }

  public function suppliers()
  {
    return $this->belongsTo(Supplier::class);
  }
}
