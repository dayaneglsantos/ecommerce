<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStockEntrieRequest;
use App\Http\Resources\ProductStockEntrieResource;
use App\Models\Product;
use App\Models\ProductStockEntrie;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
      ->when($request->search, function ($query, $search) {
        $query->whereHas('productVariation.product', function ($q) use ($search) {
          $q->where('name', 'like', '%' . $search . '%');
        });
      })
      ->latest()
      ->paginate(10)
      ->withQueryString();

    return Inertia::render('ProductStockEntrie/index', [
      'productStockEntries' => ProductStockEntrieResource::collection($entries),
      'filters' => $request->only(['startDate', 'endDate']),
    ]);
  }

  public function export(Request $request)
  {

    try {
      $startDate = $request->startDate;
      $endDate = $request->endDate;

      $response = new StreamedResponse(function () use ($startDate, $endDate) {
        $handle = fopen('php://output', 'w'); // Abrir o fluxo de saída, ou seja, o download do arquivo

        // Definir o cabeçalho do arquivo CSV
        fputcsv($handle, [
          'Produto',
          'Cor',
          'Tamanho',
          'Fornecedor',
          'Custo Unitário',
          'Quantidade',
          'Data de Criação',
        ]);

        ProductStockEntrie::query()
          ->with(['productVariation.product', 'productVariation.attributes.attribute', 'supplier'])
          // Filtro por período
          ->when($startDate, function ($query, $startDate) {
            $query->whereDate('created_at', '>=', $startDate);
          })
          ->when($endDate, function ($query, $endDate) {
            $query->whereDate('created_at', '<=', $endDate);
          })
          // Processa em lotes para evitar sobrecarga de memória (carregando 100 registros por vez)
          ->chunk(100, function ($entries) use ($handle) {
            foreach ($entries as $entry) {
              // Escrever cada linha de dados no arquivo CSV
              fputcsv($handle, [
                $entry->productVariation->product->name,
                $entry->productVariation->attributes->where('attribute.name', 'Cor')->first()?->value ?? '',
                $entry->productVariation->attributes->where('attribute.name', 'Tamanho')->first()?->value ?? '',
                $entry->supplier->name,
                $entry->unit_cost_formatted,
                $entry->quantity,
                $entry->created_at->format('d/m/Y H:i:s'),
              ]);
            }
          });

        fclose($handle); // Fechar o fluxo de saída
      });

      $response->headers->set('Content-Type', 'text/csv');
      $response->headers->set('Content-Disposition', 'attachment; filename="entradas_estoque.csv"');

      return $response;
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao exportar entradas de estoque.');
    }
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
