<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $users = User::all();
    $addresses = Address::all();
    $products = Product::all();
    $productVariations = $products->flatMap->variations;

    Order::factory(10)
      ->state(function () use ($users, $addresses) {
        return [
          'user_id' => $users->random()->id,
          'shipping_address_id' => $addresses->random()->id,
        ];
      })
      ->has(OrderItem::factory()->count(3)->state(function () use ($productVariations) {
        return [
          'product_variation_id' => $productVariations->random()->id,
          'product_id' => $productVariations->random()->product_id,
        ];
      }), 'items')
      ->create();
  }
}
