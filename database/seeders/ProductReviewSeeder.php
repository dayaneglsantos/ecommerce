<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductReview;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductReviewSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    $users = User::all();
    $products = Product::all();

    ProductReview::factory(10)
      ->state(function () use ($users, $products) {
        return [
          'user_id' => $users->random()->id,
          'product_id' => $products->random()->id,
        ];
      })
      ->create();
  }
}
