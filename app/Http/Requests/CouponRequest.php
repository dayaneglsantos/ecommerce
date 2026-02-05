<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return false;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'type' => ['required', 'in:percentage,fixed'],
      'code' => ['required', 'string', 'max:50', 'unique:coupons,code'],
      'discount_type' => ['required', 'in:percentage,fixed'],
      'discount_value' => ['required', 'numeric', 'min:0'],
      'startDate' => ['required', 'date'],
      'endDate' => ['required', 'date', 'after_or_equal:startDate'],
      'available_quantity' => ['required', 'integer', 'min:0'],
      'available_per_user' => ['required', 'integer', 'min:0'],
      'minimum_order_value' => ['nullable', 'numeric', 'min:0'],
    ];
  }

  protected function prepareForValidation()
  {
    $this->merge([
      'discount_value' => $this->discount_type === 'fixed' && $this->discount_value
        ? (int) round(str_replace(',', '.', $this->discount_value) * 100)
        : $this->discount_value,
    ]);
  }
}
