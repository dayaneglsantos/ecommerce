<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\ProductVariation;
use App\Models\Size;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
  public function run(): void
  {
    $brands = Brand::all()->keyBy('slug');
    $colors = Color::all()->keyBy('name');

    $clothingSizes = Size::whereHas('sizeGroup', fn($q) => $q->where('name', 'Letra de roupa'))->get();
    $shoeSizes     = Size::whereHas('sizeGroup', fn($q) => $q->where('name', 'Numérico calçado'))->get();
    $kidsSizes     = Size::whereHas('sizeGroup', fn($q) => $q->where('name', 'Infantil'))->get();

    $clothingBrands = $brands->only(['hering', 'reserva', 'farm-rio', 'animale', 'colcci', 'richards']);
    $sportsBrands   = $brands->only(['nike', 'adidas', 'puma']);
    $mistoBrands    = $brands->only(['havaianas', 'adidas', 'hering']);

    foreach ($this->catalog() as $categoryName => $data) {
      $category = Category::where('name', $categoryName)->first();

      if (!$category) continue;

      $sizes = match ($data['sizeType']) {
        'calcado'  => $shoeSizes,
        'infantil' => $kidsSizes,
        default    => $clothingSizes,
      };

      $brandPool = match ($data['brandPool']) {
        'esportes' => $sportsBrands,
        'misto'    => $mistoBrands,
        default    => $clothingBrands,
      };

      foreach ($data['products'] as $productData) {
        $productColors = collect($productData['colors'])
          ->map(fn($name) => $colors->get($name))
          ->filter()
          ->values();

        [$minPrice, $maxPrice] = $productData['priceRange'];

        $product = Product::factory()->create([
          'name'                     => $productData['name'],
          'slug'                     => Str::slug($productData['name']),
          'description'              => $productData['description'],
          'full_description'         => $productData['full_description'],
          'technical_specifications' => $productData['specs'],
          'brand_id'                 => $brandPool->random()->id,
          'category_id'              => $category->id,
          'default_color_id'         => $productColors->first()?->id,
        ]);

        foreach ($productColors as $color) {
          // priceRange definido em reais; campo armazenado em centavos
          $price    = fake()->numberBetween($minPrice * 100, $maxPrice * 100);
          $oldPrice = fake()->boolean(60)
            ? (int) ($price * fake()->randomFloat(2, 1.1, 1.4))
            : null;

          ProductVariation::factory()->create([
            'product_id'         => $product->id,
            'color_id'           => $color->id,
            'size_id'            => $sizes->random()->id,
            'price'              => $price,
            'old_price'          => $oldPrice,
            'pix_discount_type'  => 'percentage',
            'pix_discount_value' => fake()->randomElement([0, 5, 10]),
            'sku'                => strtoupper(Str::random(3)) . '-' . fake()->unique()->numberBetween(1000, 9999),
          ]);

          ProductImages::factory()->create([
            'product_id' => $product->id,
            'color_id'   => $color->id,
          ]);
        }
      }
    }
  }

  private function catalog(): array
  {
    return [
      'Camisetas' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Camiseta Básica Algodão Pima',
            'description'      => 'Camiseta com corte regular em algodão Pima de alta qualidade, toque macio e durabilidade superior.',
            'full_description' => 'Desenvolvida com 100% algodão Pima peruano, reconhecido mundialmente pela sua maciez, brilho natural e resistência das fibras. Ideal para o uso diário, apresenta corte regular que agrada diferentes biotipos, costuras reforçadas e gola canelada para manter o formato após lavagens repetidas.',
            'specs'            => ['Composição' => '100% Algodão Pima', 'Modelagem' => 'Regular Fit', 'Caimento' => 'Clássico', 'Lavagem' => 'Máquina fria até 30°C', 'Origem' => 'Brasil'],
            'colors'           => ['Preto', 'Branco', 'Cinza', 'Azul Marinho'],
            'priceRange'       => [59, 89],
          ],
          [
            'name'             => 'Camiseta Oversized Streetwear',
            'description'      => 'Camiseta com caimento oversized inspirada na cultura urbana, perfeita para looks casuais e modernos.',
            'full_description' => 'Com modelagem ampla inspirada no streetwear contemporâneo, esta camiseta combina conforto e estilo. Feita em meia malha premium, traz estampa de coleção exclusiva e caimento diferenciado com bainha mais longa na parte traseira. Combina com calças slim, cargo ou bermudas para composições despojadas e modernas.',
            'specs'            => ['Composição' => '100% Algodão 30.1', 'Modelagem' => 'Oversized', 'Estampa' => 'Estampada', 'Lavagem' => 'Máquina fria', 'Gramatura' => '180g/m²'],
            'colors'           => ['Preto', 'Bege', 'Verde Oliva'],
            'priceRange'       => [79, 129],
          ],
          [
            'name'             => 'Polo Slim Fit Premium',
            'description'      => 'Polo masculina de malha piquet com acabamento refinado, ideal para ocasiões casuais e semi-formais.',
            'full_description' => 'Polo clássica em malha piquet de alta qualidade, com modelagem slim que valoriza a silhueta masculina. Apresenta gola e punhos em costela, botões de madrepérola e detalhe bordado na altura do peito. Versátil o suficiente para combinar com jeans ou calça social.',
            'specs'            => ['Composição' => '100% Algodão Piquet', 'Modelagem' => 'Slim Fit', 'Fechamento' => '3 botões', 'Lavagem' => 'Máquina fria', 'Origem' => 'Brasil'],
            'colors'           => ['Azul Marinho', 'Verde', 'Vinho'],
            'priceRange'       => [99, 159],
          ],
        ],
      ],

      'Calças e Bermudas' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Calça Jeans Slim Lavagem Escura',
            'description'      => 'Calça jeans masculina com modelagem slim, lavagem escura e tecido com elastano para maior mobilidade.',
            'full_description' => 'Desenvolvida em denim de alta qualidade com toque de elastano para garantir flexibilidade e conforto durante todo o dia. A lavagem escura proporciona versatilidade, combinando tanto com camisetas casuais quanto com camisas sociais. Modelagem slim que valoriza a silhueta sem comprometer o conforto.',
            'specs'            => ['Composição' => '98% Algodão, 2% Elastano', 'Modelagem' => 'Slim', 'Lavagem' => 'Escura', 'Fechamento' => 'Zíper e botão', 'Bolsos' => '5 bolsos'],
            'colors'           => ['Azul', 'Preto'],
            'priceRange'       => [149, 249],
          ],
          [
            'name'             => 'Bermuda Cargo Masculina Utilitária',
            'description'      => 'Bermuda cargo com múltiplos bolsos funcionais, tecido resistente e corte moderno para o dia a dia ativo.',
            'full_description' => 'Bermuda cargo com design utilitário e contemporâneo, fabricada em sarja de algodão de alta durabilidade. Conta com seis bolsos, incluindo dois laterais com aba e velcro. Ideal para atividades ao ar livre, viagens ou uso urbano. O corte reto oferece liberdade de movimento e estilo.',
            'specs'            => ['Composição' => '100% Algodão Sarja', 'Modelagem' => 'Regular', 'Bolsos' => '6 bolsos', 'Fechamento' => 'Zíper e botão', 'Comprimento' => 'Joelho'],
            'colors'           => ['Verde Oliva', 'Bege', 'Preto'],
            'priceRange'       => [119, 189],
          ],
        ],
      ],

      'Moletom e Agasalho' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Moletom Canguru French Terry',
            'description'      => 'Moletom canguru em French Terry, combinando conforto máximo com visual moderno e despojado.',
            'full_description' => 'Fabricado em French Terry, tecido leve que mantém o calor sem pesar, com interior felpudo para maior conforto. O capuz amplo e o bolso canguru são detalhes clássicos que nunca saem de moda. Costuras em destaque no exterior adicionam um toque contemporâneo ao visual. Perfeito para usar em casa, na academia ou nas ruas.',
            'specs'            => ['Composição' => '80% Algodão, 20% Poliéster', 'Tecido' => 'French Terry', 'Modelagem' => 'Unissex', 'Lavagem' => 'Máquina fria', 'Gramatura' => '320g/m²'],
            'colors'           => ['Cinza', 'Preto', 'Azul Marinho'],
            'priceRange'       => [129, 219],
          ],
        ],
      ],

      'Vestidos e Saias' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Vestido Midi Floral Linho',
            'description'      => 'Vestido midi em viscose com estampa floral exclusiva, fluido e elegante para o verão.',
            'full_description' => 'Vestido de comprimento midi em viscose com toque de linho, desenvolvido com estampa floral exclusiva da coleção verão. O tecido leve e fluido proporciona conforto em dias quentes, enquanto o decote em V e as alças reguláveis adicionam feminilidade ao look. Combina com rasteiras ou sandálias de salto para diferentes ocasiões.',
            'specs'            => ['Composição' => '70% Viscose, 30% Linho', 'Comprimento' => 'Midi', 'Decote' => 'V', 'Lavagem' => 'Lavar à mão', 'Estampa' => 'Floral exclusivo'],
            'colors'           => ['Rosa', 'Amarelo', 'Verde'],
            'priceRange'       => [159, 289],
          ],
          [
            'name'             => 'Vestido Tubinho Elegante',
            'description'      => 'Vestido tubinho clássico em crepe de malha, com modelagem estruturada para um visual sofisticado e atemporal.',
            'full_description' => 'Clássico do guarda-roupa feminino, este vestido tubinho é confeccionado em crepe de malha de alta qualidade que garante caimento impecável e durabilidade. A modelagem body con valoriza as curvas com elegância, sendo ideal para reuniões corporativas, jantares e eventos sociais. O zíper invisível nas costas facilita o vestir sem comprometer o visual.',
            'specs'            => ['Composição' => '95% Poliéster, 5% Elastano', 'Modelagem' => 'Body Con', 'Comprimento' => 'Joelho', 'Fechamento' => 'Zíper invisível', 'Ocasião' => 'Social'],
            'colors'           => ['Preto', 'Vinho'],
            'priceRange'       => [199, 349],
          ],
        ],
      ],

      'Blusas e Camisetas' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Blusa Cropped Ribana Canelada',
            'description'      => 'Blusa cropped em malha ribana canelada, com bojo removível e modelagem moderna para looks casuais.',
            'full_description' => 'Desenvolvida em malha ribana canelada de alta qualidade, esta blusa cropped traz bojo removível para maior versatilidade. O tecido elástico se adapta ao corpo, proporcionando conforto e mobilidade. Ideal para combinar com calças de cintura alta, saias ou shorts.',
            'specs'            => ['Composição' => '92% Poliamida, 8% Elastano', 'Modelagem' => 'Cropped', 'Bojo' => 'Removível', 'Lavagem' => 'Máquina delicada', 'Comprimento' => 'Curto'],
            'colors'           => ['Branco', 'Preto', 'Rosa Claro'],
            'priceRange'       => [69, 119],
          ],
          [
            'name'             => 'Camisa Boyfriend Linho',
            'description'      => 'Camisa boyfriend em blend de linho, com caimento levemente largo e textura natural para looks descontraídos.',
            'full_description' => 'Camisa inspirada na modelagem boyfriend, desenvolvida em blend de linho para máximo conforto em dias quentes. A textura natural do linho confere personalidade única à peça, enquanto o caimento relaxado oferece liberdade de movimento. Pode ser usada aberta sobre regatas, amarrada na frente ou por dentro da calça.',
            'specs'            => ['Composição' => '55% Linho, 45% Algodão', 'Modelagem' => 'Boyfriend', 'Manga' => 'Longa', 'Lavagem' => 'Máquina fria', 'Acabamento' => 'Botões de nácar'],
            'colors'           => ['Areia', 'Branco'],
            'priceRange'       => [119, 199],
          ],
        ],
      ],

      'Calças e Shorts' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'roupa',
        'products'  => [
          [
            'name'             => 'Calça Wide Leg Alfaiataria',
            'description'      => 'Calça pantalona de alfaiataria com modelagem wide leg, elegante e confortável para diferentes ocasiões.',
            'full_description' => 'Peça versátil em tecido de alfaiataria de alta qualidade. A perna larga e fluida traz modernidade ao look e pode ser combinada com tops estruturados, camisas ou camisetas para composições tanto formais quanto casuais. O cós franzido e a cintura alta valorizam a silhueta com elegância.',
            'specs'            => ['Composição' => '65% Poliéster, 35% Viscose', 'Modelagem' => 'Wide Leg', 'Cós' => 'Alto com franzido', 'Fechamento' => 'Zíper lateral', 'Ocasião' => 'Social/Casual'],
            'colors'           => ['Preto', 'Bege'],
            'priceRange'       => [169, 279],
          ],
          [
            'name'             => 'Shorts Jeans Hot Pants',
            'description'      => 'Shorts jeans feminino com cintura alta, barra dobrada e lavagem clara para um visual despojado e moderno.',
            'full_description' => 'Shorts jeans com corte hot pants e cintura alta, combinando o clássico do jeans com uma modelagem moderna e jovem. A barra dobrada e desfiada adiciona um toque descontraído ao visual, enquanto a lavagem clara ilumina o look. Perfeito para o verão, combina com blusas cropped ou camisetas nó.',
            'specs'            => ['Composição' => '99% Algodão, 1% Elastano', 'Modelagem' => 'Hot Pants', 'Lavagem' => 'Clara', 'Fechamento' => 'Zíper e botão', 'Comprimento' => 'Curto'],
            'colors'           => ['Azul', 'Branco'],
            'priceRange'       => [89, 159],
          ],
        ],
      ],

      'Tênis' => [
        'brandPool' => 'esportes',
        'sizeType'  => 'calcado',
        'products'  => [
          [
            'name'             => 'Tênis Running Ultra Leve',
            'description'      => 'Tênis desenvolvido para corridas de longa distância, com tecnologia de amortecimento que reduz o impacto a cada passada.',
            'full_description' => 'Projetado em parceria com atletas profissionais, conta com cabedal em mesh respirável que mantém os pés frescos mesmo nos treinos mais intensos. A entressola em espuma de alta densidade proporciona amortecimento superior, enquanto o solado de borracha carbono garante durabilidade e tração em diferentes superfícies.',
            'specs'            => ['Material do Upper' => 'Mesh respirável', 'Entressola' => 'Espuma EVA HD', 'Solado' => 'Borracha carbono', 'Fechamento' => 'Cadarço', 'Drop' => '10mm', 'Indicação' => 'Corrida de rua'],
            'colors'           => ['Preto', 'Branco', 'Azul'],
            'priceRange'       => [299, 499],
          ],
          [
            'name'             => 'Tênis Casual Retrô',
            'description'      => 'Tênis de estilo retrô com design clássico atualizado, perfeito para o uso diário com look casual.',
            'full_description' => 'Inspirado nos clássicos tênis esportivos dos anos 80, este modelo reinterpreta o estilo vintage com materiais modernos. O cabedal em couro sintético garante durabilidade e facilidade de limpeza, enquanto o solado com nervuras proporciona estabilidade. Versátil, combina com jeans, bermudas e até peças mais sofisticadas.',
            'specs'            => ['Material do Upper' => 'Couro sintético', 'Forro' => 'Têxtil', 'Solado' => 'Borracha vulcanizada', 'Fechamento' => 'Cadarço', 'Estilo' => 'Lifestyle/Casual'],
            'colors'           => ['Branco', 'Bege'],
            'priceRange'       => [249, 399],
          ],
          [
            'name'             => 'Tênis Skate Canvas',
            'description'      => 'Tênis de skate em lona resistente com biqueira reforçada e solado de borracha vulcanizada.',
            'full_description' => 'Desenvolvido para o skatista urbano e para quem busca um estilo descomplicado, este tênis em lona premium conta com biqueira e calcanhar reforçados para maior proteção. O solado de borracha vulcanizada oferece boa aderência ao shape e às superfícies do dia a dia. Design low-top clássico que nunca sai de moda.',
            'specs'            => ['Material do Upper' => 'Lona de algodão', 'Reforço' => 'Biqueira e calcanhar', 'Solado' => 'Borracha vulcanizada', 'Cano' => 'Baixo (Low-top)', 'Estilo' => 'Skate/Casual'],
            'colors'           => ['Preto', 'Cinza'],
            'priceRange'       => [179, 299],
          ],
        ],
      ],

      'Sandálias e Chinelos' => [
        'brandPool' => 'misto',
        'sizeType'  => 'calcado',
        'products'  => [
          [
            'name'             => 'Sandália Plataforma Flatform',
            'description'      => 'Sandália flatform com solado de borracha plataforma, tiras ajustáveis e palmilha anatômica.',
            'full_description' => 'Sandália com plataforma de borracha que adiciona altura com máximo conforto, pois o pé permanece paralelo ao chão. As tiras reguláveis em couro sintético garantem ajuste perfeito, enquanto a palmilha anatômica distribui o peso uniformemente para uso prolongado. Um modelo versátil que vai do look praia ao urbano com elegância.',
            'specs'            => ['Material das Tiras' => 'Couro sintético', 'Plataforma' => '4cm borracha', 'Palmilha' => 'Anatômica EVA', 'Fechamento' => 'Fivela', 'Indicação' => 'Casual/Praia'],
            'colors'           => ['Bege', 'Preto'],
            'priceRange'       => [129, 229],
          ],
          [
            'name'             => 'Chinelo Slide Comfort',
            'description'      => 'Chinelo slide com palmilha em espuma memory foam e tira em borracha de alta qualidade para o conforto diário.',
            'full_description' => 'A palmilha em memory foam se molda ao formato do pé a cada uso, proporcionando suporte personalizado. A tira larga em borracha texturizada oferece estabilidade e estilo simultaneamente. Perfeito para uso doméstico, praia, piscina ou como complemento a looks casuais de verão.',
            'specs'            => ['Material da Palmilha' => 'Memory Foam', 'Material da Tira' => 'Borracha EVA', 'Solado' => 'Borracha antiderrapante', 'Estilo' => 'Slide', 'Indicação' => 'Casual/Praia'],
            'colors'           => ['Preto', 'Azul Marinho', 'Vinho'],
            'priceRange'       => [59, 119],
          ],
        ],
      ],

      'Roupas Infantis' => [
        'brandPool' => 'roupas',
        'sizeType'  => 'infantil',
        'products'  => [
          [
            'name'             => 'Conjunto Infantil Camiseta e Shorts Estampado',
            'description'      => 'Conjunto infantil com camiseta manga curta e shorts estampado, em malha suave ideal para crianças ativas.',
            'full_description' => 'Conjunto desenvolvido especialmente para crianças em fase de descoberta do mundo. A camiseta de manga curta e o shorts são confeccionados em malha 100% algodão, macia e hipoalergênica, adequada para a pele sensível dos pequenos. As estampas divertidas tornam o conjunto um favorito das crianças, enquanto o elástico regulável no shorts garante segurança e praticidade.',
            'specs'            => ['Composição' => '100% Algodão', 'Peças' => '2 (camiseta + shorts)', 'Elástico' => 'Regulável', 'Lavagem' => 'Máquina fria', 'Certificação' => 'OEKO-TEX® Standard 100'],
            'colors'           => ['Azul Claro', 'Verde', 'Rosa'],
            'priceRange'       => [69, 119],
          ],
          [
            'name'             => 'Vestido Infantil Floral com Babado',
            'description'      => 'Vestido infantil com estampa floral delicada, acabamento em babado e detalhe em laço na cintura.',
            'full_description' => 'Vestido encantador para as pequenas, com estampa floral exclusiva e acabamentos delicados em babado na barra. O laço na cintura pode ser amarrado na frente ou nas costas para variar o visual. Confeccionado em malha suave e respirável, garante conforto durante todo o dia sem irritar a pele sensível das crianças.',
            'specs'            => ['Composição' => '95% Algodão, 5% Elastano', 'Detalhes' => 'Babado e laço', 'Comprimento' => 'Abaixo do joelho', 'Lavagem' => 'Máquina delicada', 'Estampa' => 'Floral'],
            'colors'           => ['Rosa Claro', 'Amarelo'],
            'priceRange'       => [59, 99],
          ],
        ],
      ],
    ];
  }
}
