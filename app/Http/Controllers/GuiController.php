<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GuiController extends Controller {

    public function index() {
        $themses = \App\Themes_model::all();
        //print_r($themses[0]['name']);
        $data['themses'] = [];
        foreach ($themses as $t) {
            array_push($data['themses'], ['id' => $t['id'], 'name' => $t['name']]);
        }

        return view('index', $data);
    }

}
