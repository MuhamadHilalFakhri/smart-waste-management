<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ReportController;
use App\Http\Middleware\ActiveUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::middleware('throttle:10,1')->group(function () {
        Route::post('register', [ApiAuthController::class, 'register']);
        Route::post('login', [ApiAuthController::class, 'login']);
    });
    Route::middleware(['auth:sanctum', ActiveUser::class])->group(function () {
        Route::post('logout', [ApiAuthController::class, 'logout']);
        Route::get('me', fn (Request $r) => $r->user());
        Route::get('dashboard', [ReportController::class, 'dashboard']);
        Route::apiResource('reports', ReportController::class);
        Route::get('reports/{report}/photo', [ReportController::class, 'photo']);
        Route::post('reports/{report}/predict', [ReportController::class, 'retry']);
        Route::patch('reports/{report}/status', [ReportController::class, 'status']);
    });
});
