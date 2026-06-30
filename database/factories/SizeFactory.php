<?php

namespace Database\Factories;

use App\Models\SizeGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Size>
 */
class SizeFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'size_group_id' => SizeGroup::factory(),
      'value' => $this->faker->randomElement(['P', 'M', 'G', 'GG']),
      'order' => 0,
    ];
  }
}
