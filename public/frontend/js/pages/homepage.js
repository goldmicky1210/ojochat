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
$(document).ready(() => {

    new Promise(resolve => {
        getUsersList(resolve);
    }).then(() => {
        $('.balance-amount').text(`$${getCertainUserInfoById(currentUserId).balances.toFixed(2)}`)
        getRecentChatUsers(3);
        getRecentChatUsers(2);
        getRecentChatUsers(1);
        typingAction();
        deleteMessages();
        displayRate();
        searchList()
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
        success: function (res) {
            if (res.state == 'true') {
                globalGroupId = res.data.slice(-1)[0] ? res.data.slice(-1)[0].id : 0;
                globalGroupUsers = res.data.slice(-1)[0] ? res.data.slice(-1)[0].users.join(',') : '';
                var itemTarget = `#myTabContent1 .tab-pane:nth-child(${type}) ul.chat-main`;
                var messageTarget = `.messages:nth-of-type(${type + 1}) .chatappend`;
                if (type == 1) {
                    currentDirectId = globalGroupId;
                    currentDirectUsers = globalGroupUsers;
                    let recentChatUsers = res.data.map(item => item.users.find(userId => userId != currentUserId)).map(id => getCertainUserInfoById(id));
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
                        // console.log(item.lastMessage);s
                        let sender = item.lastMessage.sender ? getCertainUserInfoById(item.lastMessage.sender).username : '';
                        if (item.lastMessage.sender == currentUserId)
                            sender = "You";
                        var content = item.lastMessage.kind == 0 ? item.lastMessage.content : item.lastMessage.kind == 2 ? 'Sent a Blink' : item.lastMessage.kind == 4 ? 'Sent a Media' : 'Sent a message';
                        item.lastMessageSender = sender;
                        item.lastMessageContent = content;
                        item.lastMessageDate = new Date(item.lastMessage.created_at);
                        // console.log(item.lastMessageDate);
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
    // let forwardId = $('#content .chat-content>.replyMessage').attr('forwardId');
    // let forwardKind = $('#content .chat-content>.replyMessage').attr('forwardKind');
    $('#content .chat-content>.replyMessage').removeAttr('replyId');
    $('#content .chat-content>.replyMessage').removeAttr('replyKind');
    // $('#content .chat-content>.replyMessage').removeAttr('forwardId');
    // $('#content .chat-content>.replyMessage').removeAttr('forwardKind');
    $('#content .chat-content>.replyMessage').hide();
    var content = $('.message-input input').val();
    if ($.trim(content) == '') {
        return false;
    }

    $('.message-input input').val(null);
    $('.chat-main .active .details h6').html('<span>You : </span>' + content);

    let senderName = getCertainUserInfoById(currentUserId).username;

    $.ajax({
        type: "POST",
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/home/sendMessage",
        data: {
            id: getCertainUserInfoById(currentUserId).id,
            content,
            foo: 'bar',
            currentContactID: currentContactId
        },
        success: function (datas) {
            console.log("Request Sent");
        },
    });
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
    socket.emit('send:groupMessage', { globalGroupId, globalGroupUsers, content, senderName, replyId, replyKind, groupType });
    return;
};

function typingAction() {
    $('.message-input input').on('keyup', function (e) {
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
        console.log($(lastElement).length);
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
        $('.contact-top').css('background-image', `url("v1/api/downloadFile?path=${userInfo.avatar}")`);
    } else {
        $('.contact-top').css('background-image', `url("/images/default-avatar.png")`);
    }
    $('.contact-profile .theme-title .media h2').html(userInfo.login_name || 'User Profile');
    $('.contact-profile .name h3').html(userInfo.firstName || userInfo.username);
    $('.contact-profile .name h5').html(userInfo.location);
    $('.contact-profile .name h6').html(userInfo.description);

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
                    $('.contact-top').css('background-image', `url("v1/api/downloadFile?path=${data.avatar}")`);
                } else {
                    $('.contact-top').css('background-image', `url("/chat/images/avtar/teq.jpg")`);
                }

                $('.contact-profile .theme-title .media h2').html('Group Profile');
                $('.contact-profile .name h3').html(data.title || 'Group Title');
                $('.contact-profile .name h5').html(data.description || '');
                $('.contact-profile .name h6').html('');
                $('.contact-profile .name').attr('groupAdmins', data.admins || '');

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
    getContentRate('.contact-profile', Math.round(averageRate));
    document.querySelector('.contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))

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
    getContentRate('.contact-profile', Math.round(averageRate));
    document.querySelector('.contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))
}

function openAndCloseProfile() {
    $('body').toggleClass('menu-active'); //add class
    $('.app-sidebar').toggleClass('active'); //remove
    $('.chitchat-main').toggleClass("small-sidebar"); //remove
    if ($(window).width() <= 1440) {
        $('.chitchat-container').toggleClass('sidebar-overlap');
        $('.chitchat-main').addClass("small-sidebar"); //remove
    }
    if ($('body').hasClass('menu-active')) {
        $('body').addClass('sidebar-active main-page');
        $('.app-sidebar').removeClass('active');
        $('.chitchat-main').removeClass("small-sidebar");
    }
}

function displayRecentChatFriends(recentChatUsers) {
    $owl = $('.recent-slider');
    $owl.trigger('destroy.owl.carousel');
    $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    $('.recent-slider').empty();
    recentChatUsers.forEach(item => {
        $('.recent-slider').append(`<div class="item">
            <div class="recent-box">
                <div class="dot-btn dot-success grow"></div>
                <div class="recent-profile">
                    <img class="bg-img" src="${item.avatar ? 'v1/api/downloadFile?path=' + item.avatar : '/images/default-avatar.png'}" alt="Avatar" />
                    <h6>${item.username}</h6>
                </div>
            </div>
        </div>`);
    });
    $('.recent-slider').owlCarousel({
        items: 3,
        dots: false,
        loop: true,
        margin: 60,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
            300: {
                items: 2,
                margin: 30,
            },
            320: {
                items: 3,
                margin: 20,
            },
            500: {
                items: 3,
                margin: 30,
            },
            560: {
                items: 3,
                margin: 80,
            },
            660: {
                items: 4,
                margin: 40,
            },
            800: {
                items: 2,
                margin: 30,
            },
        }
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
            console.log(res.data);
            if (res.state == 'true') {
                $('.history-list').empty();
                res.data.forEach((item, index) => {
                    let status = ['Holding', 'Completed'];
                    let senderInfo = getCertainUserInfoById(item.sender);
                    let receiverInfo = getCertainUserInfoById(item.recipient);
                    let sendFlag = item.sender == currentUserId ? true : false;
                    let avatar = sendFlag ? receiverInfo.avatar : senderInfo.avatar;
                    let amount = sendFlag ? (item.amount).toFixed(2) : (item.amount * 0.7).toFixed(2);
                    $('.history-list').append(`
                        <li class="accordion-item" userId=${sendFlag ? receiverInfo.id : senderInfo.id} sendFlag=${sendFlag}>
                            <h2 class="accordion-header" id="headingOne">
                            <div class="sent" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                <a>
                                    <div class="chat-box">
                                        <div class="profile bg-size"
                                            style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                            center; display: block;">
                                        </div>
                                        <div class="details">
                                            <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                                            <h6 class="title">${new Date(item.created_at).toLocaleDateString()}</h6>
                                        </div>
                                        <div class="date-status">
                                            <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                            <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body" key=${item.refer_id}>
                                    ${item.type == 0 ? `
                                        <div class="detailed_info">
                                            <img class="thumb" src="${item.thumb}" />
                                            <div class="send_heart">
                                                <i class="ti-heart"></i>
                                                <span>Send Thanks</span>
                                            </div>
                                        </div>` : `<span>This is Group ${item.group_title} Fee.</span>`}
                                </div>
                            </div>
                        </li>
                    `);

                })
            }
        },
        error: function (response) { }
    });
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
        }
        clearTimeout(keyuptimer);
        keyuptimer = setTimeout(() => {
            let value = $(this).val();
            if (value) {
                $(target).find('.chat-main>li').each(function () {
                    let title = $(this).find('.details h5').text().toLowerCase();
                    if (title.includes(value.toLowerCase())) {
                        $(this).removeClass('hidden');
                    } else {
                        $(this).addClass('hidden');
                    }
                });
            } else {
                $(target).find('.chat-main>li').each(function (item) {
                    $(this).removeClass('hidden');
                });
            }
        }, 100);
    });
}