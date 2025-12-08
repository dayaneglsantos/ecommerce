<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\ProductVariation;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $users = User::all();
    $productVariations = ProductVariation::all();

    Cart::factory(5)
      ->state(function () use ($users, $productVariations) {
        return [
          'user_id' => $users->random()->id,
          'product_variation_id' => $productVariations->random()->id,
        ];
      })
      ->create();
  }
}
