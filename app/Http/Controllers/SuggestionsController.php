<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Log;

class SuggestionsController extends Controller {

    public function getSuggestions(Request $request, $call = 0) {
        if ($request['schema'] == 'undefined' && $request['theme'] == 'undefined') {
            $elems = \App\Class_model::where('value', 'like', "%" . $request['keyword'] . "%")->distinct()->get();
        } else if ($request['schema'] != 'undefined' && $request['theme'] == 'undefined') {
            $elems = \App\Class_model::where('value', 'like', "%" . $request['keyword'] . "%")
                            ->where('schema_id', $request['schema'])->distinct()->get();
        } else if ($request['theme'] != 'undefined' && $request['schema'] == 'undefined') {
            $elems = \App\Class_model::where('value', 'like', "%" . $request['keyword'] . "%")
                            ->where('theme_id', $request['theme'])->distinct()->get();
        } else {
            $elems = \App\Class_model::where('value', 'like', "%" . $request['keyword'] . "%")
                            ->where('theme_id', $request['theme'])
                            ->where('schema_id', $request['schema'])->distinct()->get();
        }
        if (count($elems) == 0) { //if no elems found call semantic search
            $elems = [];
            $semanticKeyWord = $this->semanticSearch($request);
            $request['keyword'] = $semanticKeyWord;
            if ($request['keyword'] && $call == 0) {
                $call = $this->getSuggestions($request, 1);
            }
            if ($call && count($elems) == 0) {
                array_push($elems, ['id' => -1, 'value' => $semanticKeyWord]);
                return $elems;
            }
        }
        return $elems;
    }

    private function semanticSearch(Request $request) {
        $res = DB::connection('neo4j')->select('MATCH (n:class { title: \'' . $request['keyword'] . '\' })-[:hasSyn]-(neighbors) RETURN neighbors');
        if (isset($res[0])) {
            //check if property title exist
            $name = DB::connection('neo4j')->select('MATCH (n:class { title: \'' . $request['keyword'] . '\' })-[:hasSyn]-(neighbors) RETURN neighbors')[0][0]->title;
            return $name;
        } else {
            return 0;
        }
    }

}
