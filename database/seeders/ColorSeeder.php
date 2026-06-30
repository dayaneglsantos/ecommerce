<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
  public function run(): void
  {
    Color::factory()->createMany([
      ['name' => 'Preto',        'hex_code' => '#1A1A1A'],
      ['name' => 'Branco',       'hex_code' => '#FFFFFF'],
      ['name' => 'Cinza',        'hex_code' => '#9E9E9E'],
      ['name' => 'Cinza Escuro', 'hex_code' => '#424242'],
      ['name' => 'Azul Marinho', 'hex_code' => '#1A237E'],
      ['name' => 'Azul',         'hex_code' => '#1565C0'],
      ['name' => 'Azul Claro',   'hex_code' => '#90CAF9'],
      ['name' => 'Vermelho',     'hex_code' => '#C62828'],
      ['name' => 'Rosa',         'hex_code' => '#E91E63'],
      ['name' => 'Rosa Claro',   'hex_code' => '#F8BBD9'],
      ['name' => 'Verde',        'hex_code' => '#2E7D32'],
      ['name' => 'Verde Oliva',  'hex_code' => '#558B2F'],
      ['name' => 'Amarelo',      'hex_code' => '#F9A825'],
      ['name' => 'Laranja',      'hex_code' => '#E65100'],
      ['name' => 'Vinho',        'hex_code' => '#6A1B4D'],
      ['name' => 'Roxo',         'hex_code' => '#6A1B9A'],
      ['name' => 'Bege',         'hex_code' => '#D7CCC8'],
      ['name' => 'Caramelo',     'hex_code' => '#A1540C'],
      ['name' => 'Marrom',       'hex_code' => '#4E342E'],
      ['name' => 'Areia',        'hex_code' => '#F5DEB3'],
    ]);
  }
}
