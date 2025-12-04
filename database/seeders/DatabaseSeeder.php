<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // User::factory(10)->create();

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

    Address::factory(10)->create();
  }
}
