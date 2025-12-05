<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'name' => fake()->productName(),
      'slug' => fake()->unique()->slug(),
      'description' => fake()->paragraph(),
      'full_description' => fake()->text(500),
      'brand_id' => null,
      'category_id' => null,
    ];
  }
}
