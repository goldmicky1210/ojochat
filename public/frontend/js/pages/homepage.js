var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];
var typingTime;
var timerId;
let State = ['', 'sent', 'arrived', 'read'];

let currentGroupId;
let currentGroupUsers;
let currentDirectId;
let currentDirectUsers;
let currentCastId;
let currentCastUsers;
let globalGroupId;
let globalGroupUsers;
let rateData;
let recentChatUsers;
$(document).ready(() => {

    // cache function
    getContactorInfoByGroupId = cachingDecorator(getContactorInfoByGroupId)

    new Promise(resolve => {
        getUsersList(resolve);
    }).then(() => {
        $('.balance-amount').text(`$${getCertainUserInfoById(currentUserId).balances.toFixed(2)}`)
        getFollowData(currentUserId);
        getRecentChatUsers(1);
        typingAction();
        deleteMessages();
        displayRate();
        searchList();
        getNotificationList();
    });



    $('#logoutBtn').on('click', () => {
        socket.emit('logout', {
            currentUserId
        });
    });


    //createPhoto by click Media
    $('#createPhotoBtn').on('click', () => {
        $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').addClass('d-none');
        $('#createPhoto .emojis-price').removeClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '0px');
    });

    $('#mediaBtn').on('click', () => {
        $('#mediaPhoto').modal('show');
    });

    $('#acceptPhotoRequestBtn').on('click', () => {
        // $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').removeClass('d-none');
        $('#createPhoto .emojis-price').addClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '-20px');

    });

    $('.self_profile_btn').on('click', () => {
        setUserProfileContent(currentUserId);
        showSharedMedia('all');
        $('.chitchat-container').toggleClass("mobile-menu");
        if ($(window).width() <= 768) {
            $('.main-nav').removeClass("on");
        }
    });

    $('.balance-amount').on('click', () => {
        displayPaymentHistory(currentUserId);
    });

    $('#profileImageUploadBtn').css('pointer-events', 'none');
    //profile Image Ajax Change
    changeProfileImageAjax();

});

function getNotificationList() {
    let target = '.notification-tab  .chat-main';
    new Promise(resolve => getPendingContactListData(resolve)).then(data => {
        $(target).empty();
        let receiveStatusItem = `
                <div class="thread_info">
                    <div class="accept_request_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#">
                            <i class="ti-check"></i>
                        </a>
                    </div>
                    <div class="remove_request_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Remove Request">
                            <i class="ti-trash"></i>
                        </a>
                    </div>
                </div>`
        let sendStatusItem = `
                <div class="thread_info">
                    <div class="remove_request_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Remove Request">
                            <i class="ti-trash"></i>
                        </a>
                    </div>
                </div>`
        data.receiveData.forEach(item => addUsersListItem(target, item, receiveStatusItem))
        data.sendData.forEach(item => addUsersListItem(target, item, sendStatusItem))
        if (data.receiveData.length) {
            $('.notification_list_btn .dot-danger').addClass('dot-btn');
        } else {
            $('.notification_list_btn .dot-danger').removeClass('dot-btn');
        }
    });
}

function getCertainUserInfoById(id) {
    return usersList.find(item => item.id == id);
}

function getRecentChatUsers(type) {
    let form_data = new FormData();
    form_data.append('type', type);
    $.ajax({
        url: '/home/getRecentChatUsers',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        data: form_data,
        async: false,
        success: function (res) {
            if (res.state == 'true') {
                globalGroupId = res.data.slice(-1)[0] ? res.data.slice(-1)[0].id : 0;
                globalGroupUsers = res.data.slice(-1)[0] ? res.data.slice(-1)[0].users.join(',') : '';
                var itemTarget = `#myTabContent1 .tab-pane:nth-child(${type}) ul.chat-main`;
                var messageTarget = `.messages:nth-of-type(${type + 1}) .chatappend`;
                if (type == 1) {
                    currentDirectId = globalGroupId;
                    currentDirectUsers = globalGroupUsers;
                    recentChatUsers = res.data.map(item => item.users.find(userId => userId != currentUserId)).map(id => getCertainUserInfoById(id));
                    displayRecentChatFriends(recentChatUsers);
                } else if (type == 2) {
                    currentGroupId = globalGroupId;
                    currentGroupUsers = globalGroupUsers;
                } else if (type == 3) {
                    currentCastId = globalGroupId;
                    currentCastUsers = globalGroupUsers;
                }
                if (globalGroupId) {
                    showCurrentChatHistory(messageTarget, globalGroupId, globalGroupUsers, type);
                } else {
                    $(messageTarget).empty();
                }
                $(itemTarget).empty();
                res.data.forEach(item => {
                    if (item.lastMessage) {
                        let sender = item.lastMessage.sender ? getCertainUserInfoById(item.lastMessage.sender).username : '';
                        if (item.lastMessage.sender == currentUserId)
                            sender = "You";
                        var content = item.lastMessage.kind == 0 ? item.lastMessage.content : item.lastMessage.kind == 2 ? 'Sent a Blink' : item.lastMessage.kind == 4 ? 'Sent a Media' : item.lastMessage.kind == 10 ? 'Sent a Audio' : 'Sent a message';
                        item.lastMessageSender = sender;
                        item.lastMessageContent = content;
                        item.lastMessageDate = new Date(item.lastMessage.created_at);
                    }
                    addNewGroupItem(itemTarget, item);
                });
                convertListItems();
                $(`${itemTarget}>li:first-child`).addClass('active');

            } else {
                $(`#direct .chat-main`).empty();
                $(`#cast_chat .chatappend .chat-main`).empty();
                $(`#myTabContent1 .chatappend .chat-main`).empty();
                $('.section-py-space').css('display', 'block');
                $('#content').css('display', 'none');
                $('.app-list').css('display', 'none');
            }
        },
        error: function (res) {
            alert('Get Recent User Failed');
        }
    });
}

function getLastMessage(groupId, resolve) {
    let form_data = new FormData();
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/message/getLastMessage',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        data: form_data,
        success: function (res) {
            if (res.data) {
                var content = res.data.kind == 0 ? res.data.content : res.data.kind == 1 ? 'You has been received PhotoRequest' : 'You has been received Blink';
            } else {
                var content = 'Hello';
            }
            resolve(content)
        },
        error: function (res) {
            // document.location.href = '/login';
        }
    });
}

function getUsersList(resolve) {
    $.ajax({
        url: '/home/getUsersList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            usersList = res.data;

            if (resolve) {
                resolve(res.data);
            }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('UserList Error');
        }
    });
}

function newMessage() {
    let replyId = $('#content .chat-content>.replyMessage').attr('replyId');
    let replyKind = $('#content .chat-content>.replyMessage').attr('replyKind');
    $('#content .chat-content>.replyMessage').removeAttr('replyId');
    $('#content .chat-content>.replyMessage').removeAttr('replyKind');
    $('#content .chat-content>.replyMessage').hide();
    var content = $('.message-input .setemoj').val();
    let msgType = 'text';
    if (voiceData) {
        content = voiceData;
        msgType = 'audio';
    } else if ($.trim(content) == '') {
        return false;
    }
    if (msgType == 'text') {
        $('.chat-main .active .details h6').html('<span>You : </span>' + content);
    } else if (msgType == 'audio') {
        $('.chat-main .active .details h6').html('<span>You : Sent a Audio</span>');
    }

    $('.message-input .setemoj').val(null);

    let senderName = getCertainUserInfoById(currentUserId).username;

    // $.ajax({
    //     type: "POST",
    //     headers: {
    //         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    //     },
    //     url: "/home/sendMessage",
    //     data: {
    //         id: getCertainUserInfoById(currentUserId).id,
    //         content,
    //         foo: 'bar',
    //         currentContactID: currentContactId
    //     },
    //     success: function (datas) {
    //         console.log("Request Sent");
    //     },
    // });

    if ($('#direct_chat').hasClass('active')) {
        globalGroupId = currentDirectId;
        var groupType = 1;
    } else if ($('#group_chat').hasClass('active')) {
        globalGroupId = currentGroupId;
        var groupType = 2;
    } else if ($('#cast_chat').hasClass('active')) {
        globalGroupId = currentCastId;
        var groupType = 3;
    }
    socket.emit('send:groupMessage', { globalGroupId, globalGroupUsers, content, senderName, replyId, replyKind, groupType, msgType });
    voiceData = null;
    $('.voiceMsgBtn').removeClass('btn-outline-danger')
    $('#voiceMsgTag').addClass('hidden')
    $('#setemoj').removeClass('hidden')

    return;
};

function typingAction() {
    $('.message-input textarea').on('keyup', function (e) {
        globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main li.active').attr('groupId');
        globalGroupUsers = $('#myTabContent1 .tab-pane.active .chat-main li.active').attr('groupUsers');
        socket.emit('typing', { sender: currentUserId, globalGroupId, globalGroupUsers });
    });
}

function typingMessage(senderId, lastElement) {
    if (!typingTime) {
        typingTime = new Date();
    }
    // else {
    var delta = (new Date() - typingTime);
    // }
    if (!$('.typing-m').length) {
        let contactorInfo = getCertainUserInfoById(senderId);
        $(`<li class="sent last typing-m"> <div class="media"> <div class="profile me-4 bg-size" style="background-image: url(${contactorInfo.avatar ? 'v1/api/downloadFile?path=' + contactorInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;"></div><div class="media-body"> <div class="contact-name"> <h5>${contactorInfo.username}</h5> <h6>${typingTime.toLocaleTimeString()}</h6> <ul class="msg-box"> <li> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> </div></div></div></li>`).appendTo($('.messages .chatappend'));
        let lastMsgItem = '.messages.active .chatappend .msg-item:last-of-type';
        if ($(lastElement).isInViewport()) {
            $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');
        }
    }
    if (delta < 1500) {
        typingTime = new Date();
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        $('.typing-m').remove();
        // let lastMsgItem = '.messages.active .chatappend .msg-item:last-child';
        // if ($(lastMsgItem).isInViewport()) {
        //     $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');
        // }
        typingTime = undefined;
    }, 1500);
}

function changeProfileImageAjax() {
    let profileImageBtn = $('#profileImageUploadBtn')
    let avatarImage = $('#profileImage');

    profileImageBtn.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            avatarImage.attr('src', reader.result);
            avatarImage.parent().css('background-image', `url("${reader.result}")`);
        }
        if (files.length)
            reader.readAsDataURL(files[0]);
    });
}

function changeGroupProfileImageAjax() {
    let profileImageBtn = $('#group_avatar_select')
    let avatarImage = $('#group_profile_avatar .bg-img');

    profileImageBtn.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            avatarImage.attr('src', reader.result);
            avatarImage.parent().css('background-image', `url("${reader.result}")`);
        }
        if (files.length)
            reader.readAsDataURL(files[0]);
    });
}

function setUserProfileContent(userId) {
    $('.chitchat-right-sidebar .contact-profile .group_operation').hide();

    let userInfo = getCertainUserInfoById(userId)
    if (userInfo.avatar) {
        $('.right-sidebar .contact-top').css('background-image', `url("v1/api/downloadFile?path=${userInfo.avatar}")`);
    } else {
        $('.right-sidebar .contact-top').css('background-image', `url("/images/default-avatar.png")`);
    }
    $('.right-sidebar .contact-profile').attr('userId', userId);
    $('.right-sidebar .contact-profile .theme-title .media h2').html(userInfo.login_name || 'User Profile');
    $('.right-sidebar .contact-profile .name h3').html(userInfo.firstName || userInfo.username);
    $('.right-sidebar .contact-profile .name h5').html(userInfo.location);
    $('.right-sidebar .contact-profile .name h6').html(userInfo.description);
    if (userId == currentUserId) {
        $('.contact-profile .follow_btn').addClass('hidden');
    } else {
        $('.right-sidebar .contact-profile .follow_btn').removeClass('hidden');
    }

    if (isFollowing(userId)) {
        $('.right-sidebar .contact-profile .follow_btn .btn').text('UnFollow');
        $('.right-sidebar .contact-profile .follow_btn .btn').removeClass('btn-success');
        $('.right-sidebar .contact-profile .follow_btn .btn').addClass('btn-danger');
    } else {
        $('.right-sidebar .contact-profile .follow_btn .btn').text('Follow');
        $('.right-sidebar .contact-profile .follow_btn .btn').removeClass('btn-danger');
        $('.right-sidebar .contact-profile .follow_btn .btn').addClass('btn-success');


    }
    var form_data = new FormData();
    form_data.append('userId', userId);
    $.ajax({
        url: '/home/getRateData',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                setProfileRate(res.rateData);
            }
        },
        error: function (response) { }
    });

}

function setGroupProfileContent(groupId) {
    $('.chitchat-right-sidebar .contact-profile .group_operation').hide();
    $('.right-sidebar .contact-profile .follow_btn').addClass('hidden');

    let form_data = new FormData();
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/group/getGroupInfo',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                let { data } = res;
                if (data.avatar) {
                    $('.right-sidebar .contact-top').css('background-image', `url("v1/api/downloadFile?path=${data.avatar}")`);
                } else {
                    $('.right-sidebar .contact-top').css('background-image', `url("/chat/images/avtar/teq.jpg")`);
                }

                $('.right-sidebar .contact-profile .theme-title .media h2').html('Group Profile');
                $('.right-sidebar .contact-profile .name h3').html(data.title || 'Group Title');
                $('.right-sidebar .contact-profile .name h5').html(data.description || '');
                $('.right-sidebar .contact-profile .name h6').html('');
                $('.right-sidebar .contact-profile .name').attr('groupAdmins', data.admins || '');

                $.ajax({
                    url: '/home/getRateData',
                    headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: form_data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    dataType: "json",
                    success: function (res) {
                        if (res.state == 'true') {
                            setProfileRate(res.rateData);
                        }
                    },
                    error: function (response) { }
                });
            }
        },
        error: function (response) { }
    });
}

function setProfileRate(data) {
    if (data.length) {
        var textRate = data.filter(item => item.kind == 0).map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
        var photoRate = data.filter(item => item.kind == 2).map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
        var videoRate = 0;
        var audioRate = 0;
        var videoCallRate = 0;
        var voiceCallRate = 0;
        var averageRate = data.map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
    } else {
        var textRate = 0;
        var photoRate = 0;
        var videoRate = 0;
        var audioRate = 0;
        var videoCallRate = 0;
        var voiceCallRate = 0;
        var averageRate = 0;
    }
    let count = data.length || '';
    $('.profile_rating_list .badge').text(count);
    getContentRate('.right-sidebar .contact-profile', Math.round(averageRate));
    document.querySelector('.right-sidebar .contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))

    getContentRate('.content-rating-list .text-rating', Math.round(textRate));
    getContentRate('.content-rating-list .photo-rating', Math.round(photoRate));
    getContentRate('.content-rating-list .video-rating', Math.round(videoRate));
    getContentRate('.content-rating-list .audio-rating', Math.round(audioRate));
    getContentRate('.content-rating-list .video-call-rating', Math.round(videoCallRate));
    getContentRate('.content-rating-list .voice-call-rating', Math.round(voiceCallRate));
    document.querySelector('.content-rating-list .text-rating')._tippy.setContent(textRate.toFixed(2))
    document.querySelector('.content-rating-list .photo-rating')._tippy.setContent(photoRate.toFixed(2))
    document.querySelector('.content-rating-list .video-rating')._tippy.setContent(videoRate.toFixed(2))
    document.querySelector('.content-rating-list .audio-rating')._tippy.setContent(audioRate.toFixed(2))
    document.querySelector('.content-rating-list .video-call-rating')._tippy.setContent(videoCallRate.toFixed(2))
    document.querySelector('.content-rating-list .voice-call-rating')._tippy.setContent(voiceCallRate.toFixed(2))
}

function getAverageRate(data) {
    if (data.length) {
        var averageRate = data.map(item => item.rate).reduce((cur, item, index, arr) => cur + (item / arr.length), 0) || 0;
    } else {
        var averageRate = 0;
    }
    return averageRate;
}

function openAndCloseProfile() {
    $('body').toggleClass('menu-active'); //add class
    // $('.app-sidebar').toggleClass('active'); //remove
    $('.chitchat-main').toggleClass("small-sidebar"); //remove
    if ($(window).width() <= 1440) {
        $('.chitchat-main').addClass("small-sidebar"); //remove
    }
    if ($('body').hasClass('menu-active')) {
        // $('body').addClass('sidebar-active main-page');
        $('body').addClass('main-page');
        $('.app-sidebar').removeClass('active');
        $('.chitchat-main').removeClass("small-sidebar");
    }
}

function showSharedMedia(groupId) {
    var form_data = new FormData();
    form_data.append('userId', currentUserId);
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/home/showSharedMedia',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                $('.shared_media .media_list').empty();
                let count = (res.receiveData.length + res.sendData.length) || 0;
                $('.media-gallery.portfolio-section .shared_media_count').text(count);
                res.sendData.forEach(item => {
                    let title = item.title;
                    if (item.type == 1) {
                        title = getCertainUserInfoById(getContactorInfoByGroupId(item.sender, item.group_id)).username;
                    } else {
                        title = item.title;
                    }
                    let dateString = new Date(item.created_at).toLocaleDateString() + ' ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')
                    $('.shared_media .send_data').append(`
                        <div class="media-small isotopeSelector filter" photoId=${item.id}>
                            <div class="overlay">
                                <div class="border-portfolio">
                                    <a href=${item.photo} title="To: ${title}" date="${dateString}">
                                        <div class="overlay-background">
                                            <i class="ti-plus" aria-hidden="true"></i>
                                        </div>
                                        <img class="img-fluid bg-img" src=${item.photo} alt="portfolio-image"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                res.receiveData.forEach(item => {
                    let title = getCertainUserInfoById(item.sender).username;
                    if (item.type == 2) title = title + ' in ' + item.title;
                    let dateString = new Date(item.created_at).toLocaleDateString() + ' ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')

                    $('.shared_media .receive_data').append(`
                        <div class="media-small isotopeSelector filter" photoId=${item.id}>
                            <div class="overlay">
                                <div class="border-portfolio">
                                    <a href=${item.photo} title="From: ${title}" date="${dateString}">
                                        <div class="overlay-background">
                                            <i class="ti-plus" aria-hidden="true"></i>
                                        </div>
                                        <img class="img-fluid bg-img" src=${item.photo} alt="portfolio-image"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        },
        error: function (response) { }
    });
}

function getContactorInfoByGroupId(userId, groupId) {
    let form_data = new FormData();
    form_data.append('userId', userId);
    form_data.append('groupId', groupId);
    let result;
    $.ajax({
        url: '/group/getContactorInfoByGroupId',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                result = res.id;
            } else {

            }
        },
        error: function (response) { }
    });
    return result;
}

function cachingDecorator(func) {
    let cache = new Map();

    return function (x, y) {
        if (cache.has(`${x}:${y}`)) {    // if there's such key in cache
            return cache.get(`${x}:${y}`); // read the result from it
        }

        let result = func(x, y);  // otherwise call func

        cache.set(`${x}:${y}`, result);  // and cache (remember) the result
        return result;
    };
}

function displayRecentChatFriends(recentChatUsers) {
    $('.recent-slider').empty();
    recentChatUsers.forEach(item => {
        $('.recent-slider').append(`
            <div class="item" key=${item.id}>
                    <div class="photoRating">
                        <div>★</div><div>★</div><div>★</div><div>★</div><div>★</div>
                    </div>
                <div class="gr-profile dot-btn dot-success" data-user-id=${item.id}>
                ${item.avatar ?
                `<img class="bg-img" src='v1/api/downloadFile?path=${item.avatar}' alt="Avatar" />`
                :
                getNameStr(item.username)
            }
                </div>
                <div class="username">${item.username}</div>
            </div>
        `);
        convertListItems();
        getContentRate(`.recent-slider .item[key="${item.id}"]`, Math.round(getAverageRate(item.rateData)));
    });
}

function deleteMessages() {
    $('.chatappend').on('click', '.deleteMessageBtn', event => {
        if (confirm('Are you sure?')) {
            let element = $(event.currentTarget).closest('.msg-item');
            let messageId = element.attr('key');

            if (element.attr('kind') == '2') {
                var photoId = element.find('.receive_photo').attr('photoid');
                let price = element.find('.receive_photo').attr('price');
                if (price) {
                    alert("You can't delete this photo");
                }
            } else {
                console.log('not photo');
            }
            globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main li.active').attr('groupId');
            socket.emit('delete:message', {
                globalGroupId,
                messageId,
                photoId
            });
            $(this).closest('.msg-dropdown').hide();
        }
    });
}

function displayRate() {
    $('.chatappend').on('click', '.rateBtn', event => {
        let element = $(event.currentTarget).closest('.msg-item');
        element.find('.photoRating').css('display', 'flex');
        $(this).closest('.msg-dropdown').hide();
        setTimeout(() => {
            element.find('.photoRating').css('display', 'none');
        }, 5000);
    });
}

function displayPaymentHistory(userId) {
    var form_data = new FormData();
    form_data.append('userId', userId);
    $.ajax({
        url: '/home/getPaymentHistories',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                $('.history-list').empty();
                res.data.forEach((item, index) => {
                    let status = ['Holding', 'Completed'];
                    let senderInfo = getCertainUserInfoById(item.sender);
                    var receiverInfo = getCertainUserInfoById(item.recipient);
                    let sendFlag = item.sender == currentUserId ? true : false;
                    var dateString = new Date(item.created_at).toLocaleDateString() + ' @ ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')
                    if (item.forward_flag) {
                        // var avatar = sendFlag ? receiverInfo.avatar : senderInfo.avatar;
                        if (item.recipient == item.blinkOwner) {
                            var receiverInfo = getCertainUserInfoById(item.lastSender);
                            var avatar = sendFlag ? receiverInfo.avatar : '';
                            var amount = sendFlag ? (item.amount).toFixed(2) : (item.amount * 0.7 * 0.5).toFixed(2);
                            $('.history-list').append(`
                                <li class="accordion-item" userId=${sendFlag ? receiverInfo.id : senderInfo.id} sendFlag=${sendFlag} paymentId=${item.id}>
                                    <h2 class="accordion-header" id="headingOne-${index}">
                                    <div class="sent" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        <a>
                                            <div class="chat-box">
                                                <div class="profile bg-size"
                                                    style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                                    center; display: block;">
                                                </div>
                                                <div class="details">
                                                    <h5>${sendFlag ? receiverInfo.username : getSecretUsername(senderInfo.username)}</h5>
                                                    <h6 class="title">${dateString}</h6>
                                                </div>
                                                <div class="date-status">
                                                    <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                                    <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    </h2>
                                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne-${index}" data-bs-parent="#accordionExample">
                                        <div class="accordion-body" key=${item.refer_id}>
                                            ${item.type == 0 ? `
                                                <div class="detailed_info">
                                                    <img class="thumb" src="${item.thumb}" />
                                                    ${!sendFlag ? `<div class="send_heart"><i class="${item.thanks ? 'fa' : 'ti-heart'} fa-heart"></i><span>Send Thanks</span></div>` : ''}
                                                </div>` : `<span>This is Group ${item.group_title} Fee.</span>`}
                                        </div>
                                    </div>
                                </li>
                            `);
                        } else {
                            var amount = (item.amount).toFixed(2);
                            if (!sendFlag) {
                                if (item.recipient == item.lastSender) {
                                    var avatar = senderInfo.avatar;
                                    $('.history-list').append(`
                                        <li class="accordion-item" userId=${sendFlag ? receiverInfo.id : senderInfo.id} sendFlag=${sendFlag} paymentId=${item.id}>
                                            <h2 class="accordion-header" id="headingOne-${index}">
                                            <div class="sent" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                                <a>
                                                    <div class="chat-box">
                                                        <div class="profile bg-size"
                                                            style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                                            center; display: block;">
                                                        </div>
                                                        <div class="details">
                                                            <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                                                            <h6 class="title">${dateString}</h6>
                                                        </div>
                                                        <div class="date-status">
                                                            <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                                            <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            </h2>
                                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne-${index}" data-bs-parent="#accordionExample">
                                                <div class="accordion-body" key=${item.refer_id}>
                                                    ${item.type == 0 ? `
                                                        <div class="detailed_info">
                                                            <img class="thumb" src="${item.thumb}" />
                                                            ${!sendFlag ? `<div class="send_heart"><i class="${item.thanks ? 'fa' : 'ti-heart'} fa-heart"></i><span>Send Thanks</span></div>` : ''}
                                                        </div>` : `<span>This is Group ${item.group_title} Fee.</span>`}
                                                </div>
                                            </div>
                                        </li>
                                    `);
                                } else {
                                    $('.history-list').append(`
                                        <li class="accordion-item" userId=${sendFlag ? receiverInfo.id : senderInfo.id} sendFlag=${sendFlag} paymentId=${item.id}>
                                            <h2 class="accordion-header" id="headingOne-${index}">
                                            <div class="sent" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                                <a>
                                                    <div class="chat-box">
                                                        <div class="profile bg-size"
                                                            style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                                            center; display: block;">
                                                        </div>
                                                        <div class="details">
                                                            <h5>${sendFlag ? receiverInfo.username : getSecretUsername(senderInfo.username)}</h5>
                                                            <h6 class="title">${dateString}</h6>
                                                        </div>
                                                        <div class="date-status">
                                                            <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                                            <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            </h2>
                                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne-${index}" data-bs-parent="#accordionExample">
                                                <div class="accordion-body" key=${item.refer_id}>
                                                    ${item.type == 0 ? `
                                                        <div class="detailed_info">
                                                            <img class="thumb" src="${item.thumb}" />
                                                            ${!sendFlag ? `<div class="send_heart"><i class="${item.thanks ? 'fa' : 'ti-heart'} fa-heart"></i><span>Send Thanks</span></div>` : ''}
                                                        </div>` : `<span>This is Group ${item.group_title} Fee.</span>`}
                                                </div>
                                            </div>
                                        </li>
                                    `);
                                }
                            }
                        }
                    } else {
                        var avatar = sendFlag ? receiverInfo.avatar : senderInfo.avatar;
                        var amount = sendFlag ? (item.amount).toFixed(2) : (item.amount * 0.7).toFixed(2);
                        let dateString = new Date(item.created_at).toLocaleDateString() + ' @ ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')

                        $('.history-list').append(`
                            <li class="accordion-item" userId=${sendFlag ? receiverInfo.id : senderInfo.id} sendFlag=${sendFlag} paymentId=${item.id}>
                                <h2 class="accordion-header" id="headingOne-${index}">
                                <div class="sent" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    <a>
                                        <div class="chat-box">
                                            <div class="profile bg-size"
                                                style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                                center; display: block;">
                                            </div>
                                            <div class="details">
                                                <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                                                <h6 class="title">${dateString}</h6>
                                            </div>
                                            <div class="date-status">
                                                <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                                <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne-${index}" data-bs-parent="#accordionExample">
                                    <div class="accordion-body" key=${item.refer_id}>
                                        ${item.type == 0 ? `
                                            <div class="detailed_info">
                                                <img class="thumb" src="${item.thumb}" />
                                                ${!sendFlag ? `<div class="send_heart"><i class="${item.thanks ? 'fa' : 'ti-heart'} fa-heart"></i><span>Send Thanks</span></div>` : ''}
                                            </div>` : `<span>This is Group ${item.group_title} Fee.</span>`}
                                    </div>
                                </div>
                            </li>
                        `);
                    }

                })
            }
        },
        error: function (response) { }
    });
}

function getSecretUsername(username) {
    return username[0] + '******';
}

function getChatTimeString(time) {
    let dateString = time.toDateString();
    let timeString = time.toLocaleTimeString();
    let nowDateString = new Date().toDateString();
    let timeDiffer = parseInt((new Date(nowDateString) - new Date(dateString)) / (1000 * 60 * 60 * 24), 10);
    switch (timeDiffer) {
        case 0:
            return timeString;
        case 1:
            return 'Yesterday ' + timeString;
        default:
            return dateString + ' ' + timeString;
    }
}

function getThreadTimeString(time) {
    let dateString = time.toDateString();
    let timeString = time.toLocaleTimeString();
    let nowDateString = new Date().toDateString();
    let timeDiffer = parseInt((new Date(nowDateString) - new Date(dateString)) / (1000 * 60 * 60 * 24), 10);
    switch (timeDiffer) {
        case 0:
            return timeString;
        case 1:
            return 'Yesterday';
        default:
            return dateString;
    }
}

function confirmModal(title, content, okAction, cancelAction) {
    $.confirm({
        title,
        content,
        buttons: {
            Ok: {
                btnClass: 'btn-primary',
                action: okAction
            },
            Cancel: {
                btnClass: 'btn-danger',
                action: cancelAction
            }
        }
    });
}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function searchList() {
    let keyuptimer;
    $('.search_list').bind('keyup', function () {
        let target = '#myTabContent1 .tab-pane.active';
        if ($('#custom_modal').hasClass('show')) {
            target = '#custom_modal'
        } else if ($('#new_chat_modal').hasClass('show')) {
            target = '#new_chat_modal'
        }
        clearTimeout(keyuptimer);
        keyuptimer = setTimeout(() => {
            let value = $(this).val();
            if (value) {
                if ($(this).closest('.modal-content').hasClass('search_user_modal')) {
                    let target = '#custom_modal .chat-main';
                    lastUserName = '';
                    $(target).empty();
                    let newUsersList = loadMoreUsers(lastUserName, value);
                    newUsersList.forEach(item => {
                        follwStatus = isFollowing(item.id);
                        let statusItem = `
                        <div class="thread_info">
                            <div class="follow_btn">
                                <a class="icon-btn ${follwStatus ? 'btn-outline-danger' : 'btn-outline-primary'} button-effect btn-xs" href="#" title=${follwStatus ? 'UnFollow' : 'Follow'}>
                                    <i class="${follwStatus ? 'ti-heart-broken' : 'ti-heart'}"></i>
                                </a>
                            </div>
                            <div class="contact_request_btn">
                                <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Contact Request">
                                    <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/000000/external-add-user-tanah-basah-basic-outline-tanah-basah-2.png"/>
                                </a>
                            </div>
                        </div>
                        `;
                        addUsersListItem(target, item, statusItem)
                        lastUserName = item.username;
                    });
                } else {
                    $(target).find('.chat-main>li').each(function () {
                        let title = $(this).find('.details h5').text().toLowerCase();
                        if (title.includes(value.toLowerCase())) {
                            $(this).removeClass('hidden');
                        } else {
                            $(this).addClass('hidden');
                        }
                    });
                }
            } else {
                if ($(this).closest('.modal-content').hasClass('search_user_modal')) {
                    let target = '#custom_modal .chat-main';
                    lastUserName = '';
                    $(target).empty();
                    let newUsersList = loadMoreUsers(lastUserName, '');
                    newUsersList.forEach(item => {
                        follwStatus = isFollowing(item.id);
                        let statusItem = `
                            <div class="thread_info">
                                <div class="follow_btn">
                                    <a class="icon-btn ${follwStatus ? 'btn-outline-danger' : 'btn-outline-primary'} button-effect btn-xs" href="#" title=${follwStatus ? 'UnFollow' : 'Follow'}>
                                        <i class="${follwStatus ? 'ti-heart-broken' : 'ti-heart'}"></i>
                                    </a>
                                </div>
                                <div class="contact_request_btn">
                                    <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Contact Request">
                                        <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/000000/external-add-user-tanah-basah-basic-outline-tanah-basah-2.png"/>
                                    </a>
                                </div>
                            </div>
                        `;
                        addUsersListItem(target, item, statusItem)
                        lastUserName = item.username;
                    });
                } else {
                    $(target).find('.chat-main>li').each(function (item) {
                        $(this).removeClass('hidden');
                    });
                }
            }
        }, 100);
    });
}