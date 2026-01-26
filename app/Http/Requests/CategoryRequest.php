<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CategoryRequest extends FormRequest
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
      'name' => 'required|string|max:255',
      'parent_id' => 'nullable|exists:categories,id',
      'slug' => 'required|string|max:255|unique:categories,slug,' . $this->route('category')?->id, // Ignora o slug da categoria atual ao atualizar
      'description' => 'required|string',
      'active' => 'required|boolean',
    ];
  }
}
