<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\ProductVariation;
use App\Models\User;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $users = User::all();
    $products = ProductVariation::all();

    Favorite::factory(10)
      ->state(function () use ($users, $products) {
        return [
          'user_id' => $users->random()->id,
          'product_variant_id' => $products->random()->id,
        ];
      })
      ->create();
  }
}
