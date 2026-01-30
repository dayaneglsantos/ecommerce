<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStockEntrieRequest;
use App\Http\Resources\ProductStockEntrieResource;
use App\Models\Product;
use App\Models\ProductStockEntrie;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductStockEntrieController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $entries = ProductStockEntrie::query()->with(['productVariation', 'supplier'])
      ->when($request->startDate, function ($query, $startDate) {
        $query->whereDate('created_at', '>=', $startDate);
      })
      ->when($request->endDate, function ($query, $endDate) {
        $query->whereDate('created_at', '<=', $endDate);
      })
      ->latest()
      ->paginate(10)
      ->withQueryString();

    return Inertia::render('ProductStockEntrie/index', [
      'productStockEntries' => ProductStockEntrieResource::collection($entries),
      'filters' => $request->only(['startDate', 'endDate']),
    ]);
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
  public function store(ProductStockEntrieRequest $request)
  {
    try {
      $validated = $request->validated();
      foreach ($validated['items'] as $item) {
        ProductStockEntrie::create([
          'product_variation_id' => $item['product_variation_id'],
          'supplier_id' => $item['supplier_id'],
          'unit_cost' => $item['unit_cost'],
          'quantity' => $item['quantity'],
        ]);
      }
      return redirect()->back()->with('success', 'Entradas de estoque adicionadas com sucesso.');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao adicionar entradas de estoque.');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, ProductStockEntrie $productStockEntrie)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductStockEntrie $productStockEntrie)
  {
    //
  }
}
