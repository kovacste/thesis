<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'description',
        'parent_id',
    ];

    public function delete() {
        DB::transaction(function () {
            $this->deleteChildren($this->id);
            parent::delete();
        });
    }

    private function deleteChildren($id) {
        $categories = Category::where('parent_id', $id)->get();
        foreach ($categories as $category) {
            $category->deleteChildren($category->id);
        }
        $category = Category::find($id);
        $category->delete();
    }

    public function contents()
    {
        return $this->hasMany(Content::class, 'category_id');
    }
}
