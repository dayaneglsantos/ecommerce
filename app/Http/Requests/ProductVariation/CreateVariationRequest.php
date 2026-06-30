<?php

namespace App\Http\Requests\ProductVariation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateVariationRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    // Auth::check - verifica se o usuário está autenticado
    // Auth::user() - pega o usuário autenticado
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
      'product_id' => ['required', 'exists:products,id'],
      'color' => ['required', 'exists:colors,id'],
      'size' => ['required', 'exists:sizes,id'],
      'price' => ['required', 'numeric', 'min:0'],
      'old_price' => ['nullable', 'numeric', 'min:0'],
      'pix_discount_type' => ['nullable', 'string', 'in:percentage,fixed'],
      'pix_discount_value' => ['nullable', 'numeric', 'min:0'],
      'sku' => ['required', 'string', 'max:255', 'unique:product_variations,sku'],

    ];
  }

  // Preparação dos dados antes da validação
  protected function prepareForValidation()
  {
    $this->merge([
      'price' => $this->price
        ? (int) round(str_replace(',', '.', $this->price) * 100)
        : null,

      'pix_discount_value' => $this->pix_discount_type === 'fixed' && $this->pix_discount_value
        ? (int) round(str_replace(',', '.', $this->pix_discount_value) * 100)
        : $this->pix_discount_value,
    ]);
  }
}
