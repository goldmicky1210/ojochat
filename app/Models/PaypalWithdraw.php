<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaypalWithdraw  extends Model
{
    protected $fillable = [
        'withdraw_id',
        'paypal_email',
        // 'paypal_transaction_id',
    ];

    public function withdraw()
    {
        return $this->belongsTo(Withdraw::class);
    }

}
