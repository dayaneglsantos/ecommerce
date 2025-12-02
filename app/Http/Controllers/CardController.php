<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;
use App\Services\StripeService;
use Stripe\PaymentMethod;

class CardController extends Controller
{
  public function store(Request $request, StripeService $stripe)
  {

    try {
      // Lógica para armazenar o cartão do usuário usando Stripe
      $request->validate([
        'payment_method' => 'required|string',
      ]);

      $user = $request->user();
      $customer = $stripe->getOrCreateCustomer($user);

      // 1. Recupera o PaymentMethod no Stripe
      $paymentMethod = PaymentMethod::retrieve($request->payment_method);

      // 2. Anexa o cartão ao customer
      $paymentMethod->attach([
        'customer' => $customer->id,
      ]);

      // 3. Extrai os dados necessários do Stripe
      $card = $paymentMethod->card;

      // 4. Caso seja o primeiro cartão, definir como padrão
      $isDefault = $user->cards()->count() === 0;

      // 5. Salvar na tabela "cards"
      $user->cards()->create([
        'token' => $paymentMethod->id,
        'last_four' => $card->last4,
        'brand' => $card->brand,
        'expiration_month' => $card->exp_month,
        'is_default' => $isDefault
      ]);

      return back()->with('success', 'Cartão adicionado com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return back()->withErrors(['error' => 'Erro ao adicionar o cartão: ']);
    }
  }

  public function destroy(Card $card, StripeService $stripe, Request $request)
  {
    try {
      $user = $request->user();

      // Garantir que o cartão pertence ao usuário logado
      if ($card->user_id !== $user->id) {
        abort(403, 'Ação não permitida.');
      }

      // Obter o PaymentMethod no Stripe
      $paymentMethod = PaymentMethod::retrieve($card->token);

      // Remover do Stripe (desvincular do customer)
      $paymentMethod->detach();

      // Deletar do banco
      $card->delete();

      // Se ele era o cartão padrão → defina outro como padrão
      if ($card->is_default) {
        $nextCard = $user->cards()->first();
        if ($nextCard) {
          $nextCard->update(['is_default' => true]);
        }
      }
      return back()->with('success', 'Cartão removido com sucesso!');
    } catch (\Exception $e) {
      return back()->withErrors(['error' => 'Erro ao remover o cartão: ']);
    }
  }
}
