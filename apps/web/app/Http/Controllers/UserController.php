<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController
{
    public function page(Request $r): Response
    {
        abort_unless($r->user()->role === 'admin', 403);

        return Inertia::render('waste/users');
    }

    public function index(Request $r): JsonResponse
    {
        abort_unless($r->user()->role === 'admin', 403);

        return response()->json(User::orderBy('name')->paginate(20));
    }

    public function store(Request $r): User
    {
        return $this->save($r, new User);
    }

    public function update(Request $r, User $user): User
    {
        return $this->save($r, $user);
    }

    private function save(Request $r, User $u): User
    {
        abort_unless($r->user()->role === 'admin', 403);
        $d = $r->validate(['name' => 'required|string|max:100', 'email' => ['required', 'email', Rule::unique('users')->ignore($u->id)], 'password' => [$u->exists ? 'nullable' : 'required', 'string', 'min:8'], 'role' => 'required|in:admin,user', 'is_active' => 'required|boolean']);

        return DB::transaction(function () use ($u, $d) {
            $admins = User::where('role', 'admin')->where('is_active', true)->lockForUpdate()->get();
            abort_if($u->exists && $admins->contains('id', $u->id) && $admins->count() === 1 && ($d['role'] !== 'admin' || ! $d['is_active']), 422, 'Admin aktif terakhir tidak dapat dinonaktifkan.');
            if (empty($d['password'])) {
                unset($d['password']);
            }
            foreach ($d as $k => $v) {
                $u->$k = $v;
            }$u->save();
            if (! $u->is_active) {
                $u->tokens()->delete();
            }

            return $u;
        });
    }
}
