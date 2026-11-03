<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (! env('ADMIN_EMAIL') || ! env('ADMIN_PASSWORD')) {
            return;
        }$u = User::firstOrNew(['email' => env('ADMIN_EMAIL')]);
        if ($u->exists) {
            return;
        }$u->name = 'Administrator';
        $u->password = env('ADMIN_PASSWORD');
        $u->role = 'admin';
        $u->email_verified_at = now();
        $u->save();
    }
}
