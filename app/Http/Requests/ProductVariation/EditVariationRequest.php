<?php

namespace App\Http\Requests\ProductVariation;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EditVariationRequest extends FormRequest
{
  // Determina quem pode fazer esta requisição
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
      'color' => ['required', 'string', 'max:255'],
      'color_code' => ['required', 'string', 'max:7'],
      'size' => ['required', 'string', 'max:10'],
      'price' => ['required', 'numeric', 'min:0'],
      'old_price' => ['nullable', 'numeric', 'min:0'],
      'stock_quantity' => ['required', 'integer', 'min:0'],
      'pix_discount_type' => ['nullable', 'string', 'in:percentage,fixed'],
      'pix_discount_value' => ['nullable', 'numeric', 'min:0'],
      'sku' => ['required', 'string', 'max:255', Rule::unique('product_variations', 'sku')->ignore($this->productVariation)],
      'technical_specifications' => ['nullable', 'array'],
      'supplier_id' => ['required', 'exists:suppliers,id'],
      'images' => ['required', 'array'],
      'images.*.file' => ['nullable', 'image', 'max:5120'], // cada imagem deve ser um arquivo de imagem com tamanho máximo de 5MB
      'images.*.position' => ['required', 'integer', 'min:1'], // posição da imagem na ordem
      'images.*.id' => ['nullable', 'integer', 'exists:product-images,id'], // id da imagem existente
      'images_to_delete' => ['nullable', 'array'],
      'images_to_delete.*' => ['integer', 'exists:product-images,id'],
    ];
  }

  protected function failedValidation(Validator $validator)
  {
    // Adicione aqui qualquer lógica personalizada que você queira executar em caso de falha na validação
    dd($validator->errors()->toArray());
  }

  protected function prepareForValidation()
  {
    $this->merge([
      'price' => $this->price
        ? (int) round(str_replace(',', '.', $this->price) * 100)
        : null,

      'old_price' => $this->old_price
        ? (int) round(str_replace(',', '.', $this->old_price) * 100)
        : null,

      'pix_discount_value' => $this->pix_discount_type === 'fixed' && $this->pix_discount_value
        ? (int) round(str_replace(',', '.', $this->pix_discount_value) * 100)
        : $this->pix_discount_value,
    ]);
  }
}
