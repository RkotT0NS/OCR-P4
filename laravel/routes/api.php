<?php

use App\Http\Controllers\Api\UserUploadController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// GROUP 1: Public Routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// GROUP 2: Protected Routes
// The 'auth:api' middleware verifies the JWT before allowing access.
Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'auth',
], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Example Resource Route
Route::middleware('auth:api')->get('/user', function () {
    return auth()->user();
});

Route::middleware('auth:api')->get('/uploads', [UserUploadController::class, 'index']);
Route::middleware('auth:api')->patch('/uploads/{upload}', [UserUploadController::class, 'update']);

// TUS Upload Route
Route::middleware('auth:api')->any('/upload/{any?}', function () {
    return app('tus-server')->serve();
})->where('any', '.*');
