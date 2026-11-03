<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ReportController,UserController};
Route::redirect('/','/dashboard')->name('home');
Route::middleware(['auth',\App\Http\Middleware\ActiveUser::class])->group(function(){
 Route::inertia('/dashboard','waste/dashboard')->name('dashboard');
 Route::inertia('/reports','waste/reports')->name('reports');
 Route::inertia('/users','waste/users')->name('users');
 Route::prefix('data')->group(function(){
 Route::get('dashboard',[ReportController::class,'dashboard']);Route::apiResource('reports',ReportController::class);
 Route::get('reports/{report}/photo',[ReportController::class,'photo']);Route::post('reports/{report}/predict',[ReportController::class,'retry']);Route::patch('reports/{report}/status',[ReportController::class,'status']);
 Route::get('users',[UserController::class,'index']);Route::post('users',[UserController::class,'store']);Route::patch('users/{user}',[UserController::class,'update']);
 });
});
require __DIR__.'/settings.php';