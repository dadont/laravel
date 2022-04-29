<?php

namespace App\Http\Controllers\Blog\Admin;
use App\Repositories\BlogPostRepository;
use App\Repositories\BlogCategoryRepository;
use App\Models\BlogPost;

class PostController extends BaseController
{
  
    private $blogPostRepository;
    
    private $blogCategoryRepository;
    

    public function __construct(){
        parent::__construct();
        $this->blogPostRepository = app(BlogPostRepository::class);
        $this->blogCategoryRepository = app(BlogCategoryRepository::class);
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
        $item = $this->blogPostRepository->getEdit($id);
        if(empty($item)){
            abort(404);
        }
        $categoryList = $this->blogCategoryRepository->getForComboBox();

        return view('blog.admin.posts.edit', compact('item', 'categoryList'));
    }

    public function update(Request $request, $id)
    {
        dd(__METHOD__, $request->all(), $id);
    }

}
