<?php

namespace App\Http\Controllers\Util;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Models\AttachFile;
use App\Models\Message;
use App\Models\Rate;
use App\Models\PhotoRequest;
use App\Models\PhotoGallery;
use App\Models\User;
use App\Models\Group;
use App\Models\UsersGroup;

class FileUtil extends Controller{
    public function uploadFile(Request $request){
        $res = "error";
        if($request->hasfile('file')){
            $path = 'upload/attach';
            // dd($request->file('file'));
            // //@mkdir($path, 0777, true);
            // $path=$request->file('file')->store($path);
            $res = "success";
        }
        $res = array('msg'=>$res,'location'=>'/v1/api/downloadFile?path='.$path);
        return $res;
		// exit(json_encode($res));
    }
    public function downloadFile(Request $request){
        $path = substr($_SERVER['REQUEST_URI'], 26);
        return response()->download(storage_path("app/".$path));
        // return response()->download(storage_path("app/".$request->input('path')));
    }
    
    public function attachFiles(Request $request){
        //@mkdir($path, 0777, true);
        $senderId = $request->input('senderId');
        $groupId = $request->input('groupId');
        $groupType = $request->input('groupType');
        $result = array();
        foreach($request->file('files') as $file) {
            $path='upload/attach_files';
            $path = $file->store($path);
            $pathInfo = pathinfo($path);
            // $basename = $pathInfo['basename'];
            // $extension = $pathInfo['extension'];
            // $filename = $pathInfo['filename'];
            
            $message = new Message;
            $message->sender = $senderId;
            $message->group_id = $groupId;
            
            $row=new AttachFile;
            $row->file_name = $file->getClientOriginalName();
            // $row->file_type = $file->getClientOriginalExtension();
            $row->file_type = $pathInfo['extension'];
            $row->path = $path;
            $row->save();

            $message->content = $row->id;
            $message->kind = 4;
            $message->save();
            if ($groupType == 3) {
                
                $groupUsers = UsersGroup::where('group_id', $groupId)->where('user_id', '!=', $senderId)->get();
                $groupUsers = $groupUsers->map(function($item) {
                    return $item['user_id'];
                });
                foreach($groupUsers as $user) {
                    $tmpMessage = new Message;
                    $tmpMessage->sender = $senderId;
                    $tmpMessage->content = $row->id;
                    $tmpMessage->kind = 4;

                    $directGroupId = Group::join('users_groups', 'groups.id', '=', 'users_groups.group_id')
                        ->whereRaw('user_id='.$senderId.' OR user_id='.$user)
                        ->where('type', 1)
                        ->groupBy('group_id')
                        ->havingRaw('count(group_id) = ?', [2])
                        ->get();
                    if (count($directGroupId)) {
                        $tmpMessage->group_id = $directGroupId[0]['group_id'];
                    } else {
                        $group = new Group;
                        $group->title = $senderName = User::where('id', $senderId)->first('username')['username'];
                        $group->owner = $senderId;
                        $group->admins = $senderId;
                        $group->save();

                        $tmpMessage->group_id = $group->id;
                    }
                    $tmpMessage->save();
                }
            }

            array_push($result, $message->id);
        }
        return $this->getMessageData($result);
    }

    public function getMessageData($messageId) {
        $id = Auth::id();
        $messageData = Message::whereIn("id", $messageId)->orderBy('created_at', 'desc')->get();
        $messages = $messageData->map(function($item) {
            $rate = Rate::where('message_id', $item['id'])->avg('rate');
            $item['rate'] = $rate;
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
                $payBlurState = array_search(Auth::id(), explode(',', $temp[0]['blur_payers_list']), false);
                if ($payBlurState === false) {
                    $item['content'] = $temp[0]['original_thumb'];
                } else {
                    $item['content'] = $temp[0]['photo'];
                }
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

    public function arrayToJson(Request $request){
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'http://upsite.design/upsite_essential_files/api/debtor/debtor.show.php',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
        ));
        
        $response = curl_exec($curl);
        curl_close($curl);
        $response=str_replace(" ","",str_replace("<pre>","",str_replace("</pre>","",$response)));
        $res="";
        foreach(explode("\n",$response) as $line){
            if($line=='')continue;
            $arr=explode('=>',$line);
            if(count($arr)>1)$line="\"".substr($arr[0],1,strlen($arr[0])-2)."\":".($arr[1]=='Array'?'':"\"".$arr[1]."\",");
            if($line=='(')$line='{';
            if($line==')')$line='},';
            $res.=$line;
        }
        $response=str_replace(",}","}",str_replace("Array","",str_replace("\n","",substr($res,0,strlen($res)-1))));
        header("Content-type: application/json");
        exit ($response);
    }

    public static function attachFile($file,$kind,$id){
        $path='upload/attach_business';
        //@mkdir($path, 0777, true);
        $path=$file->store($path);
        $row=new AttachFile;
        $row->table_kind=$kind;
        $row->table_id=$id;
        $row->filename=$file->getClientOriginalName();
        $row->path=$path;
        $row->body='';
        $row->flag=AttachFile::where('table_kind',$kind)->where('table_id',$id)->count()>0?0:1;
        $row->created_by=Auth::id();
        $row->updated_by=Auth::id();
        $row->save();
        return json_encode(array('msg'=>'ok','id'=>$row->id,'flag'=>$row->flag));

    }
    public static function attachRemoveFile($id){
        $row=AttachFile::find($id);
        if($row->flag==0)
            Storage::delete($row->path);
        $row->delete();
    }
    public static function setFlag($id,$v){
        $file=AttachFile::find($id);
        $file->flag=$v;
        $file->save();
        return 'ok';
    }
}
