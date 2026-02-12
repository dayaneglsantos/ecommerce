<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CouponResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $coupons = Coupon::all();
    return Inertia::render(
      'Coupons/index',
      [
        'coupons' => CouponResource::collection($coupons),
      ]
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(Request $request)
  {
    try {
      $coupons = Coupon::all();
      $brands = Brand::all();
      $categories = Category::all();
      // $products = Product::with('images', 'defaultColor')->get();

      return Inertia::render(
        'Coupons/CouponForm',
        [
          'coupons' => CouponResource::collection($coupons),
          'brands' => BrandResource::collection($brands),
          'categories' => CategoryResource::collection($categories),
        ]
      );
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao carregar formulário de criação de cupom');
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CouponRequest $request)
  {
    try {
      $validated = $request->validated();

      Coupon::create($validated);

      return redirect()->route('coupons.index')->with('success', 'Cupom criado com sucesso');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return redirect()->back()->with('error', 'Erro ao criar cupom');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Coupon $coupon)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Coupon $coupon)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Coupon $coupon)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Coupon $coupon)
  {
    //
  }
}
