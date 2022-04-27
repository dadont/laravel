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
/*
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

    public function getAllWithPaginate($perPage = null)
    {
        $columns = ['id', 'title', 'parent_id'];
        $result = $this
            ->startConditions()
            ->select($columns)
            ->paginate($perPage);
        //dd($result);
        return $result;
    }
*/
}
