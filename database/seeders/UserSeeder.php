<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  public function run(): void
  {
    // Cria 5 usuários, cada um com um endereço associado
    User::factory(5)->has(Address::factory(1), 'addresses')->create();

    // Cria usuários customer
    User::factory()->create([
      'name' => 'Dayane',
      'email' => 'dayaneglsantos@gmail.com',
      'password' => 'Senha123@',
    ]);

    // Cria usuário admin
    User::factory()->create([
      'name' => 'Admin',
      'email' => 'admin@teste.com',
      'password' => 'Senha123@',
      'profile' => 'admin'
    ]);
  }
}
