<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\UsedCoupon;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsedCouponSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $coupons = Coupon::all();
    $users = User::all();
    UsedCoupon::factory(5)
      ->state(function () use ($coupons, $users) {
        return [
          'coupon_id' => $coupons->random()->id,
          'user_id' => $users->random()->id,
        ];
      })
      ->create();
  }
}
