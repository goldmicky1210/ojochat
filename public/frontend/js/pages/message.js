var oldRecipients = '';
var oldCastTitle = '';

$(document).ready(function () {
    $('#direct-tab').on('click', function () {
        getRecentChatUsers(1);
    });
    $('#group-tab').on('click', function () {
        getRecentChatUsers(2);
    });
    $('#cast-tab').on('click', function () {
        getRecentChatUsers(3);
    });

    // displayChatData();
    $('#direct ul.chat-main, #group ul.chat-main, #cast ul.chat-main').on('click', '>li', function (event) {
        event.stopPropagation();
        $(`#myTabContent1 .tab-pane.active .chat-main>li`).removeClass('active');
        $(this).addClass('active');

        let target = '.messages.active .contact-chat ul.chatappend';
        if ($('#direct').hasClass('active')) {
            currentDirectId = Number($(this).attr('groupId'));
            currentDirectUsers = $(this).attr('groupUsers');
            globalGroupId = currentDirectId;
            globalGroupUsers = currentDirectUsers;
            var pageSettingFlag = 1;
        } else if ($('#group').hasClass('active')) {
            currentGroupId = Number($(this).attr('groupId'));
            currentGroupUsers = $(this).attr('groupUsers');
            globalGroupId = currentGroupId;
            globalGroupUsers = currentGroupUsers;
            var pageSettingFlag = 2;
        } else if ($('#cast').hasClass('active')) {
            currentCastId = Number($(this).attr('groupId'));
            currentCastUsers = $(this).attr('groupUsers');
            globalGroupId = currentCastId;
            globalGroupUsers = currentCastUsers;
            var pageSettingFlag = 3;
        }
        showCurrentChatHistory(target, globalGroupId, globalGroupUsers, pageSettingFlag);

        var contentwidth = jQuery(window).width();
        if (contentwidth <= '768') {
            $('.chitchat-container').toggleClass("mobile-menu");
        }
        if (contentwidth <= '575') {
            $('.main-nav').removeClass("on");
        }
    });

    $('#direct ul.chat-main, #group ul.chat-main, #cast ul.chat-main').on('click', '.thread_info li.delete_thread', function (e) {
        e.stopPropagation();
        let groupId = $(this).closest('.chat-main>li').attr('groupId');
        // currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');

        console.log(groupId);
        // $(this).find('.thread_info_content').toggle();
        if (confirm('Delete this Thread?')) {
            let form_data = new FormData();
            form_data.append('groupId', groupId);
            $.ajax({
                url: '/message/deleteThread',
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
                    if (res.state = 'true') {
                        $(e.currentTarget).closest('.chat-main>li').remove();
                        // $(e.currentTarget).closest('.date-status').closest('li').remove();
                        // $(`#cast li[recipiet=${recipient}]`).remove();
                    }
                },
                error: function (response) {

                }
            });
        }
    });

    socket.on('arrive:message', message => {
        setTimeout(() => {
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('sent');
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('read');
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).addClass('arrived');
        }, 1000);
    });

    socket.on('read:message', message => {
        setTimeout(() => {
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('sent');
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('arrived');
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).addClass('read');
        }, 2000);
    });

    socket.on('receive:typing', data => {
        if ((data.sender != currentUserId) && (data.globalGroupId == globalGroupId)) {
            typingMessage(data.sender);
        }
    });

    socket.on('delete:message', data => {
        if (data.state) {
            let element = $('.chatappend').find(`[key=${data.id}]`).closest('li.msg-item');
            element.length ? element.remove() : '';
        } else {
            // let currentContactName = getCertainUserInfoById(currentContactId).username;
            // alert(`This photo has been paid by ${currentContactName}. You can not delete this. `);
            alert(`This Blink has been paid by other User. You can not delete this. `);
        }
    });

    socket.on('update:cast', (data) => {
        new Promise((resolve) => {
            getCastData(resolve);
        }).then(() => {
            $('#cast > ul.chat-main >li').removeClass('active');
            $('#cast > ul.chat-main >li').filter(function () {
                return $(this).find('.details>h5').text() === data.newCastTitle;
            }).addClass('active');
        });
    });

    $('#cast').on('click', 'li .date-status .ti-trash', function (e) {
        e.stopPropagation();
        if (confirm('Delete this Thread?')) {
            let recipients = $(this).closest('.date-status').closest('li').attr('recipients');
            let castTitle = $(this).closest('.date-status').closest('li').find('.details h5').text();
            console.log(recipients);
            console.log(castTitle);
            let form_data = new FormData();
            form_data.append('recipients', recipients);
            form_data.append('castTitle', castTitle);
            $.ajax({
                url: '/message/deleteCastThread',
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
                    if (res.state = 'true') {
                        $(e.currentTarget).closest('.date-status').closest('li').remove();
                        // $(`#cast li[recipiet=${recipient}]`).remove();
                    }
                },
                error: function (response) {

                }
            });
        }
    });

    $('.messages.active').scroll(() => {
        if ($('.messages.active').scrollTop() == 0) {
            // $('.chatappend').prepend(loader);

            let firstMessageId = $('.messages.active .chatappend .msg-item:first-child').attr('key');
            globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main li.active').attr('groupId');
            if (firstMessageId) {
                let form_data = new FormData();
                form_data.append('firstMessageId', firstMessageId);
                form_data.append('globalGroupId', globalGroupId);
                $.ajax({
                    url: '/home/loadMoreMessages',
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
                        if (res.messageData) {
                            let target = '.messages.active .contact-chat ul.chatappend';
                            res.messageData.forEach(item => {
                                item.messageId = item.id;
                                // addChatItem(target, item.sender, item, true);
                                addGroupChatItem(target, item, true);

                            });
                            if (res.messageData.length) $('.messages').scrollTop(50);
                        }
                        $('#loader').hide();
                    },
                    error: function (response) {
                        $('#loader').hide();
                    }
                });
            }
        }
    });

    $('#custom_modal ul.chat-main').on('click', 'li', function (e) {
        if ($(this).find('.form-check-input').length) {
            $(this).find('.form-check-input').prop('checked', !$(this).find('.form-check-input')[0].checked);
            $(this).toggleClass('active');
        }
    });

    //reply message
    $('.messages').on('click', '.replyBtn', function (e) {
        let replyKind = $(this).closest('li.msg-item').attr('kind');
        console.log('replyKind:', replyKind);
        let messageContent = replyKind == 0 ? $(this).closest('li.msg-setting-main').find('.content').text() : '';
        if (replyKind == 2) {
            let imageSrc = $(this).closest('.msg-setting-main').find('.receive_photo').attr('src');
            let photoId = $(this).closest('.msg-setting-main').find('.receive_photo').attr('photoId');
            console.log(photoId)
            messageContent = `<img src="${imageSrc}" width="50">`;
        }
        let replyId = $(this).closest('li.msg-item').attr('key');
        $('#content .chat-content>.replyMessage .replyContent').html(messageContent);
        $('#content .chat-content>.replyMessage').attr('replyId', replyId);
        $('#content .chat-content>.replyMessage').attr('replyKind', replyKind);
        $('#content .chat-content>.replyMessage').show();
    });

    //edit reply message
    $('.messages').on('click', '.replyEditBtn', function (e) {
        $('#photo_item .modal-content .btn-group.edit_btn_group').css('display', 'flex');
        $('#photo_item .modal-content .btn-group.open_btn_group').css('display', 'none');
        $('#photo_item').attr('edit', 'true');
        let id = $(e.currentTarget).closest('li.msg-item').attr('key');
        $('.selected-emojis').empty();
        selectedEmojis = [];
        showPhotoContent(id);
    });


    $('#photo_item').on('hidden.bs.modal', function () {
        $(this).removeAttr('edit');
        $('.blur-tool').slideUp();
        $('.text-tool').slideUp();
    });

    $('#content').on('click', 'div.replyMessage > span.closeIcon', function (e) {
        $('#content .chat-content>.replyMessage').removeAttr('replyId');
        $('#content .chat-content>.replyMessage').removeAttr('replyKind');
        // $('#content .chat-content>.replyMessage').removeAttr('forwardId');
        // $('#content .chat-content>.replyMessage').removeAttr('forwardKind');
        $('#content .chat-content>.replyMessage').hide();
    });

    // Forward Message
    $('.messages').on('click', '.forwardBtn', function (e) {
        let forwardId = $(this).closest('li.msg-item').attr('key');
        let forwardKind = $(this).closest('li.msg-item').attr('kind');
        // console.log('replyKind:', forwardKind);
        // let messageContent = forwardKind == 0 ? $(this).closest('li.msg-setting-main').find('.content').text() : '';
        // if (forwardKind == 2) {
        //     let imageSrc = $(this).closest('.msg-setting-main').find('.receive_photo').attr('src');
        //     let photoId = $(this).closest('.msg-setting-main').find('.receive_photo').attr('photoId');
        //     console.log(photoId)
        //     messageContent = `<img src="${imageSrc}" width="50">`;
        // }
        // $('#content .chat-content>.replyMessage .replyContent').html(messageContent);
        // $('#content .chat-content>.replyMessage').attr('forwardId', forwardId);
        // $('#content .chat-content>.replyMessage').attr('forwardKind', forwardKind);
        // $('#content .chat-content>.replyMessage').show();
        // $('#forwardUsersListModal').modal('show');
        // $('#forwardUsersListModal').attr('forwardId', forwardId);
        // $('#forwardUsersListModal').attr('forwardKind', forwardKind);

        $('#custom_modal').modal('show');
        $('#custom_modal').attr('forwardId', forwardId);
        $('#custom_modal').attr('forwardKind', forwardKind);
        $('#custom_modal .modal-content').addClass('forward_message_modal');
        $('#custom_modal').find('.modal-title').text('Forward To:');
        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.btn_group .btn').hide();

        new Promise((resolve) => getContactListData(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<button class="btn btn-outline-primary button-effect btn-sm forward_btn" type="button">Send</button>';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });

    });

    $('#custom_modal').on('hidden.bs.modal', function (e) {
        $('#custom_modal').removeAttr('forwardId');
        $('#custom_modal').removeAttr('forwardKind');
        $('#custom_modal').find('.sub_title').show();
        $('#custom_modal').find('.btn_group .btn').show();
        $('#custom_modal .modal-content').removeClass('forward_message_modal');
    });

    $('#custom_modal').on('click', '.modal-content.forward_message_modal .chat-main .date-status .btn.forward_btn', function (e) {
        if ($(this).hasClass('btn-outline-primary')) {
            $(this).addClass('btn-success');
            $(this).removeClass('btn-outline-primary');
            $(this).text('Sent');
            let forwardId = $('#custom_modal').attr('forwardId');
            let forwardKind = $('#custom_modal').attr('forwardKind');
            let recipient = $(this).closest('li').attr('key');
            socket.emit('forward:message', { recipient, forwardId, forwardKind });
        }
    });

    // Copy Message
    $('.messages').on('click', '.copyBtn', function (e) {
        copiedContent = $(this).closest('li.msg-setting-main').find('.content').text();
        // let element = $(this).closest('li.msg-setting-main').find('.content');
        // console.log(copiedContent);
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(copiedContent).select();
        document.execCommand("copy");
        $temp.remove();
    });

});

function getCastData(resolve) {
    $.ajax({
        url: '/home/getCastData',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                let target = '#cast > ul.chat-main';
                $(target).empty();
                res.castData.forEach(item => {
                    let title = item.cast_title;
                    let recipients = item.recipients.split(', ').map(item => getCertainUserInfoById(item).username).join(', ');
                    let countRecipients = item.recipients.split(', ').length;
                    let displayNames = recipients.length > 24 ? recipients.slice(0, 24) + '...' : recipients;
                    $(target).append(
                        `<li data-to="cast_chat" recipients="${item.recipients}">
                            <div class="chat-box">
                                <div class="profile bg-size" style="background-image: url('/images/default-avatar.png'); background-size: cover; background-position: center center; display: block;">
                                    
                                </div>
                                <div class="details">
                                    <h5>${title}</h5>
                                    <h6>${countRecipients} : ${displayNames}</h6>
                                </div>
                                <div class="date-status">
                                    <div class="msg-dropdown-main">
                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                        <div class="msg-dropdown">
                                            <ul>
                                                <li>
                                                    <a class="icon-btn btn-outline-light btn-sm list_info" href="#">
                                                        <img src="/images/icons/info.svg" alt="info">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="icon-btn btn-outline-light btn-sm" href="#">
                                                        <i class="ti-trash"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`
                    );
                    if (resolve) resolve();
                });
            }
        },
        error: function (response) { }
    });
}

function convertListItems() {
    $(".bg-top").parent().addClass('b-top');
    $(".bg-bottom").parent().addClass('b-bottom');
    $(".bg-center").parent().addClass('b-center');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $('.bg-img').each(function () {
        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();
        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'display': 'block'
        });
        el.hide();
    });
}
