<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'zip_code' => fake()->postcode(),
      'state' => fake()->state,
      'city' => fake()->city(),
      'street' => fake()->streetName(),
      'number' => fake()->numberBetween(1, 1000),
      'complement' => fake()->optional()->secondaryAddress(),
      'user_id' => User::factory(),
    ];
  }
}
