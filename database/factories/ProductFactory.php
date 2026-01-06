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
      'name' => fake()->word(),
      'slug' => fake()->unique()->slug(),
      'description' => fake()->paragraph(),
      'full_description' => fake()->text(500),
      'brand_id' => null,
      'category_id' => null,
      'technical_specifications' => [
        'Tamanho' => fake()->randomFloat(2, 0.1, 5.0) . ' kg',
        'Dimensões' => fake()->randomFloat(2, 5.0, 50.0) . ' x ' . fake()->randomFloat(2, 5.0, 50.0) . ' x ' . fake()->randomFloat(2, 1.0, 30.0) . ' cm',
        'Material' => fake()->randomElement(['Cotton', 'Polyester', 'Leather', 'Wool']),
      ],
    ];
  }
}
