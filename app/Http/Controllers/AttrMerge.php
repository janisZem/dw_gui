<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class AttrMerge extends Controller {

    public function merge($param) {
        $p = 'name';
        $res = DB::connection('neo4j')->select('MATCH (n:class { title: \'' . $p . '\' })-[:hasAttr]-(neighbors) RETURN neighbors');
        print_r($res);
        //paskatīties vai atrībūta klasei ir relācija
        //
        //noskaidrot katra atribūta ontoloģijas klasi
        //ja atribūts nav iekš hierrjijas un to klases sakrīt apbienot vienā elementā
        
    }

}
