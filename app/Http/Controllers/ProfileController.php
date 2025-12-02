<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileImageUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response
  {
    $user = $request->user()->load(['addresses', 'cards']);
    return Inertia::render('Profile/Edit', [
      'user' => $user,
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail, // Verifica se o objeto do usuário implementa a interface MustVerifyEmail
      'status' => session('status'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {

    try {
      $validatedData = $request->validated();
      $user = $request->user();

      if ($user->isDirty('email')) {
        $user->email_verified_at = null;
      }
      $user->fill($validatedData);
      $user->save();

      return Redirect::route('profile.edit')->with('success', 'Perfil atualizado!');
    } catch (\Exception $e) {
      dd($e->getMessage());
      return Redirect::route('profile.edit')->with('error', 'Erro ao atualizar o perfil!');
    }
  }

  /**
   * Update the user's avatar.
   */
  public function updateProfileImage(ProfileImageUpdateRequest $request): RedirectResponse
  {
    try {
      if ($request->hasFile('profile_image')) {
        $user = $request->user();

        if ($user->profile_image) {
          Storage::disk('public')->delete($user->profile_image);
        }

        $path = $request->file('profile_image')->store('profile-images', 'public');

        $user->profile_image = $path; // salva o caminho da imagem no campo profile_image
        $user->save();
      }

      return Redirect::route('profile.edit')->with('success', 'Imagem atualizada!');
    } catch (\Exception $e) {
      return Redirect::route('profile.edit')->with('error', 'Erro ao atualizar a imagem!');
    }
  }


  /**
   * Delete user avatar
   */
  public function destroyImage(ProfileImageUpdateRequest $request): RedirectResponse
  {
    $user = $request->user();
    try {
      if ($user->profile_image) {
        Storage::disk('public')->delete($user->profile_image);
        $user->profile_image = null;
        $user->save();
        return Redirect::route('profile.edit')->with('success', 'Imagem removida!');
      }
      return Redirect::route('profile.edit')->with('info', 'Nenhuma imagem para remover!');
    } catch (\Exception $e) {
      return Redirect::route('profile.edit')->with('error', 'Erro ao remover a imagem!');
    }
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
