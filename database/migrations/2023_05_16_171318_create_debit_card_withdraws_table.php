<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDebitCardWithdrawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('debit_card_withdraws', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('withdraw_id');
            $table->string('card_number');
            $table->string('card_holder_name');
            $table->unsignedTinyInteger('card_expiry_month');
            $table->unsignedSmallInteger('card_expiry_year');
            $table->string('card_cvv');
            $table->timestamps();
        
            $table->foreign('withdraw_id')->references('id')->on('withdraws')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('debit_card_withdraws');
    }
}
