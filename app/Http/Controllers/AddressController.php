<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use LaravelLang\Publisher\Console\Add;

class AddressController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  // Criação de endereço para user (Usuário)
  public function userStore(AddressRequest $request, User $user)
  {
    try {
      $validated = $request->validated();
      $user->addresses()->create($validated);

      return redirect()->back()->with('success', 'Endereço salvo com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao salvar o endereço!');
    }
  }

  // Criação de endereço para supplier (Fornecedor)
  public function supplierStore(AddressRequest $request, Supplier $supplier)
  {
    try {
      $validated = $request->validated();
      $supplier->addresses()->create($validated);

      return redirect()->back()->with('success', 'Endereço salvo com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao salvar o endereço!');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Address $address)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Address $address)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(AddressRequest $request, Address $address)
  {
    try {
      $user = $request->user();
      $isOwner = $address->addressable_id === $user->id;
      $isAdmin = $user->profile === 'admin';

      if (!$isOwner && !$isAdmin) {
        return redirect()->back()->with('error', 'Você não tem permissão para editar este endereço!');
      } else {
        $validated = $request->validated();
        $address->update($validated);
        return redirect()->back()->with('success', 'Endereço salvo com sucesso!');
      }
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao salvar o endereço!');
    }
  }

  /**
   * Set the specified address as default.
   */
  public function default(Request $request, Address $address)
  {
    try {
      $user = $request->user();
      // Remover o antigo endereço padrão
      $user->addresses()->update(['default' => false]);

      // Definir o novo endereço padrão
      $address->default = true;
      $address->save();


      return Redirect::back()->with('success', 'Endereço definido como padrão!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return Redirect::back()->with('error', 'Erro ao definir o endereço como padrão!');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, Address $address)
  {
    try {
      $user = $request->user();
      $isOwner = $address->addressable_id === $user->id;
      $isAdmin = $user->profile === 'admin';

      if (!$isOwner && !$isAdmin) {
        return redirect()->back()->with('error', 'Você não tem permissão para deletar este endereço!');
      } else {
        $address->delete();
        return redirect()->back()->with('success', 'Endereço deletado com sucesso!');
      }
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao deletar o endereço!');
    }
  }
}
