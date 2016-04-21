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
        $data['themes'] = \App\Themes_model::all();
        return view('generate', $data);
    }

    public function generateSchema(Request $request) {
        $data = $request->all();

        $sql = '      SELECT c.* '
                . '        , cl.parent_id '
                . '     FROM classes c '
                . 'LEFT JOIN classes_rels cl ON c.id = cl.child_id '
                . '    WHERE c.theme_id = :id';
        $classes = DB::select($sql, ['id' => $data['theme_name']]);
        $json = $this->createJson($classes);
        $viewData['modelClasses'] = $json['classes'];
        $viewData['rels'] = $json['rels'];
        return view('schema', $viewData);
    }

    private function createJson($classes) {
        $mClasses = [];
        $rels = [];
        //fill mClasses with measures
        $this->createMeasures($classes, $mClasses); //mClasses change by reference
        //fill mClasses with dimesions and rels
        $this->createDimensions($classes, $mClasses, $rels); //mClasses, rels change by reference 

        $this->connectMeasures($rels, $mClasses);
        $data['classes'] = $mClasses;
        $data['rels'] = $rels;
        return $data;
    }

    private function createMeasures($classes, &$mClasses) {
        foreach ($classes as $c) {
            if ($c['type'] == 'quanData') {
                if (!$this->inArray('m_' . $c['value'], $mClasses)) {
                    array_push($mClasses, ['key' => 'm_' . $c['value'],
                        'text' => "m_" . $c['value']]);
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
                        'text' => "a_" . $c['value']]);
                }
                $this->createRel($c, $rels);
            }
        }
        return $mClasses;
    }

    private function createRel($c, &$rels) {
        $measures = $this->findMeasure($c);
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

    ///////////measure connection selecation//////
    private function connectMeasures(&$rels, &$classes) {
//        /print_r($classes);
        $measures = [];
        foreach ($classes as $c) {
            if ($c['key'][0] == 'm') {
                $class_rels = [];
                foreach ($rels as $r) {
                    if ($r['to'] == $c['key']) {
                        array_push($class_rels, $r);
                    }
                }
                array_push($measures, ['key' => $c['key'], 'rels' => $class_rels]);
            }
        }

        foreach ($measures as $m1) {
            foreach ($measures as $m2) {
                if ($this->checkRelEquality($m1['rels'], $m2['rels']) && $m1 != $m2) {
                    if (array_search($m2, $measures)) {
                        if ($this->connectMeasuresAttr($classes, $m1, $m2, $measures)) {
                            break;
                        }
                    }
                }
            }
        }
    }

    private function checkRelEquality($a1, $a2) {
        foreach ($a1 as $b1) {
            $good = 0;
            foreach ($a2 as $b2) {
                if ($b1['from'] == $b2['from']) {
                    $good = 1;
                }
            }
            if (!$good) {
                return false;
            }
        }
        return true;
    }

    private function connectMeasuresAttr(&$classes, $m1, $m2, &$measures) {
        foreach ($classes as $key => $c) {
            if ($c['key'] == $m1['key']) {
                $classes[$key]['text'] .= '\\n' . $m2['key'];
            }
        }
        foreach ($classes as $key => $elem) {
            if ($elem['key'] == $m2['key']) {
                unset($classes[$key]);
                unset($measures[array_search($m2, $measures)]);
                return true;
            }
        }
    }

}
