<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
class ActiveUser {public function handle(Request $r,Closure $next){abort_if($r->user()&&!$r->user()->is_active,403,'Akun dinonaktifkan.');return $next($r);}}