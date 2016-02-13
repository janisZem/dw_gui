<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SchemaController extends Controller {

    public function __construct() {
        
    }

    public function createSchema(Request $request) {
        $schema = $this->saveSchema("DWH schema name", "00");
        $data = $request->all();
        foreach ($data as $d) {
            $this->createClass($d, $schema);
        }
        $this->updateSchema($schema, '01');
        return '';
        //$classes = $request->all();  
    }

    private function saveSchema($name, $status) {
        $model = new \App\Schema_model;
        $model->title = $name;
        $model->status = $status;
        $model->save();
        return $model->id;
    }

    private function updateSchema($id, $status) {
        $schema = \App\Schema_model::find($id);
        $schema->status = $status;
        $schema->save();
    }

    private function createClass($elem, $schemaId) {
        $class = new \App\Class_model;
        $class->type = $elem['type'];
        $class->name = $elem['name'];
        $class->html_id = $elem['html_id'];
        if (isset($elem['value'])) {
            $class->value = $elem['value'];
        }
        $class->schema_id = $schemaId;
        $class->save();
        if ($elem['parent'] != "" && $elem['parent'] != '0_menu') {
            $this->createRel($class->id, $this->findByHTMLID($elem['html_id']));
        }
    }

    private function createRel($child, $parent) {
        $rel = new \App\Classes_rel_model;
        $rel->parent_id = $parent;
        $rel->child_id = $child;
        $rel->save();
    }

    private function findByHTMLID($ID) {
        $class = \App\Class_model::where('html_id', $ID)->first();
        return $class->id;
    }

}
