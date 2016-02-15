<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SchemaController extends Controller {

    public function __construct() {
        
    }

    public function createSchema(Request $request) {
        $data = $request->all();

        if (!isset($data['theme_id'])) {
            $theme_id = $this->saveTheme($data['theme_name']);
        } else {
            $theme_id = $data['theme_id'];
        }
        if (!isset($data['schema_id'])) {
            $schema = $this->saveSchema($data['schema_name'], "00");
        } else {
            $schema = $data['schema_id'];
        }

        foreach ($data['classes'] as $d) {
            $this->createClass($d, $schema, $theme_id);
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

    private function saveTheme($name) {
        $theme = new \App\Themes_model;
        $theme->name = $name;
        $theme->save();
        return $theme->id;
    }

    private function createClass($elem, $schemaId, $themeId) {
        $class = new \App\Class_model;
        $class->type = $elem['type'];
        $class->name = $elem['name'];
        $class->html_id = $elem['html_id'];
        if (isset($elem['value'])) {
            $class->value = $elem['value'];
        }
        $class->schema_id = $schemaId;
        $class->theme_id = $themeId;
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
