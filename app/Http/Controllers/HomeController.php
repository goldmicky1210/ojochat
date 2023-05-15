<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Auth;

use App\Models\Country;
use App\Models\State;
use App\Models\City;
use App\Models\User;
use App\Models\Message;
use App\Models\Contact;
use App\Models\PhotoRequest;
use App\Models\PhotoGallery;
use App\Models\Rating;
use App\Models\Rate;
use App\Models\PaymentHistory;
use App\Models\AttachFile;
use App\Models\Follow;
use App\Events\NewMessage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;


use App\Models\Group;
use App\Models\UsersGroup;
use App\Models\Block;
use Illuminate\Support\Collection;

class HomeController extends Controller
{
    public function __construct()
    {
        if (!Auth::check()) return view('frontend.auth.login', ['page_title' => 'Login']);
    }
    public function index(Request $request)
    {
        return view('frontend.home',[
//            'announcements'=>$anns
        ]);
    }
    
    public function getRecentChatUsers(Request $request) {
        $id = Auth::id();
        $type = $request->input('type');
        $groupArrs = User::join('users_groups', 'users.id', '=', 'users_groups.user_id')
        ->join('groups', 'users_groups.group_id', '=', 'groups.id')
        // ->join('blocks', 'users_groups.user_id', '=', 'blocks.user_id')
        ->where('users.id', $id)
        ->where('groups.type', $type)
        ->where('groups.deleted', 0)
        ->orderBy('groups.created_at', 'desc')
        ->get('groups.*')->toArray();
        if (count($groupArrs)) {
            foreach($groupArrs as $index => $group) {
                $groupArrs[$index]['users'] = $this->getGroupUsers($group['id']);
                $groupArrs[$index]['lastMessage'] = Message::where('group_id', $group['id'])->where('deleted', 0)->orderBy('created_at', 'desc')->first();
                $groupArrs[$index]['unreadCount'] = Message::where('group_id', $group['id'])->where('sender', '!=', $id)->where('deleted', 0)->where('state', 1)->orderBy('created_at', 'desc')->count();
            }
            if ($type == 3) {
                $groupArrs = array_filter($groupArrs, function ($item) {
                    return $item["owner"] == Auth::id();
                });
            }
            usort($groupArrs, function ($a, $b) {
                $val1 = $a['lastMessage'] ? strtotime($a['lastMessage']['created_at']) : strtotime($a['created_at']);
                $val2 = $b['lastMessage'] ? strtotime($b['lastMessage']['created_at']) : strtotime($b['created_at']);
                return $val1 - $val2;
            });
            return array('state' => 'true', 'data' => $groupArrs);
        } else {
            return array('state' => 'false');
        }
    }
    
    public function getGroupUsers($groupId) {
        $groupUsers = UsersGroup::where('group_id', $groupId)->orderBy('created_at')->get('user_id');
        // $groupUsers = UsersGroup::where('group_id', $groupId)->where('status', 2)->orderBy('created_at')->get('user_id');
        $result = $groupUsers->map(function($item) {
            return $item['user_id'];
        });
        return $result;
    }

    public function getUsersListByGroupId(Request $request) {
        $groupId = $request->input('groupId');
        $groupUsers = UsersGroup::where('group_id', $groupId)->orderBy('created_at')->get('user_id');
        $result = $groupUsers->map(function($item) {
            return $item['user_id'];
        });
        return array('state' => 'true', 'data' => $result);;
    }

    public function getRamdomPic($dir = 'images/backgrounds') {
        $files = glob($dir.'/*.*');
        $file = array_rand($files);
        return $files[$file];
    }
    public function getCurrentGroupChatContent(Request $request) {
        $id = Auth::id();
        $groupId = $request->input('currentGroupId');
        $messageData = Message::where("group_id", $groupId)->where('deleted', 0)->orderBy('created_at', 'desc')->limit(15)->get();
        $messages = $messageData->map(function($item) {
            $rate = Rate::where('message_id', $item['id'])->avg('rate');
            $item['rate'] = $rate;
            if ($item['kind'] == 0 || $item['kind'] == 10) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            }
            if ($item['kind'] == 2) {
                $temp = PhotoGallery::where('id', $item['content'])->get();
                $item['photoId'] = $temp[0]['id'];
                $item['edited'] = $temp[0]['edited'];
                $item['forwardList'] = $temp[0]['forward_list'];
                $payBlurState = array_search(Auth::id(), explode(',', $temp[0]['blur_payers_list']), false);
                if ($payBlurState === false) {
                    // $item['content'] = $temp[0]['original_thumb'];
                    $item['payBlurState'] = false;
                    $item['content'] = $temp[0]['photo'];
                } else {
                    $item['content'] = $temp[0]['photo'];
                }
                return $item;
            }
            if ($item['kind'] == 3) {
                $temp = Group::where('id', $item['content'])->get();
                if (count($temp)) {
                    $item['inviteGroupTitle'] = $temp[0]['title'];
                    $item['inviteGroupFeeType'] = $temp[0]['fee_type'];
                    $item['inviteGroupFeeValue'] = $temp[0]['fee_value'];
                }
                return $item;
            }
            if ($item['kind'] == 4) {
                $temp = AttachFile::where('id', $item['content'])->get();
                $item['fileName'] = $temp[0]['file_name'];
                $item['fileType'] = $temp[0]['file_type'];
                $item['path'] = $temp[0]['path'];
                return $item;
            }
        });
        $file = $this->getRamdomPic();
        $groupInfo = Group::where('id', $groupId)->first();
        $userStatus = UsersGroup::where('group_id', $groupId)->where('user_id', $id)->first('status');
        
        return array('state'=>'true','messageData'=>$messages, 'groupInfo'=>$groupInfo, 'userStatus'=>$userStatus, 'backgroundImage'=>$file);
    }
    
    public function getRateData(Request $request) {
        $userId = $request->input('userId');
        $groupId = $request->input('groupId');
        if ($userId) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $userId)->get(['rate', 'kind']);
        } else if($groupId) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.group_id', $groupId)->get(['rate', 'kind']);
        }
        return array('state'=>'true', 'rateData'=>$rateData);
    }

    public function getGroupRateData(Request $request) {
        $userId = $request->input('groupId');
        $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.group_id', $groupId)->get(['rate', 'kind']);
        return array('state'=>'true', 'rateData'=>$rateData);
    }

    public function getSharedMedia(Request $request) {
        $userId = $request->input('userId');
        $groupId = $request->input('groupId');
        $sendData = array();
        $receiveData = array();
        $sendImageData = array();
        $receiveImageData = array();
        $belongGroup = array();
        if ($groupId == 'all') {
            $belongGroup = UsersGroup::join('groups', 'groups.id', '=', 'users_groups.group_id')->where('user_id', $userId)->get(['group_id', 'title', 'type']);
        } else if ($groupId != 'undefined') {
            $belongGroup = Group::where('id', $groupId)->get(['id as group_id', 'title', 'type']);
        }  
        foreach($belongGroup as $group) {
            $messageData = Message::where('kind', 2)->where('group_id', $group['group_id'])->orderBy('id', 'desc')->get(['sender', 'group_id', 'content']);
            foreach($messageData as $item) {
                $tempData = PhotoGallery::where('id', $item['content'])->first();
                if ($tempData) {
                    $item['id'] = $tempData['id'];
                    $item['photo'] = $tempData['photo'];
                    $item['original_thumb'] = $tempData['original_thumb'];
                    $item['title'] = $group['title'];
                    $item['type'] = $group['type'];
                    $item['created_at'] = $tempData['created_at'];
                    if ($item['sender'] == $userId) {
                        array_push($sendData, $item);
                    } else {
                        array_push($receiveData, $item);
                    }
                }
            }
            $imageData = Message::where('kind', 4)->where('group_id', $group['group_id'])->orderBy('id', 'desc')->get(['sender', 'group_id', 'content']);
            foreach($imageData as $item) {
                $tempData = AttachFile::where('id', $item['content'])->whereIn('file_type', ['png', 'jpg', 'jpeg'])->first();
                if ($tempData) {
                    $item['id'] = $tempData['id'];
                    $item['path'] = $tempData['path'];
                    $item['file_name'] = $group['file_name'];
                    $item['created_at'] = $tempData['created_at'];
                    if ($item['sender'] == $userId) {
                        array_push($sendImageData, $item);
                    } else {
                        array_push($receiveImageData, $item);
                    }
                }
            }
        }
        return array('state'=>'true', 'sendData'=>$sendData, 'receiveData'=> $receiveData, 'sendImageData'=>$sendImageData, 'receiveImageData'=> $receiveImageData);
    }

    public function showSavedBlinks(Request $request) {
        $userId = $request->input('userId');
        $blinkData = PhotoGallery::where('created_by', $userId)->orderBy('created_at')->get();
        return array('state'=>'true', 'data'=>$blinkData);
    }

    public function removeSavedBlink(Request $request) {
        $blinkId = $request->input('blinkId');
        $res = PhotoGallery::where("id", $blinkId)->delete();
        if ($res) {
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

    public function getRecentChatData(Request $request) {
        
    }

    public function getUsersList(Request $request) {
        $id = Auth::id();
        // $userList = User::where('id', '<>', $id)->get();
        $userList = User::orderBy('username', 'asc')->get();
        $userList = $userList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return array('state' => 'true', 'data' => $userList);
    }

    public function getUsersForList(Request $request) {
        $id = Auth::id();
        $lastUserName = $request->input('lastUserName');
        $searchStr = $request->input('searchStr');
        $randomFlag = $request->input('randomFlag');
        if ($randomFlag == 'false') {
            if ($searchStr) {
                if ($lastUserName) {
                    $userList = User::orderBy('username', 'asc')->where('id', '<>', $id)->where('username', '>', $lastUserName)->where('username', 'LIKE', '%'.$searchStr.'%')->limit(10)->get();
                } else {
                    $userList = User::orderBy('username', 'asc')->where('id', '<>', $id)->where('username', 'LIKE', '%'.$searchStr.'%')->limit(10)->get();
                }
            } else {
                if ($lastUserName) {
                    $userList = User::orderBy('username', 'asc')->where('id', '<>', $id)->where('username', '>', $lastUserName)->limit(10)->get();
                } else {
                    $userList = User::orderBy('username', 'asc')->where('id', '<>', $id)->limit(10)->get();
                }
            }
        } else {
            $userList = User::all()->random(10);
            // $userList = User::orderBy('username', 'asc')->where('id', '<>', $id)->where('username', '>', $lastUserName)->limit(10)->get();
        }
        
        $userList = $userList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return array('state' => 'true', 'data' => $userList);
    }

    public function addContactItem(Request $request)
    {
        $contactId=Auth::id();
        $userId = $request->input('userId');
        $result = Contact::where('user_id', $userId)->where('contact_id', $contactId)->update(['status' => 1]);
        return array('state' => $result);
    }

    public function removeContactRequest(Request $request)
    {
        $contactId = Auth::id();
        $userId = $request->input('userId');
        $result1 = Contact::where('user_id', $userId)->where('contact_id', $contactId)->delete();
        $result2 = Contact::where('user_id', $contactId)->where('contact_id', $userId)->delete();
        return array('state' => $result1 || $result2);
    }

    public function isContact(Request $request)
    {
        $id = Auth::id();
        $userId = $request->input('userId');
        $flag1 = Contact::where('user_id', $id)->where('contact_id', $userId)->where('status', 1)->first();
        $flag2 = Contact::where('user_id', $userId)->where('contact_id', $id)->where('status', 1)->first();
        $flag3 = Follow::where('user_id', $userId)->where('follow_id', $id)->first();

        if ($flag1 || $flag2 || $flag3) {
            return 1;
        }
        return 0;
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

    public function getContactList(Request $request)
    {
        $id = Auth::id();
        $contactIds1 = Contact::where('user_id', $id)->where('status', 1)->get('contact_id');
        $contactIds2 = Contact::where('contact_id', $id)->where('status', 1)->get('user_id');        
        $contactList = User::whereIn('id', $contactIds1)->orWhereIn('id', $contactIds2)->orderBy('username', 'asc')->get();
        $contactList = $contactList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return $contactList;
    }

    public function getAvailableUsers(Request $request)
    {
        $id = Auth::id();
        $list1 = Contact::where('user_id', $id)->where('status', 1)->get('contact_id');
        $list2 = Contact::where('contact_id', $id)->where('status', 1)->get('user_id');  
        $list3 = Follow::where('follow_id', $id)->get('user_id');
        $contactList = User::whereIn('id', $list1)->orWhereIn('id', $list2)->orWhereIn('id', $list3)->orderBy('username', 'asc')->get();
        $contactList = $contactList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return $contactList;
    }


    public function getPendingContactList(Request $request)
    {
        $id = Auth::id();
        $receiveRequests = Contact::where('contact_id', $id)->where('status', 0)->get('user_id');
        $sendRequests = Contact::where('user_id', $id)->where('status', 0)->get('contact_id');
        $receiveList = User::whereIn('id', $receiveRequests)->orderBy('username', 'asc')->get();
        $sendList = User::whereIn('id', $sendRequests)->orderBy('username', 'asc')->get();
        $receiveContactList = $receiveList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        $sendContactList = $sendList->map(function($item) {
            $rateData = Rate::join('messages', 'rates.message_id', '=', 'messages.id')->where('messages.sender', $item['id'])->get(['rate', 'kind']);
            $item['rateData'] = $rateData;
            return $item;
        });
        return array('receiveData' => $receiveContactList, 'sendData' => $sendContactList);
    }

    public function sendContactRequest(Request $request) {
        $userId = Auth::id();
        $contactId = $request->input('userId');
        $contact = Contact::where('user_id', $userId)->where('contact_id', $contactId)->first();
        if ($contact) {
            return array('message' => 'exist', 'data' => $contact);
        }

        $newContact = new Contact;
        $newContact->user_id = $userId;
        $newContact->contact_id = $contactId;
        $newContact->save();
        return array('message' => 'sent', 'data' => $newContact);
    }

    
    public function sendMessage(Request $request)
    {
        //$id = Auth::id();
	    /*$id =$request->input('id');
    	$user =  User::find($id);
        $contactId = $request->input('currentContactID');
        $content = $request->input('content');
        $newMessage = new Message;
        $newMessage->sender = $id;
        $newMessage->recipient = $contactId;
        $newMessage->content = $content;
        return array(
            'message' => 'Save Successfully',
            'insertion' => true,
        );*/
        return true;
	//broadcast(new NewMessage($user, $newMessage))->toOthers();
    }

    public function saveProfileInfo(Request $request)
    {
        $id = Auth::id();
        $username = $request->input('username');
        $location = $request->input('location');
        $description = $request->input('description');
        $this->validate($request, [
            'username' => 'required|max:15|min:3|regex:/^[a-zA-Z0-9._\$@?-]+$/',
            
        ], [
            'username.required' => 'The display name field is required.',
            'username.max' => 'The display name must be at least 3 characters long.',
            'username.max' => 'The display name may not be greater than 15 characters.',
            'username.regex' => 'Sorry, display name may only contain letters, numbers, hyphen, underscore, or period. Please try again.',
            'username.not_regex' => 'Sorry, that display name is not available. Please try again.',
        ]);
        $user = User::find($id);
        $user->username = $username;
        $user->location = $location;
        $user->description = $description;
        if ($request->file('avatar') != null) {
            $path = $request->file('avatar')->store('upload/avatar');
            $user->avatar = $path;
        }
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
    
    public function getUploadFileURL(Request $request)
    {
        $path = null;
        if ($request->file('avatar') != null) {
            $path = $request->file('avatar')->store('upload/avatar');
        }
        return array('state' => 'true', 'data' => $path);
    }

    public function getPhotoRequest(Request $request)
    {
        $id = Auth::id();
        $requestData = PhotoRequest::where("from", $id)->orWhere("to", $id)->orderBy('created_at', 'desc')->limit(100)->get();
        return array('state'=>'true', 'data'=>$requestData);
    }

    public function sendPhotoRequest(Request $request) 
    {
        $id = Auth::id();
        $to = $request->input('to');
        $title = $request->input('title');
        $description = $request->input('description');
        $price = $request->input('price');
        $type = $request->input('type');
        $request = new PhotoRequest;
        $request->from = $id;
        $request->to = $to;
        $request->title = $title;
        $request->description = $description;
        $request->price = $price;
        $request->type = $type;
        $request->save();
        return;
    }

    public function getPhotoData(Request $request)
    {
        $messageId = $request->input('id');
        $messageData = Message::where('id', $messageId)->get();
        if (count($messageData)) {
            $photoData = PhotoGallery::where('id', $messageData[0]['content'])->get();
            if (count($photoData)) {
                $photoData[0]['rate'] = Rate::where('message_id', $messageId)->avg('rate');
                $photoData[0]['messageId'] = $messageData[0]['id'];
                $photoData[0]['senderId'] = $messageData[0]['sender'];
                return array('state'=>'true', 'data'=>$photoData);
            }
            return array('state'=>'false', 'message'=>'no blink');
        }
        return array('state'=>'false', 'message'=>'no message');

    }

    public function getBlinkData(Request $request)
    {
        $blinkId = $request->input('blinkId');
        $blinkData = PhotoGallery::where('id', $blinkId)->get();
        if (count($blinkData)) {
            return array('state'=>'true', 'data'=>$blinkData);
        }
        return array('state'=>'false', 'message'=>'no blink');

    }
    public function setContentRate(Request $request)
    {
        $messageId = $request->input('messageId');
        $rate = $request->input('rate');
        $message = Message::find($messageId);
        $message->rate = $rate;
        $message->updated_at = date('Y-m-d H:i:s');
        $message->save();
        return array(
            'state' => 'true'
        );
    }
    public function getPaymentHistories(Request $request)
    {
        $userId = $request->input('userId');
        $data = PaymentHistory::where("sender", $userId)->orWhere("recipient", $userId)->orderBy('created_at', 'desc')->get();
        $data = $data->map(function($item) {
            if ($item['type'] == 0) {
                // Blink
                $message = Message::where('id', $item['refer_id'])->get();
                if (count($message)) {
                    $temp = PhotoGallery::where('id', $message[0]['content'])->get();
                    if (count($temp)) {
                        $item['thumb'] = $temp[0]['original_thumb'];
                        $item['blinkOwner'] = $temp[0]['owner'];
                        $item['lastSender'] = $message[0]['sender'];
                    }
                }
            } else {
                // Group fee
                $temp = Group::where('id', $item['refer_id'])->get();
                if (count($temp)) {
                    $item['group_title'] = $temp[0]['title'];
                }
            }
            return $item;
        });
        return array(
            'state' => 'true',
            'data' => $data
        );
    }

    public function loadMoreMessages(Request $request) {
        $id = Auth::id();
        $groupId = $request->input('globalGroupId');
        $firstMessageId = $request->input('firstMessageId');
        
        // $messageData = Message::whereRaw("sender = ".$id." AND recipient = ".$contactorId." AND id < ".$firstMessageId)
        //     ->orWhereRaw("sender = ".$contactorId." AND recipient = ".$id." AND id < ".$firstMessageId)->orderBy('created_at', 'desc')->limit(5)->get();
        $messageData = Message::where("group_id", $groupId)->where('id', '<', $firstMessageId)->orderBy('created_at', 'desc')->limit(5)->get();

        $messages = $messageData->map(function($item) {
            if ($item['kind'] == 0) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            } 
            if ($item['kind'] == 2) {
                $temp = PhotoGallery::where('id', $item['content'])->get();
                $item['photoId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['photo'];
                $item['forwardList'] = $temp[0]['forward_list'];
                return $item;
            } 
            if ($item['kind'] == 3) {
                $temp = Group::where('id', $item['content'])->get();
                $item['inviteGroupTitle'] = $temp[0]['title'];
                $item['inviteGroupFeeType'] = $temp[0]['fee_type'];
                $item['inviteGroupFeeValue'] = $temp[0]['fee_value'];
                return $item;
            }
            if ($item['kind'] == 4) {
                $temp = AttachFile::where('id', $item['content'])->get();
                $item['fileName'] = $temp[0]['file_name'];
                $item['fileType'] = $temp[0]['file_type'];
                $item['path'] = $temp[0]['path'];
                return $item;
            }
            
        });
        
        return array('state'=>'true','messageData'=>$messages);
    }

    public function getBlockList(Request $request) {
        $userId = Auth::id();
        $result = Block::where('user_id', $userId)->orWhere('block_id', $userId)->get();
        if (count($result)) {
            return array('state'=>'true', 'data'=>$result);
        }
        return array('state'=>'no data', 'data'=>array());
    }
}
