<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
  /** @use HasFactory<\Database\Factories\SupplierFactory> */
  use HasFactory;

  protected $hidden = ['address_id'];

  protected $fillable = [
    'name',
    'cnpj',
    'phone_number',
    'email',
    'contact_name',
    'notes',
    'status'
  ];

  public function address()
  {
    return $this->morphOne(Address::class, 'addressable'); // Definindo o relacionamento polimórfico
  }

  public function productVariations()
  {
    return $this->hasMany(ProductVariation::class, 'supplier_id');
  }
}
