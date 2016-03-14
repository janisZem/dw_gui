<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateholders extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('stateholders', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('stateholders', function (Blueprint $table) {
            Schema::drop('stateholders');
        });
    }

}
