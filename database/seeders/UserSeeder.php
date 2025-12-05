<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  public function run(): void
  {
    User::factory()->create([
      'name' => 'Dayane',
      'email' => 'dayaneglsantos@gmail.com',
      'password' => 'Senha123@',
    ]);
    User::factory()->create([
      'name' => 'Admin',
      'email' => 'admin@teste.com',
      'password' => 'Senha123@',
      'profile' => 'admin'
    ]);
  }
}
