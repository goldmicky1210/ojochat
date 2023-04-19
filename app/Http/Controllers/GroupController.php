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
use App\Models\Block;

class GroupController extends Controller
{
    public function inviteGroup(Request $request) {
        $groupId = $request->input('groupId');
        return $groupId;
        $lastMessage = Message::where('group_id', $groupId)->orderBy('created_at', 'desc')->first();
        return array('state' => 'true', 'data' => $lastMessage);
    }

    public function getGroupInfo(Request $request) {
        $userId = Auth::id();
        $groupId = $request->input('groupId');
        $result = Group::where('id', $groupId)->first();
        // $blockState = Block::where('user_id', $userId)->where('group_id', $groupId)->first();
        if ($result) {
            // return array('state' => 'true', 'data' => $result, 'blockState'=> $blockState);
            return array('state' => 'true', 'data' => $result);
        } else {
            return array('state' => 'false');
        }
    }

    public function getContactorInfoByGroupId(Request $request) {
        $userId = $request->input('userId');
        $groupId = $request->input('groupId');
        $contactorId = UsersGroup::where('group_id', $groupId)->where('user_id','!=', $userId)->first()['user_id'];
        if ($contactorId) {
            return array('state' => 'true', 'id' => $contactorId);
        } else {
            return array('state' => 'false');
        }
    }

    public function getDirectGroupId(Request $request) {
        $id = Auth::id();
        $userId = $request->input('userId');
        $flag = $request->input('flag');
        $directGroupId = Group::join('users_groups', 'groups.id', '=', 'users_groups.group_id')
        ->whereRaw('user_id='.$id.' OR user_id='.$userId)
        ->where('type', 1)
        ->groupBy('group_id')
        ->havingRaw('count(group_id) = ?', [2])
        ->first('group_id');
        if ($directGroupId) {
            if (!$flag) {
                Group::where('id', $directGroupId['group_id'])->update(['deleted' => 0]);
                // Message::where('group_id', $directGroupId['group_id'])->update(['deleted' => 0]);
            }
            return array('state' => 'true', 'groupId' => $directGroupId['group_id']);
        } else {
            return array('state' => 'false');
        }
    }
    
}