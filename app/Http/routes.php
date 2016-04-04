<?php

/*
  |--------------------------------------------------------------------------
  | Routes File
  |--------------------------------------------------------------------------
  |
  | Here is where you will register all of the routes in an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */




Route::post('create_schema', 'SchemaController@createSchema');
Route::post('process', 'GenerateController@generateSchema');
Route::post('get_suggestions', 'SuggestionsController@getSuggestions');

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | This route group applies the "web" middleware group to every route
  | it contains. The "web" middleware group is defined in your HTTP
  | kernel and includes session state, CSRF protection, and more.
  |
 */

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'GuiController@index');
    Route::get('generate', 'GenerateController@index');
    Route::get('/schema', function() {
        return view('schema');
    });
});

