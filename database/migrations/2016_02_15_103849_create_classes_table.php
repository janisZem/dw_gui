<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClassesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('classes', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('type', '255'); //cfg id
            $table->string('name', '255'); //cfg name
            $table->string('html_id', '255'); //javasript generated id
            $table->string('value', '255')->nullable(); //choosen value
            $table->integer('schema_id')->unsigned();
        });
        Schema::table('classes', function($table) {
            $table->foreign('schema_id')->references('id')->on('schemas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('classes');
    }

}
