<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ApiAuthController,ReportController};
Route::prefix('v1')->group(function(){
 Route::middleware('throttle:10,1')->group(function(){Route::post('register',[ApiAuthController::class,'register']);Route::post('login',[ApiAuthController::class,'login']);});
 Route::middleware(['auth:sanctum',\App\Http\Middleware\ActiveUser::class])->group(function(){
 Route::post('logout',[ApiAuthController::class,'logout']);Route::get('me',fn(\Illuminate\Http\Request $r)=>$r->user());
 Route::get('dashboard',[ReportController::class,'dashboard']);Route::apiResource('reports',ReportController::class);
 Route::get('reports/{report}/photo',[ReportController::class,'photo']);Route::post('reports/{report}/predict',[ReportController::class,'retry']);Route::patch('reports/{report}/status',[ReportController::class,'status']);
 });
});