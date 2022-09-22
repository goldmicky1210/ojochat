<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Auth;

use App\Models\Country;
use App\Models\CountryPhoneCode;
use App\Models\State;
use App\Models\City;
use App\Models\User;
use App\Models\Message;
use App\Models\Contact;
use App\Models\PhotoRequest;
use App\Models\PhotoGallery;
use App\Models\Rating;
use App\Models\PaymentHistory;
use App\Models\Cast;
use App\Models\Group;
use App\Models\UsersGroup;

class MessageController extends Controller
{
    public function getLastMessage(Request $request) {
        $groupId = $request->input('groupId');
        $lastMessage = Message::where('group_id', $groupId)->orderBy('created_at', 'desc')->first();
        return array('state' => 'true', 'data' => $lastMessage);
    }

    public function getCastData(Request $request) {
        $userId = Auth::id();
        $castData = Cast::where('sender', $userId)->groupBy('cast_title')->orderByRaw('max(`created_at`) desc')->get();
        if (count($castData)) {
            return array('state'=>'true', 'castData'=>$castData);
        } else {
            return array('state' => 'false');
        }
    }


    public function deleteChatThread(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipient');
        $res = Message::whereRaw("sender = ".$userId." AND recipient = ".$recipients)->orWhereRaw("sender = ".$recipients." AND recipient = ".$userId)->delete();
        if ($res) {
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

    public function deleteCastThread(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipients');
        $castTitle = $request->input('castTitle');
        $res = Cast::where("sender", $userId)->where("cast_title", $castTitle)->delete();
        if ($res) {
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

    public function deleteThread(Request $request) {
        $userId = Auth::id();
        $groupId = $request->input('groupId');
        $res = Group::where("id", $groupId)->delete();
        if ($res) {
            Message::where("group_id", $groupId)->delete();
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

    public function getMessgageContentById(Request $request) {
        $messageId = $request->input('messageId');
        $messageKind = $request->input('messageKind');
        $messageContent = Message::where('id', $messageId)->first()['content'];
        if ($messageKind == 2 || $messageKind == 4) {
            $messageContent = PhotoGallery::where('id', $messageContent)->first()['photo'];
        }
        if ($messageContent) {
            return array('state'=>'true', 'data'=>$messageContent);
        } else {
            return array('state' => 'false');
        }
    }

}