<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentController extends Controller
{

    public function index(): JsonResponse
    {
        $contents = Content::select('id', 'content_id', 'content')
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

        $content->content = $request->input('content');
        $content->title = $request->input('title');
        $content->save();
        return response()->json([
            'message' => 'Content created successfully',
        ], 200);

    }

    public function show($id): JsonResponse
    {
        $content = Content::where('content_id', $id)->orderBy('id', 'desc')->first();
        return response()->json($content);
    }

    public function edit($id): JsonResponse
    {
        $content = Content::find($id);
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




}
