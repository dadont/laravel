<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;

class DDController extends Controller
{
    public function collections()
    {
        $result = [];

        $eloquentCollection = BlogPost::withTrashed()->get();
        dd($eloquentCollection->toArray());
    }
}
