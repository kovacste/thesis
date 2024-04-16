<?php

use App\Http\Controllers\Category\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('category/topLevelCategories', [CategoryController::class, 'getTopLevelCategories']);
Route::get('category/childCategories/{id}', [CategoryController::class, 'getChildCategories']);
Route::get('category/delete/{id}', [CategoryController::class, 'delete']);
Route::post('category', [CategoryController::class, 'store']);
Route::get('category/categories', [CategoryController::class, 'allCategories']);
