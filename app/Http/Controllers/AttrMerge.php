<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class AttrMerge extends Controller {

    public function merge(&$rels, &$mClasses) {
        $p = 'name';

        foreach ($mClasses as $c) {
            if ($c['key'][0] == 'a') {
                $hier_array = $this->find_hierarchies(substr($c['text'], 2));
                $this->create_hierarchies($hier_array, $rels, $mClasses);
            }
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
                    array_push($hier_rels, ['text' => $res2[0][0]->title, 'parent' => $parent]);
                }
            }
        }
        return $hier_rels;
    }

}
