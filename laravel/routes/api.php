<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// GROUP 1: Public Routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// GROUP 2: Protected Routes
// The 'auth:api' middleware verifies the JWT before allowing access.
Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'auth'
], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Example Resource Route
Route::middleware('auth:api')->get('/user', function () {
    return auth()->user();
});
