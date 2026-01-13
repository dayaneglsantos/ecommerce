<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttributeValueRequest;
use App\Models\AttributeValue;
use Illuminate\Http\Request;

class AttributeValueController extends Controller
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
  public function store(AttributeValueRequest $request)
  {
    try {
      $validatedData = $request->validated();
      AttributeValue::create($validatedData);
      return redirect()->back()->with('success', 'Criado com sucesso!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro na criação');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(AttributeValue $attributeValue)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(AttributeValue $attributeValue)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, AttributeValue $attributeValue)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(AttributeValue $attributeValue)
  {
    try {
      $attributeValue->delete();
      return redirect()->back()->with('success', 'Exclusão realizada com sucesso!');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro na exclusão');
    }
  }
}
