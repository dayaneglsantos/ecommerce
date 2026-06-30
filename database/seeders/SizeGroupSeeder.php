<?php

namespace Database\Seeders;

use App\Models\SizeGroup;
use Illuminate\Database\Seeder;

class SizeGroupSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    SizeGroup::factory()->createMany([
      ['name' => 'Letra de roupa'],
      ['name' => 'Numérico calçado'],
      ['name' => 'Infantil'],
    ]);
  }
}
