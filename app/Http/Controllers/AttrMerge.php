<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class AttrMerge extends Controller {

    public function merge(&$rels, &$mClasses) {
        foreach ($mClasses as $key => $c) {
            if ($c['key'][0] == 'a') {
                $hier_array = $this->find_hierarchies(substr($c['text'], 2));
                if (count($hier_array) > 0) {
                    $this->create_hierarchies($hier_array, $rels, $mClasses);
                } else {
                    $parent = $this->find_parents(substr($c['text'], 2));
                    $mClasses[$key]['parent'] = $parent;
                }
            }
        }
        $this->merge_attrrs($rels, $mClasses);
    }

    private function merge_attrrs(&$rels, &$mClasses) {
        $parents_array = [];
        foreach ($mClasses as $c) {
            if ($c['key'][0] == 'a' && isset($c['parent'])) {
                if (!array_key_exists($c['parent'], $parents_array)) {
                    $parents_array[$c['parent']][] = substr($c['text'], 2);
                } else {
                    array_push($parents_array[$c['parent']], substr($c['text'], 2));
                }
            }
        }

        foreach ($parents_array as $p) {
            if (count($p) > 1) {
                foreach ($mClasses as $key => $c) {
                    if ($c['text'] == 'a_' . $p[0]) {
                        for ($i = 1; $i < count($p); $i++) {
                            $mClasses[$key]['text'] .= ' \\n a_' . $p[$i];
                            $this->delete_class($rels, $mClasses, $p[$i]);
                        }
                    }
                }
            }
        }
    }

    private function delete_class(&$rels, &$mClasses, $class) {
        foreach ($mClasses as $key => $c) {
            if ($mClasses[$key]['text'] == 'a_' . $class) {
                unset($mClasses[$key]);
            }
        }
        foreach($rels as $key => $r){
            if($r['to'] == 'a_' .$class){
                unset($rels[$key]);
            }
        }
    }

    private function find_parents($attr) {
        $res2 = DB::connection('neo4j')->select('MATCH (n:attr { title: \'' . $attr . '\' })-[:hasAttr]-(neighbors) RETURN neighbors');
        if (isset($res2[0])) {
            return $res2[0][0]->title;
        }
    }

    private function create_hierarchies($hier_array, &$rels, &$mClasses) {
        foreach ($hier_array as $h) {
            array_push($mClasses, ['key' => 'a_' . $h['text'],
                'text' => "a_" . $h['text']]);
            array_push($rels, ['from' => "a_" . $h['parent'], 'to' => "a_" . $h['text'], 'text' => "", 'toText' => ""]);
        }
    }

    private function find_hierarchies($attr) {
        $res2 = DB::connection('neo4j')->select('MATCH (n:class { title: \'' . $attr . '\' })-[:hasRel]->(neighbors) RETURN neighbors');
        $hier_rels = [];
        if (isset($res2[0])) {
            array_push($hier_rels, ['text' => $res2[0][0]->title, 'parent' => $attr]);
            while (isset($res2[0])) {
                $parent = $res2[0][0]->title;
                $res2 = DB::connection('neo4j')->select('MATCH (n:class { title: \'' . $res2[0][0]->title . '\' })-[:hasRel]->(neighbors) RETURN neighbors');
                if (isset($res2[0])) {
                    //array_push($hier_rels, ['text' => $res2[0][0]->title, 'parent' => $parent]);
                }
            }
        }
        return $hier_rels;
    }

}
