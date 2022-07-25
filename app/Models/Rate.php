<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $table = 'rates';
    protected $primaryKey = 'id';

    public function getRate($messageId) {
        
    }
}
