<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'type' => fake()->randomElement(['product', 'shipping']),
      'discount_percentage' => fake()->numberBetween(5, 50),
      'discount_value' => null, // Como devemos escolher entre percentual ou valor fixo, deixamos null aqui
      'code' => strtoupper(fake()->unique()->bothify('????-#####')),
      'status' => fake()->randomElement(['active', 'inactive', 'expired']),
      'start_date' => fake()->dateTimeBetween('-1 month', 'now'),
      'end_date' => fake()->dateTimeBetween('now', '+1 month'),
      'available_quantity' => fake()->numberBetween(10, 100),
      'available_per_user' => fake()->numberBetween(1, 5),
      'minimum_order_value' => fake()->randomFloat(2, 20, 200),
    ];
  }
}
