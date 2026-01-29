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
}
