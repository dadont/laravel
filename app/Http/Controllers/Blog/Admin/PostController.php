<?php

namespace App\Http\Controllers\Blog\Admin;
use App\Repositories\BlogPostRepository;
use App\Models\BlogPost;

class PostController extends BaseController
{
  
    private $blogPostRepository;

    public function __construct(){
        parent::__construct();
        $this->blogPostRepository = app(BlogPostRepository::class);
    }

    public function index()
    {
        $paginator = $this->blogPostRepository->getAllWithPaginate();
        return view('blog.admin.posts.index', compact('paginator'));
    }


    public function create()
    {
        dd(__METHOD__);
    }

    public function store(Request $request)
    {
        dd(__METHOD__);
    }

    public function edit($id)
    {
        dd(__METHOD__, $id);
    }

    public function update(Request $request, $id)
    {
        dd(__METHOD__, $request->all(), $id);
    }

}
