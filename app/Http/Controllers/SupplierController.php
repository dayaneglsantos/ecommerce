<?php

namespace App\Http\Controllers;

use App\Http\Requests\Supplier\CreateSupplierRequest;
use App\Http\Requests\Supplier\EditSupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    Inertia::share('suppliers', SupplierResource::collection(Supplier::all()->load('address')));
    return Inertia::render('Suppliers/index');
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
  public function store(CreateSupplierRequest $request)
  {
    try {
      Supplier::create($request->validated());
      return redirect()->back()->with('success', 'Fornecedor criado com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->withErrors(['error' => 'Erro ao criar fornecedor']);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Supplier $supplier)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Supplier $supplier)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(EditSupplierRequest $request, Supplier $supplier)
  {
    try {
      $validatedData = $request->validated();
      $supplier->update($validatedData);
      return redirect()->back()->with('success', 'Fornecedor editado com sucesso');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->withErrors(['error' => 'Erro ao editar fornecedor']);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Supplier $supplier)
  {
    try {
      $supplier->delete();
      return redirect()->back()->with('success', 'Fornecedor excluído com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->withErrors(['error' => 'Erro ao excluir fornecedor']);
    }
  }
}
