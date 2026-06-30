<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SizeGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
  public function run(): void
  {
    $grupoRoupa    = SizeGroup::where('name', 'Letra de roupa')->first();
    $grupoCalcado  = SizeGroup::where('name', 'Numérico calçado')->first();
    $grupoInfantil = SizeGroup::where('name', 'Infantil')->first();

    // Estrutura: categoria pai => [subcategoria => size_group_id]
    $tree = [
      'Masculino' => [
        'Camisetas'          => $grupoRoupa->id,
        'Calças e Bermudas'  => $grupoRoupa->id,
        'Moletom e Agasalho' => $grupoRoupa->id,
        'Jaquetas e Casacos' => $grupoRoupa->id,
      ],
      'Feminino' => [
        'Vestidos e Saias'   => $grupoRoupa->id,
        'Blusas e Camisetas' => $grupoRoupa->id,
        'Calças e Shorts'    => $grupoRoupa->id,
        'Lingerie e Pijamas' => $grupoRoupa->id,
      ],
      'Calçados' => [
        'Tênis'                => $grupoCalcado->id,
        'Sandálias e Chinelos' => $grupoCalcado->id,
        'Botas e Sapatos'      => $grupoCalcado->id,
      ],
      'Infantil' => [
        'Roupas Infantis'   => $grupoInfantil->id,
        'Calçados Infantis' => $grupoInfantil->id,
      ],
      'Acessórios' => [
        'Bolsas e Mochilas'  => null,
        'Bonés e Chapéus'    => null,
        'Cintos e Carteiras' => null,
      ],
    ];

    foreach ($tree as $parentName => $children) {
      $parent = Category::create([
        'name'        => $parentName,
        'slug'        => Str::slug($parentName),
        'description' => "Categoria $parentName",
        'active'      => true,
        'parent_id'   => null,
      ]);

      foreach ($children as $childName => $sizeGroupId) {
        Category::create([
          'name'          => $childName,
          'slug'          => Str::slug($childName),
          'description'   => "Subcategoria de $parentName",
          'active'        => true,
          'parent_id'     => $parent->id,
          'size_group_id' => $sizeGroupId,
        ]);
      }
    }
  }
}
