<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GuiController extends Controller {

    public function index() {
        $themses = \App\Themes_model::all();
        $schemas = \App\Schema_model::where('status', '01')->get();
        $bp = \App\Business_processes_model::all();
        $st = \App\Stateholder_model::all();
        //print_r($schemas);
        $data['themses'] = [];
        $data['schemas'] = [];
        $data['bp'] = [];
        $data['st'] = [];
        foreach ($themses as $t) {
            array_push($data['themses'], ['id' => $t['id'], 'name' => $t['name']]);
        }
        foreach ($schemas as $s) {
            array_push($data['schemas'], ['id' => $s['id'], 'title' => $s['title'] . ' [' . $s['created_at'] . ']']);
        }
        foreach ($bp as $b) {
            array_push($data['bp'], ['id' => $b['id'], 'name' => $b['title']]);
        }
        foreach ($st as $s) {
            array_push($data['st'], ['id' => $s['id'], 'name' => $s['title']]);
        }
        return view('index', $data);
    }

}
