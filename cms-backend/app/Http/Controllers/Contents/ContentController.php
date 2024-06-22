<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{

    public function index(): JsonResponse
    {
        $contents = Content::select('*')
                ->whereIn('id', function($query) {
                    $query->selectRaw('max(id)')
                        ->from('contents')
                        ->groupBy('content_id');
                })->get();
        return response()->json($contents);
    }

    public function store(Request $request)
    {
        $content = new Content;
        $content->title = '';
        $content->user_id = 1;
        $content->author_id = 1;
        $content->content_id = 1;
        $content->content = '';

        $content->save();
        $content->content_id = $content->id;

        $content->category_id = $request->input('category_id');
        $content->content = $request->input('content');
        $content->title = $request->input('title');
        $content->save();
        return response()->json([
            'message' => 'Content created successfully',
        ], 200);

    }

    public function show($id): JsonResponse
    {
        $content = Content::where('id', $id)->orderBy('id', 'desc')->first();
        return response()->json($content);
    }

    public function update(Request $request, $id)
    {
        $content = Content::find($id);
        $newContent = new Content();
        $newContent->title = $request->input('title');
        $newContent->user_id = $content->user_id;
        $newContent->author_id = $content->author_id;
        $newContent->content_id = $content->content_id;
        $newContent->category_id = $request->input('category_id');
        $newContent->content = $request->input('content');
        $newContent->save();

        return response()->json([
            'message' => 'Content updated successfully',
        ], 200);
    }

    public function destroy($id)
    {
        $content = Content::find($id);
        $content->delete();
        return response()->json([
            'message' => 'Content deleted successfully',
        ], 200);
    }

    public function history($id)
    {
        $content = Content::find($id);
        $history = Content::where('content_id', $content->content_id)->get();
        return response()->json($history);
    }

    public function searchContent(
        $category_id = null,
        $author_id = null,
        $search_term = null): JsonResponse
    {
        $query = Content::select('*')
            ->whereIn('id', function($innerQuery) {
                $innerQuery->selectRaw('max(id)')
                    ->from('contents')
                    ->groupBy('content_id');
            });

        if ($category_id) {
            $query->where('category_id', $category_id);
        }
        if ($author_id) {
            $query->where('author_id', $author_id);
        }
        if ($search_term) {
            $query->where('content', 'like', '%' . $search_term . '%');
        }

        $contents = $query->get();
        return response()->json($contents);
    }


    public function edit(Request $request)
    {
        return Inertia::render('Editor/Editor');
    }



}
