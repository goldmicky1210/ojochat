<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DebitCardWithdraw extends Model
{
    protected $fillable = [
        'withdraw_id',
        'card_number',
        'card_holder_name',
        'card_expiry_month',
        'card_expiry_year',
        'card_cvv',
    ];

    public function withdraw()
    {
        return $this->belongsTo(Withdraw::class);
    }

}
