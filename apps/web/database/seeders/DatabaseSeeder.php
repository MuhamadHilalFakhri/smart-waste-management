<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('admin.email');
        $password = config('admin.password');
        if (! is_string($email) || $email === '' || ! is_string($password) || $password === '') {
            return;
        }
        $user = User::firstOrNew(['email' => $email]);
        if ($user->exists) {
            return;
        }
        $user->name = 'Administrator';
        $user->password = $password;
        $user->role = 'admin';
        $user->email_verified_at = now();
        $user->save();
    }
}
