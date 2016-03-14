<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessProcessesRels extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('business_processes_rels', function (Blueprint $table) {
            $table->integer('req_id')->unsigned();
            $table->integer('bp_id')->unsigned();
        });
        Schema::table('business_processes_rels', function($table) {
            $table->foreign('req_id')->references('id')->on('reqs');
            $table->foreign('bp_id')->references('id')->on('business_processes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('business_processes_rels', function (Blueprint $table) {
            Schema::drop('stateholders_rels');
        });
    }

}
