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
                ->where('status', '!=' , 2)
                ->orWhereNull('status')
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
        $content->content_id = 0;
        $content->status = 0;
        $content->content = '';

        $content->save();
        $content->content_id = $content->id;

        $content->tags = $request->input('tags');
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
        $newContent->status = $request->input('status');
        $newContent->content_id = $content->content_id;
        $newContent->tags = $request->input('tags');
        $newContent->category_id = $request->input('category_id');
        $newContent->content = $request->input('content');
        $newContent->save();

        return response()->json([
            'message' => 'Content updated successfully',
            'id' => $newContent->id,
        ], 200);
    }

    public function destroy($id)
    {
        $content = Content::find($id);
        $content->status = 2;
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
        $search_term = null,
        $tags = null
    ): JsonResponse
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
        /*if ($tags) {
            $query->whereHas('tags', function($innerQuery) use ($tags) {
                $innerQuery->whereIn('tag_id', $tags);
            });
        }*/

        $contents = $query->get();
        return response()->json($contents);
    }


    public function edit(Request $request)
    {
        return Inertia::render('Editor/Editor');
    }

    public function rollbackContentToVersion($oldId, $newId)
    {
       $newContent = Content::find($newId);

        $content = new Content;

        $content->user_id = $newContent->user_id;
        $content->status = $newContent->status;
        $content->author_id = $newContent->author_id;
        $content->content_id = $newContent->content_id;
        $content->tags = $newContent->tags;
        $content->category_id = $newContent->category_id;
        $content->content = $newContent->content;
        $content->title = $newContent->title;
        $content->save();

        return response()->json([
            'message' => 'Content rolled back successfully',
            'id' => $content->id,
        ], 200);
    }

}
