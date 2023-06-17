<?php

use App\Http\Controllers\Image\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware('auth')->group(function () {
//});

include_once 'content_api.php';
Route::post('image', [ImageController::class, 'storeImage']);
