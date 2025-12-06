<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $users = User::all();
    $products = Product::all();

    Comment::factory(10)
      ->state(function () use ($users, $products) {
        return [
          'user_id' => $users->random()->id,
          'product_id' => $products->random()->id,
        ];
      })
      ->create();
  }
}
