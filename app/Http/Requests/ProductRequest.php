<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductRequest extends FormRequest
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
      'name' => ['required', 'string', 'max:255'],
      'description' => ['nullable', 'string'],
      'full_description' => ['nullable', 'string'],
      'brand_id' => ['required', 'exists:brands,id'], // exists:tabela,coluna - verifica se o id existe na tabela brands
      'category_id' => ['required', 'exists:categories,id'], // exists:tabela,coluna - verifica se o id existe na tabela categories
      'slug' => ['required', 'string', 'max:255', 'unique:products,slug'], // unique:tabela,coluna
    ];
  }
}
