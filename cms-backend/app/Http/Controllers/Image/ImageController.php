<?php

namespace App\Http\Controllers\Image;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImageController extends Controller
{

    public function storeImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $imagePath = $request->file('image')->store('public/images');
        $imageUrl = asset('storage/images/' . str_replace('public/images', '', $imagePath));
        return response()->json(['success'=> 1, 'file' => ['url' => $imageUrl]], 201);
    }
}
