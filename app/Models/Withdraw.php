<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdraw extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paypalWithdraw()
    {
        return $this->hasOne(PaypalWithdraw::class);
    }

    public function debitCardWithdraw()
    {
        return $this->hasOne(DebitCardWithdraw::class);
    }

}
