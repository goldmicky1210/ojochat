<?php

namespace App\Http\Controllers;

use App\Mail\TestEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TestEmailController extends Controller
{
    public function sendEmail()
    {
        $reveiverEmailAddress = "goldmicky1210@gmail.com";
        Mail::to($reveiverEmailAddress)->send(new TestEmail);
        if (Mail::failures() != 0) {
            return "Email has been set successfully.";
        }
        return "There was some an error sending this email.";
    }
}
