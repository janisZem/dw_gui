<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GenerateController extends Controller {

    public function index() {

        $data['schemas'] = \App\Schema_model::where('status', '01')->get();

        return view('generate', $data);
    }
}