<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateholdersRels extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('stateholders_rels', function (Blueprint $table) {
            $table->integer('req_id')->unsigned();
            $table->integer('stateholder_id')->unsigned();
        });
        Schema::table('stateholders_rels', function($table) {
            $table->foreign('req_id')->references('id')->on('reqs');
            $table->foreign('stateholder_id')->references('id')->on('stateholders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('stateholders_rels');
    }

}
