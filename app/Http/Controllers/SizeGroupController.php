<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeGroupRequest;
use App\Models\SizeGroup;

class SizeGroupController extends Controller
{
  /**
   * Store a newly created resource in storage.
   */
  public function store(SizeGroupRequest $request)
  {
    try {
      $validatedData = $request->validated();
      SizeGroup::create($validatedData);
      return redirect()->back()->with('success', 'Grupo de tamanho criado com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar o grupo de tamanho.');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(SizeGroup $sizeGroup)
  {
    try {
      $sizeGroup->delete();
      return redirect()->back()->with('success', 'Grupo de tamanho excluído com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao excluir o grupo de tamanho.');
    }
  }
}
