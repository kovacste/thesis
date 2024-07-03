<?php

namespace App\Http\Controllers\Tag;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class TagController extends Controller
{
    public function index(): JsonResponse
    {
        $tags = Tag::all();
        return response()->json($tags);
    }

    public function delete($id)
    {
        $tag = Tag::find($id);
        $tag->delete();
        return response()->json([
            'message' => 'Tag deleted successfully',
        ], 200);
    }
    public function store(Request $request)
    {
        $tag = new Tag;
        $tag->name = $request->input('name');
        $tag->usage_count = 0;
        $tag->save();
        return response()->json([
            'message' => 'Tag created successfully',
        ], 200);
    }
}
