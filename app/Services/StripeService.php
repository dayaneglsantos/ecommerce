<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Customer;

class StripeService
{
  public function __construct()
  {
    Stripe::setApiKey(config('services.stripe.secret')); // Definir a chave secreta da API do Stripe
  }

  public function getOrCreateCustomer($user)
  {
    if ($user->stripe_id) {
      return Customer::retrieve($user->stripe_id); // Recupera o cliente existente
    }

    // Se não existir, cria
    $customer = Customer::create([
      'email' => $user->email,
      'name' => $user->name,
    ]);

    $user->update([
      'stripe_id' => $customer->id
    ]);

    return $customer;
  }
}
