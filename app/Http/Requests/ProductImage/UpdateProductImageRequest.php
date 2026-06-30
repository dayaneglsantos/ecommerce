<?php

namespace App\Http\Requests\ProductImage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProductImageRequest extends FormRequest
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
      'color_id' => ['required', 'exists:colors,id'],
      'images' => ['required', 'array'],
      'images.*.file' => ['nullable', 'image', 'max:5120'], // cada imagem deve ser um arquivo de imagem com tamanho máximo de 5MB
      'images.*.position' => ['required', 'integer', 'min:1'], // posição da imagem na ordem
      'images.*.id' => ['nullable', 'integer', 'exists:product_images,id'], // id da imagem existente
      'images_to_delete' => ['nullable', 'array'],
      'images_to_delete.*' => ['integer', 'exists:product_images,id'],
    ];
  }
}
