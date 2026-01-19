<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use function PHPSTORM_META\type;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    $variations = $this->whenLoaded('variations'); // Carrega as variações do produto passadas pelo controller
    $images = $this->whenLoaded('images'); // Carrega as imagens do produto passadas pelo controller

    // ======= Agrupamento das variações por cor =======
    $groupedVariations = $variations->groupBy(function ($variation) {

      $colorAttribute = $variation->attributes->first(function ($attrValue) {
        return strtolower($attrValue?->attribute?->name) === 'cor';
      }); // Obtém o valor do atributo de cor


      return $colorAttribute?->id;
    }) // Agrupa as variações pelo ID do atributo de cor
      ->map(function ($item) use ($images) { // O item aqui é uma coleção de variações que possuem a mesma cor

        $firstItem = $item->first(); // Pega a primeira variação para obter os dados da cor (que são os mesmos para todas as variações do grupo, por isso pegamos apenas a primeira)

        $colorData = $firstItem->attributes->first(function ($attrValue) {
          return strtolower($attrValue?->attribute?->name) === 'cor';
        }); // Obtém o valor do atributo de cor (nome e id)
        // dd($colorData);

        return [
          'color' => [
            'id' => $colorData?->id,
            'value' => $colorData?->value,
          ],
          'sizes' => $item->map(function ($variation) {
            $sizeData = $variation->attributes->first(function ($attrValue) {
              return strtolower($attrValue?->attribute?->name) === 'tamanho';
            }); // pega o valor do atributo de tamanho
            return [
              'id' => $variation->id,
              'size' => $sizeData?->value,
              'price' => $variation->price_formatted,
              'oldPrice' => $variation->old_price_formatted,
              'stockQuantity' => $variation->stock_quantity,
              'sku' => $variation->sku,
              'pixDiscount' => [
                'type' => $variation->pix_discount_type,
                'value' => $variation->pix_discount_value_formatted,
              ]
            ];
          }),
          'images' => $images?->filter(function ($img) use ($colorData) {
            return $colorData?->id === $img->attribute_id; // Filtra as imagens que possuem o atributo_id igual ao id do valor do atributo de cor
          })->values(),
        ];
      })->values();

    // OBS: Values faz com que o índice do array volte a ser numérico sequencial pois o groupBy e map podem gerar índices não sequenciais.
    // Sem o values() o retorno seria algo como:
    // [
    //    3 => [ ... ],  // índice 3
    //    7 => [ ... ],  // índice 7
    // ]
    // Com o values() o retorno será:
    // [
    //    0 => [ ... ],  // índice 0
    //    1 => [ ... ],  // índice 1
    // ]
    // ================================================

    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      'fullDescription' => $this->full_description,
      'slug' => $this->slug,
      // 'defaultVariation' => new ProductVariationResource($this->whenLoaded('defaultVariation')),
      'brand' => new BrandResource($this->whenLoaded('brand')),
      'category' => new CategoryResource($this->whenLoaded('category')),
      'variations' => $groupedVariations,
      'technicalSpecifications' => $this->technical_specifications,
      'reviews' => $this->whenLoaded('reviews'), // Não foi criado Resource para Review
    ];
  }
}
