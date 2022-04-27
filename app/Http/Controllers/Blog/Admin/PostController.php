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
        //$paginator = BlogCategory::paginate(50);
        $paginator = $this->blogPostRepository->getAllWithPaginate();
        return view('blog.admin.posts.index', compact('paginator'));
    }


    public function create()
    {
        //$item = new BlogCategory();
        //dd($item);
        //$categoryList = $this->blogCategoryRepository->getForComboBox();
        //return View('blog.admin.categories.edit', compact('item', 'categoryList'));
    }

    public function store(BlogCategoryCreateRequest $request)
    {
        //$data = $request->input();
        //if(empty($data['Slug'])) {
        //    $data['slug'] = str_slug($data['title']);
        //}
        
        //$item = new BlogCategory($data);
        //dd($item);
        //$item->save();

        //if ($item) {
        //    return redirect()->route('blog.admin.categories.edit', [$item->id])
        //        ->with(['success' => 'Успешно сохранено']);
        //} else {
        //    return back()->withErrors(['msg' => 'Ошибка сохранения'])
        //        ->withInput();
        //}
    }

    public function edit($id, BlogCategoryRepository $categoryRepository)
    {
/*        $item = $categoryRepository->getEdit($id);
        if(empty($item)){
            abort(404);
        }
        $categoryList = $categoryRepository->getForComboBox();

        return view('blog.admin.categories.edit', compact('item', 'categoryList'));
*/
    }

    public function update(BlogCategoryUpdateRequest $request, $id)
    {
/*
        //$validatedData = $request->validate($rules);

        $item = $this->blogCategoryRepository->getEdit($id);
        //dd($item);
        if(empty($item)) {
            return back()
                ->withErrors(['msg' => "Запись id=[{$id}] не найдена"])
                ->withInput();
        }
        
        $data = $request->all();
        if(empty($data['Slug'])) {
            $data['slug'] = str_slug($data['title']);
        }

        $result = $item->update($data);

        if ($result) {
            return redirect()
                ->route('blog.admin.categories.edit', $item->id)
                ->with(['success' => 'Успешно сохранено']);
        } else {
            return back()
                ->withErrors(['msg' => 'Ошибка сохранения'])
                ->withInput();
        } 
*/  }

}
