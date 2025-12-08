<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\CouponRule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
  public function run(): void
  {
    Coupon::factory(10)
      ->has(CouponRule::factory(2), 'rules')
      ->create();
  }
}
