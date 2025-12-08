<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'quantity' => fake()->numberBetween(1, 5),
      'unit_price' => fake()->randomFloat(2, 10, 200),
      'discount_value' => fake()->randomFloat(2, 0, 50),
      'sku' => fake()->unique()->bothify('SKU-#####'),
    ];
  }
}
