<?php

use App\Http\Controllers\Image\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware('auth:sanctum')->group(function () {
    include_once 'content_api.php';
    include_once 'category_api.php';
    include_once 'tag_api.php';
    Route::post('image', [ImageController::class, 'storeImage']);
//});


