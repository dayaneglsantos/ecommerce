<?php

namespace App\Http\Controllers;

use App\Http\Requests\ColorRequest;
use App\Models\Color;

class ColorController extends Controller
{
  /**
   * Store a newly created resource in storage.
   */
  public function store(ColorRequest $request)
  {
    try {
      $validatedData = $request->validated();
      Color::create($validatedData);
      return redirect()->back()->with('success', 'Cor criada com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar a cor.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Color $color)
  {
    try {
      $color->delete();
      return redirect()->back()->with('success', 'Cor excluída com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao excluir a cor.');
    }
  }
}
