<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressUpdateRequest;
use App\Models\Address;
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

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
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
  public function update(AddressUpdateRequest $request, Address $address)
  {
    try {
      $user = $request->user();
      $validatedData = $request->validated();

      $user->addresses()->updateOrCreate(
        ['id' => $request->id], // condição para encontrar o endereço
        $validatedData
      );

      return redirect()->back()->with('success', 'Endereço salvo com sucesso!');
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
  public function destroyAddress(Request $request, Address $address)
  {
    try {
      $address->delete();
      return redirect()->back()->with('success', 'Endereço deletado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao deletar o endereço!');
    }
  }
}
