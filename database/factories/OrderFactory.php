<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
      'payment_method' => fake()->randomElement(['credit_card', 'boleto', 'pix']),
      'tracking_code' => fake()->optional()->bothify('TRACK-#####'),
      'shipping_service' => fake()->optional()->randomElement(['Correios', 'FedEx', 'UPS', 'DHL']),
      'shipped_at' => fake()->optional()->dateTimeBetween('-10 days', 'now'),
      'delivered_at' => fake()->optional()->dateTimeBetween('shipped_at', '+10 days'),
      'total_value' => fake()->randomFloat(2, 20, 500),
      'shipping_cost' => fake()->randomFloat(2, 5, 50),
      'discount_value' => fake()->randomFloat(2, 0, 100),
    ];
  }
}
