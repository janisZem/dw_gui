<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SchemaController extends Controller {

    public function __construct() {
        
    }

    public function createSchema(Request $request) {
        $this->saveSchema("DWH schema name");
        //print_r(Request::json()->all());
        return $request->input('0.title');
        //$classes = $request->all();  
    }

    public function saveSchema($name) {
        $model = new \App\Schema_model;
        $model->title = $name;
        $model->status = '00';
        $model->save();
        return $model->id;
    }

}
