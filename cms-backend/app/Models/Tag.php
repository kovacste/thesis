<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    protected $fillable = ['name', 'id', 'usage_count'];

    public function incrementUsageCount()
    {
        $this->usage_count++;
        $this->save();
    }

}
