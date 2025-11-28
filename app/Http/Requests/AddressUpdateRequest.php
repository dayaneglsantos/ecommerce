<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressUpdateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'zip_code' => ['required', 'string', 'max:8'],
      'state' => ['required', 'string', 'max:255'],
      'city' => ['required', 'string', 'max:255'],
      'street' => ['required', 'string', 'max:255'],
      'number' => ['required', 'numeric', 'max:50'],
      'complement' => ['nullable', 'string', 'max:255'],
    ];
  }
}
