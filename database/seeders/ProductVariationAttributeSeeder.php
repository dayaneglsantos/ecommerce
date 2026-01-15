<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\ProductVariation;
use App\Models\ProductVariationAttribute;
use Illuminate\Database\Seeder;

use function PHPSTORM_META\type;

class ProductVariationAttributeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $variations = ProductVariation::all();
    $attributeValues = AttributeValue::all();

    $colorValues = $attributeValues->filter(function ($item) {
      return strtolower($item?->attribute?->name) === 'cor';
    })->values();

    $sizeValues = $attributeValues->filter(function ($item) {
      return strtolower($item?->attribute?->name) === 'tamanho';
    })->values();

    foreach ($variations as $variation) {
      ProductVariationAttribute::factory()->createMany([
        [
          'product_variation_id' => $variation->id,
          'attribute_value_id' => $colorValues->random()->id,
        ],
        [
          'product_variation_id' => $variation->id,
          'attribute_value_id' => $sizeValues->random()->id,
        ],
      ])->toArray();
    }
  }
}
