<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class GenerateController extends Controller {

    private $classRels = [];
    private $simpleReqs = [];

    public function index() {
        $data['schemas'] = \App\Schema_model::where('status', '01')->get();
        return view('generate', $data);
    }

    public function generateSchema(Request $request) {
        $data = $request->all();
        /* $classes = \App\Class_model::where('schema_id', $data['schema_name'])
          ->get(); */
        $sql = 'select c.*, cl.parent_id from classes c left join classes_rels cl on c.id = cl.child_id where c.schema_id = :id';
        $classes = DB::select($sql, ['id' => $data['schema_name']]);
        //$classes = $classes->toArray();
        //print_r($classes);
        $viewData['modelClasses'] = $this->createJson($classes)['classes'];
        $viewData['rels'] = $this->createJson($classes)['rels'];
        return view('schema', $viewData);
    }

    private function createJson($classes) {
        $mClasses = [];
        $rels = [];
        $this->createMeasures($classes, $mClasses); //mClasses change by reference
        $this->createDimensions($classes, $mClasses, $rels); //mClasses, rels change by reference 
        $data['classes'] = $mClasses;
        $data['rels'] = $rels;
        return $data;
    }

    private function createMeasures($classes, &$mClasses) {
        foreach ($classes as $c) {
            if ($c['type'] == 'quanData') {
                if (!$this->inArray('m_' . $c['value'], $mClasses)) {
                    array_push($mClasses, ['key' => 'm_' . $c['value'],
                        'items' => [array('name' => $c['value'] . "_id", 'iskey' => true, 'figure' => "Decision", 'color' => 'yellowgrad')]]);
                }
            }
        }
        return $mClasses;
    }

    private function inArray($val, $array) {
        foreach ($array as $a) {
            if ($a['key'] == $val) {
                return true;
            }
        }
        return false;
    }

    private function createDimensions($classes, &$mClasses, &$rels) {
        $this->createSimpleReq($classes);
        foreach ($classes as $c) {
            if ($c['type'] == 'qualData') {
                if (!$this->inArray('a_' . $c['value'], $mClasses)) {
                    array_push($mClasses, ['key' => 'a_' . $c['value'],
                        'items' => []]);
                     $this->createRel($c, $rels);
                }
            }
        }
        return $mClasses;
    }

    private function createRel($c, &$rels) {
        $measures = $this->findMeasure($c);
       // $rels = [];
        foreach ($measures as $m) {
            array_push($rels, ['from' => "a_" . $c['value'], 'to' => "m_" . $m['value'], 'text' => "", 'toText' => ""]);
        }
        return $rels;
    }

    private function findMeasure($c) {
        $m = [];
        foreach ($this->simpleReqs as $r) {
            foreach ($r as $ch) {
                if ($c['id'] == $ch['id']) {
                    foreach ($r as $ch) {
                        if ($ch['type'] == 'quanData') {
                            array_push($m, $ch);
                        }
                    }
                }
            }
        }
        return $m;
    }

    private function createSimpleReq($classes) {
        $simpleReqs = [];
        $lowest = $this->findLowestChilds($classes);
        foreach ($lowest as $l) {
            $childs = [];
            while (($l['type'] != "simpleReq" && $l['parent_id'] != '')) { //go up from lowest childs to simple req, if prent_id = its complex req
                array_push($childs, $l);
                $l = $this->getClass($classes, $l['parent_id']);
                if ($l['type'] == "simpleReq") {
                    if (!isset($simpleReqs[$l['id']])) {
                        $simpleReqs[$l['id']] = [];
                    }
                    foreach ($childs as $ch) {
                        array_push($simpleReqs[$l['id']], $ch);
                    }
                }
            }
        }
        $this->simpleReqs = $simpleReqs;
        //print_r($this->simpleReqs);
    }

    private function getClass($classes, $id) {
        foreach ($classes as $c) {
            if ($c['id'] == $id) {
                return $c;
            }
        }
    }

    private function isInArray($rels, $id) {
        foreach ($rels as $r) {
            
        }
    }

    private function findLowestChilds($classes) {
        $this->classRels = \App\Classes_rel_model::All(); //this can be problem!
        $childs = [];
        foreach ($classes as $c) {
            $good = true;
            foreach ($this->classRels as $r) {
                if ($r['parent_id'] == $c['id']) {
                    $good = false;
                    break;
                }
            }
            if ($good) {
                array_push($childs, $c);
            }
        }
        return $childs;
    }

}
