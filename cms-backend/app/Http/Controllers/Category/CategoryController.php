<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{

    public function index(): JsonResponse
    {
        $categories = Category::findAll();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $category = new Category;
        $category->name = $request->input('name');
        $category->save();
        return response()->json([
            'message' => 'Category created successfully',
        ], 200);
    }

    public function show($id): JsonResponse
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    public function edit($id): JsonResponse
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    public function delete($id): JsonResponse
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'message' => 'Category deleted successfully',
        ], 200);
    }

    public function useCategory($id): JsonResponse
    {
        $category = Category::find($id);
        $category->usage_count = $category->usage_count + 1;
        $category->save();
        return response()->json([
            'message' => 'Category usage count updated successfully',
        ], 200);
    }

    public function unUseCategory($id): JsonResponse
    {
        $category = Category::find($id);
        $category->usage_count = $category->usage_count - 1;
        $category->save();
        return response()->json([
            'message' => 'Category usage count updated successfully',
        ], 200);
    }


}
