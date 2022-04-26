<?php

namespace App\Repositories;

use App\Models\BlogCategory as Model;
//use Your Model

/**
 * Class BlogcategoryRepository.
 */
class BlogcategoryRepository extends CoreRepository
{
    public function getModelClass()
    {
        return Model::class;
    }

    public function getEdit($id)
    {
        return $this->startConditions()->find($id);
    }

    public function getForComboBox()
    {
        return $this->startConditions()->all();
    }


}
