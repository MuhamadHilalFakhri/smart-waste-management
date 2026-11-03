<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActiveUser
{
    public function handle(Request $r, Closure $next): Response
    {
        abort_if($r->user() && ! $r->user()->is_active, 403, 'Akun dinonaktifkan.');

        return $next($r);
    }
}
