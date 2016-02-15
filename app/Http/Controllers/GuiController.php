<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GuiController extends Controller {

    public function index() {
        $themses = \App\Themes_model::all();
        $schemas = \App\Schema_model::where('status', '01')->get();
        //print_r($schemas);
        $data['themses'] = [];
        $data['schemas'] = [];
        foreach ($themses as $t) {
            array_push($data['themses'], ['id' => $t['id'], 'name' => $t['name']]);
        }
        foreach ($schemas as $s) {
            array_push($data['schemas'], ['id' => $s['id'], 'title' => $s['title'] . ' [' . $s['created_at'] . ']']);
        }
        return view('index', $data);
    }

}
