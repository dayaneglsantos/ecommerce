<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\ProductVariation;
use App\Models\ProductVariationAttribute;
use Illuminate\Database\Seeder;

class ProductVariationAttributeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $variations = ProductVariation::all();
    $attributeValues = AttributeValue::all();

    foreach ($variations as $variation) {
      $variation->attributes()->createMany(
        ProductVariationAttribute::factory(2)->create([
          'product_variation_id' => $variation->id,
          'attribute_value_id' => $attributeValues->random()->id,
        ])->toArray()
      );
    }
  }
}
