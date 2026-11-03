<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ApiAuthController
{
    public function register(Request $r): JsonResponse
    {
        $d = $r->validate(['name' => 'required|string|max:100', 'email' => 'required|email|unique:users', 'password' => 'required|string|min:8|confirmed']);
        $u = User::create($d);

        return response()->json(['user' => $u, 'token' => $u->createToken('android')->plainTextToken], 201);
    }

    /** @return array<string, mixed> */
    public function login(Request $r): array
    {
        $d = $r->validate(['email' => 'required|email', 'password' => 'required|string']);
        $u = User::where('email', $d['email'])->first();
        if (! $u || ! Hash::check($d['password'], $u->password) || ! $u->is_active) {
            throw ValidationException::withMessages(['email' => 'Email atau kata sandi tidak valid.']);
        }

        return ['user' => $u, 'token' => $u->createToken('android')->plainTextToken];
    }

    public function logout(Request $r): Response
    {
        $r->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
