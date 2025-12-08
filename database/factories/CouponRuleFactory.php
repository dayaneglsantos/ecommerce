<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CouponRule>
 */
class CouponRuleFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'description' => fake()->sentence(),
      'coupon_id' => null, // Deve ser definido ao criar a regra
      'ruleable_id' => null, // Deve ser definido ao criar a regra
      'ruleable_type' => null, // Deve ser definido ao criar a regra
      'exclude' => fake()->boolean(20), // 20% de chance de ser true
    ];
  }
}
