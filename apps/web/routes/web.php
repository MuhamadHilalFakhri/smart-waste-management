<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ActiveUser;
use Illuminate\Support\Facades\Route;

Route::get('/api-documentation', function () {
    return response()->file(resource_path('openapi.json'));
});
Route::redirect('/', '/dashboard')->name('home');
Route::middleware(['auth', ActiveUser::class])->group(function () {
    Route::inertia('/dashboard', 'waste/dashboard')->name('dashboard');
    Route::inertia('/reports', 'waste/reports')->name('reports');
    Route::get('/users', [UserController::class, 'page'])->name('users');
    Route::prefix('data')->group(function () {
        Route::get('dashboard', [ReportController::class, 'dashboard']);
        Route::apiResource('reports', ReportController::class);
        Route::get('reports/{report}/photo', [ReportController::class, 'photo']);
        Route::post('reports/{report}/predict', [ReportController::class, 'retry']);
        Route::patch('reports/{report}/status', [ReportController::class, 'status']);
        Route::get('users', [UserController::class, 'index']);
        Route::post('users', [UserController::class, 'store']);
        Route::patch('users/{user}', [UserController::class, 'update']);
    });
});
require __DIR__.'/settings.php';
