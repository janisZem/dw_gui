<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SchemaController extends Controller {

    public function __construct() {
        
    }

    public function createSchema(Request $request) {
        $req_id = $this->createReq();
        $data = $request->all();
        // print_r($data);
        $this->createBP($data, $req_id);
        $this->createST($data, $req_id);
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
        $classes = $data['classes'];
        //$classes = array_reverse($data['classes']);
        $classes = $this->sortClasses($classes);
        foreach ($classes as $d) {
            $this->createClass($d, $schema, $theme_id, $req_id);
        }
        $this->updateSchema($schema, '01');
        return '';
        //$classes = $request->all();
    }

    private function createBP($data, $req_id) {
        if (!isset($data['bp_name']) || $data['bp_name'] == "") {
            return;
        }
        if (!isset($data['bp_id'])) {
            $bp = new \App\Business_processes_model;
            $bp->title = $data['bp_name'];
            $bp->save();
            $data['bp_id'] = $bp->id;
        }
        $rel = new \App\Business_processes_rels_model;
        $rel->req_id = $req_id;
        $rel->bp_id = $data['bp_id'];
        $rel->save();
        return;
    }

    private function createST($data, $req_id) {
        if (!isset($data['st_name']) || $data['st_name'] == "") {
            return;
        }
        if (!isset($data['st_id'])) {
            $st = new \App\Stateholder_model;
            $st->title = $data['st_name'];
            $st->save();
            $data['st_id'] = $st->id;
        }
        $rel = new \App\Stateholdres_rels_model;
        $rel->req_id = $req_id;
        $rel->stateholder_id = $data['st_id'];
        $rel->save();
        return;
    }

    private function createReq() {
        $req = new \App\Reqs_model();
        $req->save();
        return $req->id;
    }

    private function sortClasses($classes) {
        $tmp = [];
        while (count($tmp) != count($classes)) {
            foreach ($classes as $class) {
                if ((!$this->findInArray($tmp, $class)) && ($class['parent'] == '0_menu' || $this->findInArray($tmp, $this->getHTMLElem($classes, $class['parent'])))) {
                    array_push($tmp, $class);
                }
            }
        }
        return $tmp;
    }

    private function findInArray($sArray, $array) {
        foreach ($sArray as $a) {
            if ($a['html_id'] == $array['html_id']) {
                return true;
            }
        }
        return false;
    }

    private function getHTMLElem($classes, $id) {
        foreach ($classes as $class) {
            if ($class['html_id'] == $id) {
                return $class;
            }
        }
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

    private function createClass($elem, $schemaId, $themeId, $req_id) {
        $class = new \App\Class_model;
        $class->type = $elem['type'];
        $class->name = $elem['name'];
        $class->html_id = $elem['html_id'];
        if (isset($elem['value'])) {
            $class->value = trim($elem['value']); //trim if user enters white spaces
        }
        $class->schema_id = $schemaId;
        $class->theme_id = $themeId;
        $class->reqs_id = $req_id;
        $class->save();
        if ($elem['parent'] != "" && $elem['parent'] != '0_menu') {
            $this->createRel($class->id, $this->findByHTMLID($elem['parent']));
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
