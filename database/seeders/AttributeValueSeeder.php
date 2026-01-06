<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeValueSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    AttributeValue::factory()->createMany([
      ['attribute_id' => 1, 'value' => 'Vermelho'],
      ['attribute_id' => 1, 'value' => 'Azul'],
      ['attribute_id' => 1, 'value' => 'Verde'],
      ['attribute_id' => 1, 'value' => 'Preto'],
      ['attribute_id' => 1, 'value' => 'Branco'],
      ['attribute_id' => 2, 'value' => 'P'],
      ['attribute_id' => 2, 'value' => 'M'],
      ['attribute_id' => 2, 'value' => 'G'],
      ['attribute_id' => 2, 'value' => 'GG'],
    ]);
  }
}
