/*-----------------------------------------------------------------------------------

 Template Name:Chitchat
 Template URI: themes.pixelstrap.com/chitchat
 Description: This is Chat website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01. Switchery  js
// 02. calling timer js
// 03 .Add class to body for identify this is application page
// 04. Mobile responsive screens
let blockSwitch
let blockSwitchery
let notificationSwitch
let notificationSwitchery
let selfNotificationSwitch
let selfNotificationSwitchery
let readReceiptsSwitch
let readReceiptsSwitchery
(function($) {
    "use strict";
    /*=====================
      01. Switchery  js
      ==========================*/
    blockSwitch = document.querySelector('.js-switch');
    blockSwitchery = new Switchery(blockSwitch, { color: '#1c9dea', size: 'small' });
    notificationSwitch = document.querySelector('.js-switch2');
    notificationSwitchery = new Switchery(notificationSwitch, { color: '#1c9dea', size: 'small' });
    selfNotificationSwitch = document.querySelector('.js-switch8');
    selfNotificationSwitchery = new Switchery(selfNotificationSwitch, { color: '#1c9dea', size: 'small' });
    readReceiptsSwitch = document.querySelector('.js-switch16');
    readReceiptsSwitchery = new Switchery(readReceiptsSwitch, { color: '#1c9dea', size: 'small' });

    var elem = document.querySelector('.js-switch5');
    var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
    var elem = document.querySelector('.js-switch6');
    var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
    var elem = document.querySelector('.js-switch7');
    var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
    var elem = document.querySelector('.js-switch10');
    var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });
    // var elem = document.querySelector('.js-switch11');
    // var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });
    // var elem = document.querySelector('.js-switch12');
    // var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });
    var elem = document.querySelector('.js-switch13');
    var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });
    // var elem = document.querySelector('.js-switch14');
    // var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });
    // var elem = document.querySelector('.js-switch17');
    // var init = new Switchery(elem, { color: '#1c9dea', size: 'small' });

    /*=====================
    02 . calling timer js
    ==========================*/
    var timer = new Timer();
    timer.start();
    timer.addEventListener('secondsUpdated', function(e) {
        $('#basicUsage').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('secondsUpdated', function(e) {
        $('#basicUsage3').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('secondsUpdated', function(e) {
        $('#basicUsage2').html(timer.getTimeValues().toString());
    });

    /*=====================
    03 .Add class to body for identify this is application page
    ==========================*/
    var body = document.body;
    $(body).addClass("main-page");

    /*=====================
    04. Mobile responsive screens
    ==========================*/
    if ($(window).width() <= 992) {
        $(".main-nav").removeClass("on");
        $('body').removeClass("sidebar-active");
        $('.app-sidebar').removeClass("active");
        $('.chitchat-main').removeClass("small-sidebar");
    };
    if ($(window).width() <= 800) {
        $("ul.chat-main  li").on('click', function() {
            $('.main-nav').removeClass("on");
        });
    }


})(jQuery);

function toggleFullScreen() {
    $('#videocall').toggleClass("active");
}

function removedefault() {
    $('body').removeClass("sidebar-active");
    $('.app-sidebar').removeClass("active");
}