<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\SizeGroup;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $clothingGroupId = SizeGroup::where('name', 'Letra de roupa')->first()->id;
    $shoeGroupId = SizeGroup::where('name', 'Numérico calçado')->first()->id;
    $kidsGroupId = SizeGroup::where('name', 'Infantil')->first()->id;

    Size::factory()->createMany([
      ['size_group_id' => $clothingGroupId, 'value' => 'PP', 'order' => 1],
      ['size_group_id' => $clothingGroupId, 'value' => 'P', 'order' => 2],
      ['size_group_id' => $clothingGroupId, 'value' => 'M', 'order' => 3],
      ['size_group_id' => $clothingGroupId, 'value' => 'G', 'order' => 4],
      ['size_group_id' => $clothingGroupId, 'value' => 'GG', 'order' => 5],

      ['size_group_id' => $shoeGroupId, 'value' => '37', 'order' => 37],
      ['size_group_id' => $shoeGroupId, 'value' => '38', 'order' => 38],
      ['size_group_id' => $shoeGroupId, 'value' => '39', 'order' => 39],
      ['size_group_id' => $shoeGroupId, 'value' => '40', 'order' => 40],
      ['size_group_id' => $shoeGroupId, 'value' => '41', 'order' => 41],

      ['size_group_id' => $kidsGroupId, 'value' => '2 anos', 'order' => 1],
      ['size_group_id' => $kidsGroupId, 'value' => '4 anos', 'order' => 2],
      ['size_group_id' => $kidsGroupId, 'value' => '6 anos', 'order' => 3],
    ]);
  }
}
