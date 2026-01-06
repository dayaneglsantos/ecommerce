<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\ProductVariation;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
  public function run(): void
  {
    $categories = Category::all();
    $brands = Brand::all();
    $attributesValues = AttributeValue::all();


    Product::factory(10)
      ->recycle($brands)
      ->recycle($categories)
      ->state(function () use ($brands, $categories) {
        return [
          'brand_id' => $brands->random()->id,
          'category_id' => $categories->random()->id,
        ];
      })
      ->has(ProductVariation::factory(3), 'variations')
      ->has(ProductImages::factory(3)->recycle($attributesValues)->state(function () use ($attributesValues) {
        return [
          'attribute_id' => $attributesValues->random()->id,
        ];
      }), 'images')
      ->create()
      ->each(function (Product $product) {
        // Define a variação padrão como a primeira variação criada
        $defaultVariation = $product->variations->first();
        $product->default_variation_id = $defaultVariation->id;
        $product->save();
      });
  }
}
