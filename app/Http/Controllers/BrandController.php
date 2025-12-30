<?php

namespace App\Http\Controllers;

use App\Http\Requests\Brand\CreateBrandRequest;
use App\Http\Requests\Brand\EditBrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $brands = Brand::all();
    return Inertia::render('Brands/index', ['brands' => $brands]);
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
  public function store(CreateBrandRequest $request)
  {
    try {
      $validated = $request->validated();

      if (isset($validated['logo'])) {
        $path = $validated['logo']->store('brand-logos', 'public');
        $validated['logo'] = $path;
      }

      Brand::create($validated);
      return redirect()->back()->with('success', 'Marca criada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao criar marca');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Brand $brand)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Brand $brand)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(EditBrandRequest $request, Brand $brand)
  {
    try {
      $validated = $request->validated();

      if (isset($validated['logo'])) {
        // Deleta o logo antigo se existir
        if ($brand->logo) {
          Storage::disk('public')->delete($brand->logo);
        }
        $path = $validated['logo']->store('brand-logos', 'public');
        $validated['logo'] = $path;
      }

      $brand->update($validated);
      return redirect()->back()->with('success', 'Marca atualizada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao atualizar marca');
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Brand $brand)
  {
    try {
      // Deleta o logo se existir
      if ($brand->logo) {
        Storage::disk('public')->delete($brand->logo);
      }

      $brand->delete();
      return redirect()->back()->with('success', 'Marca deletada com sucesso');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Erro ao deletar marca');
    }
  }
}
