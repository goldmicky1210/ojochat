<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDescriptionAndFeeTypeGroup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->string('description')->default('')->after('state');
            $table->integer('fee_type')->default(0)->after('description');
            $table->integer('fee_value')->default(0)->after('fee_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('fee_type');
            $table->dropColumn('fee_value');
        });
    }
}
