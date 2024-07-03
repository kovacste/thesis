<?php

use App\Http\Controllers\Category\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('tag/getTags', [\App\Http\Controllers\Tag\TagController::class, 'index']);
Route::post('tag/createTag', [\App\Http\Controllers\Tag\TagController::class, 'store']);
