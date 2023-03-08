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
use App\Models\AttachFile;
use App\Models\Follow;
use App\Models\Rate;


class ProfileController extends Controller
{
    public function followUser(Request $request) {
        $userId = Auth::id();
        $followId = $request->input('followId');
        $row = Follow::where('user_id', $userId)->where('follow_id', $followId)->first();
        if (is_null($row)) {
            $newFollow = new Follow;
            $newFollow->user_id = $userId;
            $newFollow->follow_id = $followId;
            $newFollow->save();
            $result = 'follow';
        } else {
            Follow::where('user_id', $userId)->where('follow_id', $followId)->delete();
            $result = 'unfollow';
        }
        return array('state' => 'true', 'result' => $result);
    }

    public function getFollowData(Request $request) {
        $userId = $request->input('userId');
        $follows = Follow::where('follow_id', $userId)->get('user_id');
        $followings = Follow::where('user_id', $userId)->get('follow_id');
        return array('state' => 'true', 'follows' => $follows, 'followings' => $followings);
    }
    public function isFollow(Request $request) {
        $userId = Auth::id();
        $followId = $request->input('userId');
        $result = Follow::where('user_id', $userId)->where('follow_id', $followId)->first();
        if (is_null($result)) {
            return array('state' => 'true', 'result' => 0);
        }
        return array('state' => 'true', 'result' => 1);
    }

    public function getFollowList(Request $request)
    {
        $id = Auth::id();
        $followings = Follow::where('follow_id', $id)->get('user_id');
        $contactList = User::whereIn('id', $followings)->orderBy('username', 'asc')->get();
        $contactList = $contactList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return $contactList;
    }


}