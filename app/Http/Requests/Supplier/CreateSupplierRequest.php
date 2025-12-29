<?php

namespace App\Http\Requests\Supplier;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateSupplierRequest extends FormRequest
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
      'name' => ['required', 'string', 'max:255'],
      'cnpj' => ['required', 'string', 'max:20', 'unique:suppliers,cnpj'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:suppliers,email'],
      'phone_number' => ['required', 'string', 'max:11'],
      'contact_name' => ['required', 'string', 'max:255'],
    ];
  }
}
