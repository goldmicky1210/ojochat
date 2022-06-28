<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOriginalStatePhotoGalleries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('photo_galleries', function (Blueprint $table) {
            $table->binary('original_thumb')->after('photo')->nullable();
            $table->binary('original_content')->after('content')->nullable();

        });
        DB::statement('ALTER TABLE `photo_galleries` CHANGE `original_thumb` `original_thumb` MEDIUMBLOB NULL DEFAULT NULL;');
        DB::statement('ALTER TABLE `photo_galleries` CHANGE `original_content` `original_content` MEDIUMBLOB NULL DEFAULT NULL;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('photo_galleries', function (Blueprint $table) {
            $table->dropColumn('original_thumb');
            $table->dropColumn('original_content');
        });
    }
}
