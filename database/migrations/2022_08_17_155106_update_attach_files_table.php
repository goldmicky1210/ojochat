<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAttachFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attach_files', function (Blueprint $table) {
            $table->dropColumn(['table_kind', 'table_id', 'body', 'flag', 'filename', 'created_by', 'updated_by']);
            $table->string('file_name')->default('')->after('id');
            $table->string('file_type')->default('')->after('file_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attach_files', function (Blueprint $table) {
            $table->id();
            $table->integer('table_kind')->default(0);
            $table->integer('table_id');
            $table->string('filename')->default('');
            $table->string('body')->default('');
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
            $table->integer('flag')->default(0)->before('created_by');

        });
    }
}
