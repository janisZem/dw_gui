<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

class GenerateController extends Controller {

    public function index() {
        $data['schemas'] = \App\Schema_model::where('status', '01')->get();
        return view('generate', $data);
    }

    public function generateSchema(Request $request) {
        $data = $request->all();
        $classes = \App\Class_model::where('schema_id', $data['schema_name'])
                ->get();
        $viewData['modelClasses'] = $this->createJson($classes);
        return view('schema', $viewData);
    }

    private function createJson($classes) {
        $mClasses = [];
        $this->createMeasures($classes, $mClasses); //mClasses change by reference
        $this->createDimensions($classes, $mClasses); //mClasses change by reference        
        return $mClasses;
    }

    private function createMeasures($classes, &$mClasses) {
        foreach ($classes as $c) {
            if ($c['type'] == 'quanData') {
                array_push($mClasses, ['key' => 'm_' . $c['value'],
                    'items' => [array('name' => $c['value'] . "_id", 'iskey' => true, 'figure' => "Decision", 'color' => 'yellowgrad')]]);
            }
        }
        return $mClasses;
    }

    private function createDimensions($classes, &$mClasses) {
        foreach ($classes as $c) {
            if ($c['type'] == 'qualData') {
                array_push($mClasses, ['key' => 'a_' . $c['value'],
                    'items' => []]);
                $this->createRel($c, $classes);
            }
        }
        return $mClasses;
    }

    private function createRel($c, $classes) {
        $results = DB::select('select * from classes_rels');
   
        foreach ($classes as $class) {
          
        }
    }

}
