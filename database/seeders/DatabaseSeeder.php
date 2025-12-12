<?php

namespace Database\Seeders;

use Database\Seeders\UserSeeder;
use Database\Seeders\BrandSeeder;
use Database\Seeders\CommentSeeder;
use Database\Seeders\CategorySeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    $this->call([
      UserSeeder::class,
      BrandSeeder::class,
      CategorySeeder::class,
      ProductSeeder::class,
      CommentSeeder::class,
      ProductReviewSeeder::class,
      FavoriteSeeder::class,
      CouponSeeder::class,
      UsedCouponSeeder::class,
      CartSeeder::class,
      OrderSeeder::class,
      SupplierSeeder::class,
    ]);
  }
}
