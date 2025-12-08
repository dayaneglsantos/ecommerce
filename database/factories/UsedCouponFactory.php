<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UsedCoupon>
 */
class UsedCouponFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'user_id' => null, // Deve ser definido ao criar o registro
      'coupon_id' => null, // Deve ser definido ao criar o registro
      'used_at' => fake()->dateTime('now'),
    ];
  }
}
