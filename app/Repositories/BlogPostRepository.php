<?php

namespace App\Repositories;

use App\Models\BlogPost as Model;

/**
 * Class BlogcategoryRepository.
 */
class BlogPostRepository extends CoreRepository
{
    public function getModelClass()
    {
        return Model::class;
    }

    public function getEdit($id)
    {
        return $this->startConditions()->find($id);
    }

    public function getForComboBox(){
        $result = $this->startConditions()
        ->select()
        ->selectRaw('CONCAT(id, ". ", title) AS id_title')
        ->toBase()
        ->get();
        return $result;
    }

    public function getAllWithPaginate()
    {
        $columns = [
            'id',
            'title',
            'slug',
            'is_published',
            'published_at',
            'ser_id',
            'category_id',
        ];
        $result = $this
            ->startConditions()
            ->select($columns)
            ->orderBy('id', 'DESC')
            ->paginate(25);
        //dd($result);
        return $result;
    }

}
