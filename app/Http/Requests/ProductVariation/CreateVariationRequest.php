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
      'color' => ['required', 'string', 'max:255'],
      'color_code' => ['required', 'string', 'max:7'],
      'size' => ['required', 'string', 'max:10'],
      'price' => ['required', 'numeric', 'min:0'],
      'old_price' => ['nullable', 'numeric', 'min:0'],
      'stock_quantity' => ['required', 'integer', 'min:0'],
      'pix_discount_percent' => ['nullable', 'numeric', 'min:0'],
      'sku' => ['required', 'string', 'max:255', 'unique:product_variations,sku'],
      'technical_specifications' => ['nullable', 'array'],
      'supplier_id' => ['required', 'exists:suppliers,id'],
      'is_default' => ['nullable', 'boolean'],
      'images' => ['nullable', 'array'],
      'images.*.file' => ['required', 'image', 'max:5120'], // cada imagem deve ser um arquivo de imagem com tamanho máximo de 5MB
      'images.*.position' => ['required', 'integer', 'min:1'], // posição da imagem na ordem
    ];
  }
}
