<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
  /** @use HasFactory<\Database\Factories\SupplierFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'cnpj',
    'phone_number',
    'email',
    'contact_name',
    'notes'
  ];

  public function products()
  {
    return $this->hasMany(Product::class);
  }

  public function addresses()
  {
    return $this->morphMany(Address::class, 'addressable'); // Definindo o relacionamento polimórfico
  }
}
