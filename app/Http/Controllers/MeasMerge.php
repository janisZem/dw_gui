<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class MeasMerge extends Controller {

    public function merge(&$rels, &$classes) {
        $measures = [];
        foreach ($classes as $c) {
            if ($c['key'][0] == 'm') {
                $class_rels = [];
                foreach ($rels as $r) {
                    if ($r['to'] == $c['key']) {
                        array_push($class_rels, $r);
                    }
                }
                //all measures with measure rels
                array_push($measures, ['key' => $c['key'], 'rels' => $class_rels]);
            }
        }
        //for each measure check, if is posiblile merge mesures
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

    //check measures Equality, measures are equal if all rells are similar (attributes are same)
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

    //merge measuares, 1. merge text 2. delete similar measure from $classes and $measure variables
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
