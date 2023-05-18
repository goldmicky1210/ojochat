<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaypalWithdrawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paypal_withdraws', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('withdraw_id');
            $table->string('paypal_email');
            $table->string('paypal_transaction_id')->nullable();
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
        Schema::dropIfExists('paypal_withdraws');
    }
}
