<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\AdminAuthenticate;

Auth::routes();
Route::get('/login', 'AuthController')->name('login');
Route::post('/login', 'AuthController@login');
Route::get('/register', 'AuthController@register')->name('register');
Route::post('/register', 'AuthController@register');
Route::post('/logout', 'AuthController@logout');
Route::get('/forgot', 'AuthController@forgot')->name('forgot');
Route::post('/forgot', 'AuthController@forgot');
Route::get('/logout', 'AuthController@logout')->name('logout');

Route::get('/admin/login', 'Admin\\AuthController@login')->name('admin_login');
Route::post('/admin/login', 'Admin\\AuthController@login');
Route::post('/admin/logout', 'Admin\\AuthController@logout');
Route::get('/admin/forgot', 'Admin\\AuthController@forgot')->name('admin_forgot');
Route::post('/admin/forgot', 'Admin\\AuthController@forgot');
Route::get('/admin/logout', 'Admin\\AuthController@logout')->name('admin_logout');

Route::group(['middleware' => ['login']], function () {
    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index')->name('home');
    Route::post('/home/getRecentChatUsers', 'HomeController@getRecentChatUsers');
    Route::post('/home/getCurrentGroupChatContent', 'HomeController@getCurrentGroupChatContent');
    Route::post('/home/getUsersList', 'HomeController@getUsersList');
    Route::post('/home/getUsersForList', 'HomeController@getUsersForList');
    Route::post('/home/getAvailableUsers', 'HomeController@getAvailableUsers');
    Route::post('/home/getUsersListByGroupId', 'HomeController@getUsersListByGroupId');
    Route::post('/home/addContactItem', 'HomeController@addContactItem');
    Route::post('/home/getContactList', 'HomeController@getContactList');
    Route::post('/home/getPendingContactList', 'HomeController@getPendingContactList');
    Route::post('/home/sendContactRequest', 'HomeController@sendContactRequest');
    Route::post('/home/removeContactRequest', 'HomeController@removeContactRequest');
    Route::post('/home/sendMessage', 'HomeController@sendMessage');
    Route::post('/home/saveProfileInfo', 'HomeController@saveProfileInfo');
    Route::post('/home/getUploadFileURL', 'HomeController@getUploadFileURL');
    Route::post('/home/getPhotoRequest', 'HomeController@getPhotoRequest');
    Route::post('/home/sendRequest', 'HomeController@sendRequest');
    Route::post('/home/getPhotoData', 'HomeController@getPhotoData');
    Route::post('/home/setContentRate', 'HomeController@setContentRate');
    Route::post('/home/getRateData', 'HomeController@getRateData');
    Route::post('/home/loadMoreMessages', 'HomeController@loadMoreMessages');
    Route::post('/home/getCastData', 'MessageController@getCastData');
    Route::post('/home/showSharedMedia', 'HomeController@getSharedMedia');
    Route::post('/home/showSavedBlinks', 'HomeController@showSavedBlinks');
    Route::post('/home/removeSavedBlink', 'HomeController@removeSavedBlink');
    Route::post('/home/getBlinkData', 'HomeController@getBlinkData');
    Route::post('/home/isContact', 'HomeController@isContact');
    Route::post('/message/getLastMessage', 'MessageController@getLastMessage');
    Route::post('/api/create-paypal-transaction', 'PaymentController@createPayment');
    Route::post('/api/confirm-paypal-transaction', 'PaymentController@confirmPayment');
    Route::post('/home/getPaymentHistories', 'HomeController@getPaymentHistories');
    Route::get('/stripe', 'StripeController@stripe');
    Route::post('/stripe', 'StripeController@stripePost')->name('stripe.post');
    Route::post('/setting/setPhoneNumber', 'SettingController@setPhoneNumber');
    Route::post('/setting/getPhoneNumber', 'SettingController@getPhoneNumber');
    Route::post('/setting/setNotification', 'SettingController@setNotification');
    Route::post('/setting/uploadBackgroundImage', 'SettingController@uploadBackgroundImage');
    Route::post('/message/deleteChatThread', 'MessageController@deleteChatThread');
    Route::post('/message/deleteCastThread', 'MessageController@deleteCastThread');
    Route::post('/message/deleteThread', 'MessageController@deleteThread');
    Route::post('/message/getMessgageContentById', 'MessageController@getMessgageContentById');
    Route::post('/group/inviteGroup', 'GroupController@inviteGroup');
    Route::post('/group/getGroupInfo', 'GroupController@getGroupInfo'); 
    Route::post('/group/getCertainGroupInfo', 'GroupController@getGroupInfo'); 
    Route::post('/group/getContactorInfoByGroupId', 'GroupController@getContactorInfoByGroupId'); 
    Route::post('/group/getDirectGroupId', 'GroupController@getDirectGroupId'); 
    Route::post('/profile/followUser', 'ProfileController@followUser'); 
    Route::post('/profile/getFollowData', 'ProfileController@getFollowData'); 
    Route::post('/profile/isFollow', 'ProfileController@isFollow'); 
    Route::post('/profile/getFollowList', 'ProfileController@getFollowList'); 
});

Route::group(['middleware' => ['admin']], function () {
    Route::get('/admin', 'Admin\\HomeController@index');
    Route::get('/admin/home', 'Admin\\HomeController@index')->name('dashboard');
});
Route::post('/developer', 'Util\\DbUtil@developer');

Route::post('/v1/api/uploadFile', 'Util\\FileUtil@uploadFile');
Route::get('/v1/api/downloadFile', 'Util\\FileUtil@downloadFile');
Route::post('/v1/api/attachFiles', 'Util\\FileUtil@attachFiles');