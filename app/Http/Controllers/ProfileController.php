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
use App\Models\Block;


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

    public function getMoralisFilter(Request $request)
    {
        $time = date('Y-m-d H:i:s');
        // Storage::put($time.'.txt', $request);
        $myfile = fopen('keyfile.txt', 'w');
        fwrite($myfile, $_GET);
        fclose($myfile);

        return array(
            'state' => true,
            'message' => $request
        );
    }

    public function setProfileSetting(Request $request) {
        $state = $request->input('state');
        $fieldName = $request->input('fieldName');
        if ($fieldName == 'notification') {
            $groupId = $request->input('groupId');
            $group = Group::find($groupId);
            $group[$fieldName] = $state;
            $group->updated_at = date('Y-m-d H:i:s');
            $group->save();
            return array(
                'message' => 'notification Successfully',
                'status' => true,
                'data' => $group
            );
        } else if ($fieldName == 'block') {
            $blockId = $request->input('blockId');
            $userId = Auth::id();
            if ($state == 1) {
                $blockState = Block::where('user_id', $userId)->where('block_id', $blockId)->first();
                if (!$blockState) {
                    Block::create([
                        'user_id' => $userId,
                        'block_id' => $blockId
                    ]);
                }
                return array(
                    'message' => 'Block Successfully',
                    'status' => true,
                );
            } else {
                Block::where('user_id', $userId)->where('block_id', $blockId)->delete();
                return array(
                    'message' => 'Remove Block Successfully',
                    'status' => true,
                );
            }
        }
    }
}