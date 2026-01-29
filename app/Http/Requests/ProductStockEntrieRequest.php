<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductStockEntrieRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Auth::check() && Auth::user()->profile === 'admin';
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'items' => ['required', 'array'],
      'items.*.supplier_id' => ['required', 'integer', 'exists:suppliers,id'],
      'items.*.unit_cost' => ['required', 'numeric', 'min:0'],
      'items.*.quantity' => ['required', 'integer', 'min:1'],
      'items.*.product_variation_id' => ['nullable', 'integer', 'exists:product_variations,id'],
    ];
  }

  protected function prepareForValidation()
  {
    if ($this->has('items') && is_array($this->items)) { // Verifica se 'items' existe e é um array
      $formattedItems = array_map(function ($item) {
        if (isset($item['unit_cost'])) { // Verifica se 'unit_cost' está definido
          $item['unit_cost'] = (int) round(str_replace(',', '.', $item['unit_cost']) * 100); // Converte para centavos
        }
        return $item;
      }, $this->items);

      // Atualiza a entrada 'items' com os valores formatados
      $this->merge([
        'items' => $formattedItems,
      ]);
    }
  }
}
