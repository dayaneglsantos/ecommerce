<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
  public function run(): void
  {
    // Cria 10 fornecedores, cada um com 1 endereço associado
    Supplier::factory(10)
      ->has(Address::factory(1), 'addresses')
      ->create();
  }
}
