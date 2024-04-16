<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Contents\ContentController;

Route::post('content', [ContentController::class, 'store']);
Route::get('content/contents', [ContentController::class, 'index']);
Route::get('content/{id}', [ContentController::class, 'show']);
Route::get('content/{id}/edit', [ContentController::class, 'edit']);
Route::post('content/{id}', [ContentController::class, 'update']);
Route::delete('content/{id}', [ContentController::class, 'destroy']);
Route::get('content/history/{id}', [ContentController::class, 'history']);
Route::get('content/content/{category_id?}/{author_id?}{search_term?}', [ContentController::class, 'searchContent']);
