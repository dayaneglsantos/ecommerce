<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Coupons/index');
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
  public function store(CouponRequest $request)
  {
    try {
      $validated = $request->validated();

      Coupon::create($validated);
      return redirect()->route('coupons.index')->with('success', 'Cupom criado com sucesso');
    } catch (\Exception $e) {
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
