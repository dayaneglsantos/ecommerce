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
      'coupon_id' => null, // Deve ser definido ao criar a regra
      'ruleable_id' => null, // Deve ser definido ao criar a regra
      'ruleable_type' => null, // Deve ser definido ao criar a regra
      'condition' => fake()->boolean(10) ? 'exclude' : 'include', // 20% de chance de ser 'exclude'
      'group_id' => null, // Pode ser definido para associar a um grupo, ou null para regras sem grupo
    ];
  }
}
