<?php

namespace Database\Seeders;

use Database\Seeders\UserSeeder;
use Database\Seeders\BrandSeeder;
use Database\Seeders\AddressSeeder;
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
      SupplierSeeder::class,
      ProductSeeder::class,
    ]);
  }
}
