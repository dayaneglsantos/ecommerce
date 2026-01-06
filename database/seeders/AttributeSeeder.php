<?php

namespace Database\Seeders;

use App\Models\Attribute;
use Dom\Attr;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Attribute::factory()->createMany([
      ['name' => 'Cor'],
      ['name' => 'Tamanho'],
    ]);
  }
}
