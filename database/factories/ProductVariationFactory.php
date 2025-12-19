<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariation>
 */
class ProductVariationFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'color' => fake()->safeColorName(),
      'color_code' => fake()->hexColor(),
      'size' => fake()->randomElement(['S', 'M', 'L', 'XL', 'XXL']),
      'old_price' => fake()->numberBetween(20, 600),
      'price' => fake()->numberBetween(10, 500),
      'stock_quantity' => fake()->numberBetween(0, 100),
      'pix_discount_type' => fake()->randomElement(['percentage', 'fixed']),
      'pix_discount_value' => fake()->numberBetween(0, 50),
      'sku' => fake()->unique()->bothify('SKU-#####'),
      'technical_specifications' => [
        'weight' => fake()->randomFloat(2, 0.1, 5.0) . ' kg',
        'dimensions' => fake()->randomFloat(2, 5.0, 50.0) . ' x ' . fake()->randomFloat(2, 5.0, 50.0) . ' x ' . fake()->randomFloat(2, 1.0, 30.0) . ' cm',
        'material' => fake()->randomElement(['Cotton', 'Polyester', 'Leather', 'Wool']),
      ],
    ];
  }
}
