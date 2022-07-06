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

class GroupController extends Controller
{
    public function inviteGroup(Request $request) {
        $groupId = $request->input('groupId');
        return $groupId;
        $lastMessage = Message::where('group_id', $groupId)->orderBy('created_at', 'desc')->first();
        return array('state' => 'true', 'data' => $lastMessage);
    }

    public function getGroupInfo(Request $request) {
        $groupId = $request->input('groupId');
        $result = Group::where('id', $groupId)->first();
        if ($result) {
            return array('state' => 'true', 'data' => $result);
        } else {
            return array('state' => 'false');
        }
    }
}