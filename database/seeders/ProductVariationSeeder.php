<?php

namespace Database\Seeders;

use App\Models\ProductImages;
use App\Models\ProductVariation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariationSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Cria 10 variações de produtos, cada uma com 5 imagens associadas
    ProductVariation::factory(10)->has(ProductImages::factory(5), 'images')->create();
  }
}
