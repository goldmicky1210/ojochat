<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = ['slot_id','action','slot','slot','pon','onu','login_name','ip','created_by','updated_by','created_at','updated_at'];
}
