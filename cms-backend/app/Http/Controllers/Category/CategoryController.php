<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
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
        $category->description = $request->input('description');
        $category->parent_id = $request->input('parent_id');
        $category->save();
        return response()->json([
            'message' => 'Category created successfully',
        ], 200);
    }

    public function delete($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'message' => 'Category deleted successfully',
        ], 200);
    }

    public function getTopLevelCategories()
    {
        $categories = Category::whereNull('parent_id')->get();
        return response()->json($categories);
    }

    public function getChildCategories($id)
    {
        $categories = Category::where('parent_id', $id)->get();
        return response()->json($categories);
    }

    public function allCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
}
