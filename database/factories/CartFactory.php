<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
class CartFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'user_id' => null, // Deve ser definido ao criar o carrinho
      'product_variation_id' => null, // Deve ser definido ao criar o carrinho
      'quantity' => fake()->numberBetween(1, 5),
    ];
  }
}
