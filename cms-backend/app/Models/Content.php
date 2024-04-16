<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';
    protected $fillable = [
        'content_id',
        'title',
        'user_id',
        'content',
        'author_id',
        'title',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
