<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
  public function run(): void
  {
    Brand::factory()->createMany([
      ['name' => 'Hering',    'slug' => 'hering',    'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.hering.com.br'],
      ['name' => 'Reserva',   'slug' => 'reserva',   'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.reserva.com.br'],
      ['name' => 'Farm Rio',  'slug' => 'farm-rio',  'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.farmrio.com.br'],
      ['name' => 'Animale',   'slug' => 'animale',   'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.animale.com.br'],
      ['name' => 'Colcci',    'slug' => 'colcci',    'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.colcci.com.br'],
      ['name' => 'Richards',  'slug' => 'richards',  'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.richards.com.br'],
      ['name' => 'Nike',      'slug' => 'nike',      'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.nike.com.br'],
      ['name' => 'Adidas',    'slug' => 'adidas',    'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.adidas.com.br'],
      ['name' => 'Puma',      'slug' => 'puma',      'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.puma.com/br'],
      ['name' => 'Havaianas', 'slug' => 'havaianas', 'logo' => 'brands/placeholder.png', 'status' => 'active', 'website' => 'https://www.havaianas.com.br'],
    ]);
  }
}
