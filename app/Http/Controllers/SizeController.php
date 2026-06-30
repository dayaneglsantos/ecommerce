<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeRequest;
use App\Models\Size;

class SizeController extends Controller
{
  /**
   * Store a newly created resource in storage.
   */
  public function store(SizeRequest $request)
  {
    try {
      $validatedData = $request->validated();
      Size::create($validatedData);
      return redirect()->back()->with('success', 'Tamanho criado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar o tamanho.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Size $size)
  {
    try {
      $size->delete();
      return redirect()->back()->with('success', 'Tamanho excluído com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao excluir o tamanho.');
    }
  }
}
