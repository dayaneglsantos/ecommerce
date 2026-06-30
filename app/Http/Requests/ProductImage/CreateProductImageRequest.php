<?php

namespace App\Http\Requests\ProductImage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateProductImageRequest extends FormRequest
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
      'images.*.file' => ['required', 'image', 'max:5120'], // cada imagem deve ser um arquivo de imagem com tamanho máximo de 5MB
      'images.*.position' => ['required', 'integer', 'min:1'], // posição da imagem na ordem
    ];
  }
}
