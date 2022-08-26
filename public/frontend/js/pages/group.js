
let groupFeeTypeConstant = ['Free', "Monthly", "Anually", "Lifetime"];
$(document).ready(function () {
    // create newGroup start

    $('.create_new_group_btn').on('click', function () {
        let groupId = $('#myTabContent1 .tab-pane.active .group-main li.active').attr('groupId');
        let groupTitle = $('#myTabContent1 .tab-pane.active .group-main li.active .details h5').text() || 'Group Title is undefined';
        let groupAatarSrc = $('.messages.active .contact-details .media .bg-img').attr('src');
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('create_new_group_modal');
        $('#custom_modal').find('.modal-title').text('Create New Group');
        $('#custom_modal').find('.btn_group .btn').text('Create');
        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.group_title input').val('');
        // $('#custom_modal').find('.search_field').hide();
        // $('#custom_modal').find('.chat-main').hide();
        $('#custom_modal').find('.modal-body .group_avatar').remove();
        $('#custom_modal').find('.modal-body').prepend(`
            <div class="group_avatar profile" id="group_profile_avatar_create">
                <img class="bg-img" src="/images/default-avatar.png">
                <input class="input-file" type="file" id="group_avatar_select">
            </div>
            <div class="form-group group_title">
                <label>Group Title</label>
                <input type="text" class="form-control" />
            </div>
            <div class="form-group group_description">
                <label>Group Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        `);
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });

        $('#custom_modal').find('.modal-body .group_description').after(`
                <div class="group_fee_type">
                    <div class="form-group fee_type" style="margin-bottom: 10px">
                        <label>Group Fee Type</label>
                        <select class="form-select form-select-sm" aria-label="Default select example">
                            <option value=0 selected>Free</option>
                            <option value=1>Monthly</option>
                            <option value=2>Anually</option>
                            <option value=3>Lifetime</option>
                        </select>
                    </div>
                </div>
            `);
        
        convertListItems();
        changeGroupProfileImageAjax();

        document.getElementById("group_profile_avatar_create")
            .addEventListener('click', function () {
                let adminList = $('.contact-profile .name').attr('groupAdmins').split(',');
                if (adminList.includes(currentUserId.toString())) {
                    document.getElementById("group_avatar_select").click();
                }
            }, false);
    });
    $('#custom_modal').on('click', '.modal-content.create_new_group_modal .btn_group .btn', function () {

        // setTimeout(() => {
        //     $(`#group-tab`).click();
        // }, 100);

        let title = $('#custom_modal').find('.group_title input').val();
        console.log(title);
        if (!title) {
            $('#custom_modal .group_title input').addClass('is-invalid');
            setTimeout(() => {
                $('#custom_modal .group_title input').removeClass('is-invalid');
            }, 2000);
            return;
        }
        let description = $('#custom_modal').find('.group_description textarea').val();
        let feeType = $('#custom_modal').find('.group_fee_type select').val();
        let feeValue = $('#custom_modal').find('.group_fee_type .fee_value input').val();
        let avatar = $('#group_avatar_select')[0].files[0];
        let users = Array.from($('#custom_modal .chat-main li.active')).map(item => $(item).attr('key'));
        users.push(currentUserId);
        var form_data = new FormData();
        form_data.append('avatar', avatar || null);
        $.ajax({
            url: '/home/getUploadFileURL',
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
                    socket.emit('create:group', { title, description, feeType, feeValue, avatar: res.data, users, type: 2 });

                    // socket.emit('edit:groupProfile', { groupId, groupTitle, groupDescription, groupFeeType, groupFeeValue, groupAvatar: res.data }, (res) => {
                    //     if (res.status == 'OK') {
                    //         console.log('Group Profile changed');
                    //     }
                    // });
                }
            },
            error: function (response) {

            }
        });

        $('#custom_modal').modal('hide');
        $('#custom_modal .modal-content').removeClass('create_new_group_modal');
        $(`.chat-cont-setting`).removeClass('open');

    });
    $('#custom_modal .modal-body').on('change', '.group_fee_type select', function () {
        let groupFeeType = $(this).val();
        if (+groupFeeType) {
            console.log(groupFeeType, ": ok");
            if (!$('#custom_modal .modal-body .group_fee_type .fee_value').length) {
                $('#custom_modal').find('.modal-body .group_fee_type').append(`
                        <div class="form-group fee_value">
                            <label>Group Fee Value ($)</label>
                            <input type="number" class="form-control form-control-sm" />
                        </div>
                    `);
            }
        } else {
            console.log(groupFeeType, ": delete");
            $('#custom_modal').find('.modal-body .group_fee_type .fee_value').remove();
        }
    });
    // $('.create_new_group_btn').on('click', function (e) {
    //     $('#custom_modal').modal('show');
    //     $('#custom_modal .modal-content').addClass('create_new_group_modal');
    //     $('#custom_modal').find('.modal-title').text('Create New Group');
    //     $('#custom_modal').find('.sub_title span').text('Group Title');
    //     $('#custom_modal').find('.sub_title input').val('');
    //     $('#custom_modal').find('.btn_group .btn').text('Next');
    //     new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
    //         let target = '#custom_modal .chat-main';
    //         $(target).empty();
    //         let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
    //         contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
    //     });
    // });

    // $('#custom_modal').on('click', '.modal-content.create_new_group_modal .btn_group .btn', function () {
    //     let title = $('#custom_modal').find('.sub_title input').val();
    //     if (!title) {
    //         $('#custom_modal .sub_title input').addClass('is-invalid');
    //         setTimeout(() => {
    //             $('#custom_modal .sub_title input').removeClass('is-invalid');
    //         }, 2000);
    //         return;
    //     }
    //     let users = Array.from($('#custom_modal .chat-main li.active')).map(item => $(item).attr('key'));
    //     users.push(currentUserId);
    //     $('#custom_modal').modal('hide');
    //     $(`.chat-cont-setting`).removeClass('open');
    //     $('#custom_modal .modal-content').removeClass('create_new_group_modal');
    //     socket.emit('create:group', { title, users, type: 2 });

    //     setTimeout(() => {
    //         $(`#group-tab`).click();
    //     }, 100);

    // });
    // create new group end

    // create new cast start
    $('.create_new_cast_btn').on('click', function (e) {
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('create_new_cast_modal');
        $('#custom_modal').find('.modal-title').text('Create New Cast');
        $('#custom_modal').find('.sub_title span').text('Cast Title');
        $('#custom_modal').find('.sub_title input').val('');
        $('#custom_modal').find('.btn_group .btn').text('Create');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });
    });

    $('#custom_modal').on('click', '.modal-content.create_new_cast_modal .btn_group .btn', function () {
        let title = $('#custom_modal').find('.sub_title input').val();
        if (!title) {
            $('#custom_modal .sub_title input').addClass('is-invalid');
            setTimeout(() => {
                $('#custom_modal .sub_title input').removeClass('is-invalid');
            }, 2000);
            return;
        }
        let users = Array.from($('#custom_modal .chat-main li.active')).map(item => $(item).attr('key'));
        users.push(currentUserId);
        socket.emit('create:group', { title, users, type: 3 });
        $('#custom_modal').modal('hide');
        $(`.chat-cont-setting`).removeClass('open');
        $('#custom_modal .modal-content').removeClass('create_new_cast_modal');
        setTimeout(() => {
            $(`#cast-tab`).click();
        }, 100);

    });
    // create new cast end

    socket.on('create:group', data => {
        if (data.type == 1) {
            var target = '#direct > ul.chat-main';
        } else if (data.type == 2) {
            var target = '#group > ul.group-main';
        } else if (data.type == 3) {
            var target = '#cast > ul.group-main';
        }
        // $(`#myTabContent .tab-pane.active .chat-main li[groupId=${data.id}`).addClass('active');
        addNewGroupItem(target, data);
        $(`#myTabContent1 .tab-pane.active .group-main li[groupId=${data.id}]`).click();
        convertListItems();
    });


    socket.on('send:groupMessage', data => {
        $(`#direct > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
        $(`#group > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#group > ul.chat-main li:eq(0)');
        $(`#cast > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#cast > ul.chat-main li:eq(0)');
        if (currentDirectId == data.globalGroupId) {
            var target = '#direct_chat .contact-chat ul.chatappend';
        } else if (currentGroupId == data.globalGroupId) {
            var target = '#group_chat .contact-chat ul.chatappend';
        } else if (currentCastId == data.globalGroupId) {
            var target = '#cast_chat .contact-chat ul.chatappend';
        }
        else if (!$(`#group > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).length) {
            console.log('This is first contact');
        }
        addGroupChatItem(target, data);
        $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');

        // SMS notification
        if (currentUserId != data.sender) {
            let msgType = data.kind == 2 ? 'Blink' :
                data.kind == 1 ? 'request' :
                    data.kind == 0 ? 'text' : "new";
            //arrived message
            // socket.emit('arrive:message', data);
            if (document.visibilityState == "visible") {
                if (currentContactId == data.sender) {
                    //unread -> read
                    socket.emit('read:message', data);
                }
            } else {
                data.recipient = currentUserId;
                socket.emit('send:notification', data);
                // socket.emit('send:notification', {
                //     sender: data.sender,
                //     recipient: currentUserId,
                //     groupId: data.globalGroupId,
                //     senderName: data.senderName,
                //     type: msgType,
                //     groupType: data.groupType,
                // });
            }
        }
    });

    $('#group_chat').on('click', '.leave_group_btn', function () {
        if (confirm("You will leave this Group")) {
            if (currentGroupId) {
                socket.emit('leave:group', { currentGroupId, currentGroupUsers, currentUserId });
            }
        }
    });

    socket.on('leave:group', data => {
        if (data.state == true) {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            currentGroupUsers = $('#group .group-main>li.active').next().attr('groupUsers') || $('#group .group-main>li.active').prev().attr('groupUsers');
            $('#group .group-main>li.active').remove();
            $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
        } else {
            // alert("You are owner of this group. You can't leave group.")
        }
    });

    $('#group_chat').on('click', '.remove_group_btn', function () {
        let content = 'You will remove this Group?'
        let removeGroupAction = () => {
            socket.emit('remove:group', { currentGroupId });
            // currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            // setTimeout(() => {
            //     $('#group .group-main>li.active').slideUp(300, () => {
            //         $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
            //         if (!currentGroupId) {
            //             $('#group_chat .chatappend').empty();
            //         }
            //     });
            // });
        }
        confirmModal('', content, removeGroupAction);
    });

    socket.on('remove:group', data => {
        if (data.state == true) {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            setTimeout(() => {
                $('#group .group-main>li.active').slideUp(300, () => {
                    $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
                    if (!currentGroupId) {
                        $('#group_chat .chatappend').empty();
                    }
                });
            });
        } else {
            // alert("You are owner of this group. You can't leave group.")
        }
    });

    // edit group profile
    $('.chat-frind-content').on('click', '.edit_group_profile_btn', function () {
        let groupId = $('#myTabContent1 .tab-pane.active .group-main li.active').attr('groupId');
        let groupTitle = $('#myTabContent1 .tab-pane.active .group-main li.active .details h5').text() || 'Group Title is undefined';
        let groupAatarSrc = $('.messages.active .contact-details .media .bg-img').attr('src');
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('edit_group_profile_modal');
        $('#custom_modal').find('.modal-title').text('Edit Group Profile');
        $('#custom_modal').find('.btn_group .btn').text('Save');
        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.search_field').hide();
        $('#custom_modal').find('.chat-main').hide();
        $('#custom_modal').find('.modal-body .group_avatar').remove();
        $('#custom_modal').find('.modal-body').prepend(`
            <div class="group_avatar profile" id="group_profile_avatar">
                <img class="bg-img" src=${groupAatarSrc}>
                <input class="input-file" type="file" id="group_avatar_select">
            </div>
            <div class="form-group group_title">
                <label>Group Title</label>
                <input type="text" class="form-control" />
            </div>
            <div class="form-group group_description">
                <label>Group Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        `);
        $('#custom_modal').find('.group_title input').val(groupTitle);

        if ($('.messages.active').attr('id') == 'group_chat') {
            $('#custom_modal').find('.modal-body .group_description').after(`
                <div class="group_fee_type">
                    <div class="form-group fee_type">
                        <label>Group Fee Type</label>
                        <select class="form-select form-select-sm" aria-label="Default select example">
                            <option value=0 selected>Free</option>
                            <option value=1>Monthly</option>
                            <option value=2>Anually</option>
                            <option value=3>Lifetime</option>
                        </select>
                    </div>
                </div>
            `);
        }
        convertListItems();
        changeGroupProfileImageAjax();

        document.getElementById("group_profile_avatar")
            .addEventListener('click', function () {
                let adminList = $('.contact-profile .name').attr('groupAdmins').split(',');
                if (adminList.includes(currentUserId.toString())) {
                    document.getElementById("group_avatar_select").click();
                }
            }, false);
    });

    $('#custom_modal').on('click', '.modal-content.edit_group_profile_modal .btn_group .btn', function () {
        let groupId = $('#myTabContent1 .tab-pane.active .group-main li.active').attr('groupId');
        let groupTitle = $('#custom_modal').find('.sub_title input').val();
        let groupDescription = $('#custom_modal').find('.group_description textarea').val();
        let groupFeeType = $('#custom_modal').find('.group_fee_type select').val();
        let groupFeeValue = $('#custom_modal').find('.group_fee_type .fee_value input').val();
        let groupAvatar = $('#group_avatar_select')[0].files[0];
        if (groupId && groupTitle) {
            var form_data = new FormData();
            form_data.append('avatar', groupAvatar || null);
            $.ajax({
                url: '/home/getUploadFileURL',
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
                        socket.emit('edit:groupProfile', { groupId, groupTitle, groupDescription, groupFeeType, groupFeeValue, groupAvatar: res.data }, (res) => {
                            if (res.status == 'OK') {
                                console.log('Group Profile changed');
                            }
                        });
                    }
                },
                error: function (response) {

                }
            });
        }

        $('#custom_modal .modal-content').removeClass('edit_group_profile_modal');
        $('#custom_modal').modal('hide');
    });
    $('#custom_modal').on('hidden.bs.modal', function () {
        $('#custom_modal').find('.search_field').show();
        $('#custom_modal').find('.sub_title').show();
        $('#custom_modal').find('.chat-main').show();
        $('#custom_modal').find('.modal-body .group_avatar').remove();
        $('#custom_modal').find('.modal-body .group_title').remove();
        $('#custom_modal').find('.modal-body .group_description').remove();
        $('#custom_modal').find('.modal-body .group_fee_type').remove();

        $('#custom_modal .modal-content').removeClass('create_new_group_modal');
        $('#custom_modal .modal-content').removeClass('create_new_cast_modal');
        $('#custom_modal .modal-content').removeClass('edit_group_profile_modal');
        $('#custom_modal .modal-content').removeClass('edit_group_modal');
        $('#custom_modal .modal-content').removeClass('invite_group_modal');

    });

    // add/remove user in group
    $('#group_chat .chat-frind-content').on('click', '.add_users_btn', function () {
        let groupTitle = $('#group .group-main li.active .details h5').text() || 'Group Title is undefined';
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('edit_group_modal');
        $('#custom_modal').find('.modal-title').text('Add/Remove Group Users');
        $('#custom_modal').find('.sub_title span').text('Group Title');
        $('#custom_modal').find('.sub_title input').val(groupTitle);
        $('#custom_modal').find('.btn_group .btn').text('Save');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
            currentGroupUsers.split(',').forEach(userId => {
                $(`#custom_modal ul.chat-main li[key=${userId}] input`).prop('checked', true);
                $(`#custom_modal ul.chat-main li[key=${userId}]`).addClass('active');
            });
        });
    });

    $('#custom_modal').on('click', '.modal-content.edit_group_modal .btn_group .btn', function () {
        let groupUsers = Array.from($('#custom_modal ul.chat-main li.active')).map(listItem => $(listItem).attr('key'));
        groupUsers.push(currentUserId);
        socket.emit('edit:groupUsers', { currentGroupId, groupUsers: groupUsers.join(',') }, (res) => {
            if (res.status == 'OK') {
                $('#group-tab').click();
            }
        });
        $('#custom_modal .modal-content').removeClass('edit_group_modal');
        $('#custom_modal').modal('hide');
    });

    //invite users in group 
    $('#group_chat .chat-frind-content').on('click', '.invite_users_btn', function () {
        let groupTitle = $('#group .group-main li.active .details h5').text() || 'Group Title is undefined';
        let groupId = currentGroupId || $('#group .group-main li.active').attr('groupId');
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('invite_group_modal');
        $('#custom_modal').find('.modal-title').text('Invite Users');
        $('#custom_modal').find('.sub_title span').text('Group Title');
        $('#custom_modal').find('.sub_title input').val(groupTitle);
        $('#custom_modal').find('.btn_group .btn').text('Invite');
        // $('#custom_modal').find('.btn_group').append(`<span class="invite_link">https://ojochat.com/groupinvite/?groupid=${groupId}</span>`);

        new Promise((resolve) => getContactListData(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => !currentGroupUsers.split(',').find(id => item.id == id)).forEach(item => addUsersListItem(target, item, statusItem));
            // contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });
    });

    $('#custom_modal').on('click', '.modal-content.invite_group_modal .btn_group .btn', function () {
        let groupUsers = Array.from($('#custom_modal ul.chat-main li.active')).map(listItem => $(listItem).attr('key')).join(',');
        let groupTitle = $('#group .chat-main>li.active .details>h5').text();
        let senderName = getCertainUserInfoById(currentUserId).username || 'Someone';
        socket.emit('invite:groupUsers', { currentGroupId, groupUsers, groupTitle, senderName }, (res) => {
            if (res.status == 'OK') {
                $('#group-tab').click();
            }
        });
        $('#custom_modal .modal-content').removeClass('invite_group_modal');
        // $('#custom_modal').find('.btn_group span').remove();
        $('#custom_modal').modal('hide');
    });

    $('.messages .chatappend').on('click', '.msg-item.sent .msg-setting-main .invite_link', function (e) {
        e.preventDefault();
        $('.messages.custom-scroll').removeClass("active");
        $('#group_chat').addClass("active");
        $('#direct-tab').removeClass('active show');
        $('#group-tab').addClass('active show');
        $('#direct').removeClass('active show');
        $('#group').addClass('active show');
        $(`#group .chat-main>li`).removeClass('active');

        let target = '#group_chat .chatappend';
        currentGroupId = $(this).attr('inviteGroupId');
        if ($(`#group .chat-main>li[groupId=${currentGroupId}]`).length) {
            $(`#group .chat-main>li[groupId=${currentGroupId}]`).addClass('active');
            currentGroupUsers = $(`#group .chat-main>li[groupId=${currentGroupId}]`).attr('groupUsers');
            globalGroupId = currentGroupId;
            globalGroupUsers = currentGroupUsers;
            showCurrentChatHistory(target, currentGroupId, currentGroupUsers, 2);
        } else {
            socket.emit('add:pendingGroupUser', { currentGroupId, currentUserId }, res => {
                if (res.status == 'OK') {
                    getRecentChatUsers(2);
                }
            });

        }
    });


    // showProfile in groupusers
    let touchtime = 0;
    $('.groupuser').on('click', '.gr-profile', function () {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                let userId = $(this).data('userId');
                setUserProfileContent(userId);
                // openAndCloseProfile();
                touchtime = 0;

                $('body').addClass('menu-active'); //add class
                $('.app-sidebar').addClass('active'); //remove
                $('.chitchat-main').addClass("small-sidebar"); //remove
                if ($(window).width() <= 1440) {
                    $('.chitchat-container').addClass('sidebar-overlap');
                    $('.chitchat-main').removeClass("small-sidebar"); //remove
                }
                if ($('body').hasClass('menu-active')) {
                    $('body').addClass('sidebar-active main-page');
                    $('.app-sidebar').removeClass('active');
                    $('.chitchat-main').removeClass("small-sidebar");
                }
                $('.chitchat-right-sidebar .contact-profile .medialogo').hide();
                let owner = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('owner');
                let admins = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('admins');
                if (admins.split(',').includes(currentUserId.toString())) {
                    $('.chitchat-right-sidebar .contact-profile .group_operation').show();
                    $('.chitchat-right-sidebar .contact-profile .group_operation').attr('profileId', userId);
                } else {
                    $('.chitchat-right-sidebar .contact-profile .group_operation').hide();
                    $('.chitchat-right-sidebar .contact-profile .group_operation').removeAttr('profileId');
                }
                if (admins.split(',').includes(userId.toString())) {
                    let name = $('.chitchat-right-sidebar .contact-profile .details .name h3').text();
                    $('.chitchat-right-sidebar .contact-profile .details .name h3').text(`${name} (admin)`);
                }
            } else {
                // not a double click so set as a new first click
                touchtime = new Date().getTime();
            }
        }
    });

    $('.chitchat-right-sidebar .contact-profile .group_operation').on('click', 'li.make_admin_btn', function () {
        let globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('groupId');
        let groupTitle = $('#myTabContent1 .tab-pane.active .chat-main>li.active .details h5').text();
        let admins = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('admins');
        let addId = $('.chitchat-right-sidebar .contact-profile .group_operation').attr('profileId');

        if (admins.split(',').includes(addId.toString())) {
            alert('This user is already Admin of this group ' + groupTitle);
        } else {
            admins = admins + ',' + addId;
            let senderName = getCertainUserInfoById(currentUserId).username;
            socket.emit('add:groupAdmin', { globalGroupId, admins, addId, groupTitle, senderName }, res => {
                if (res.status == 'OK') {
                    let addName = getCertainUserInfoById(addId).username;
                    let currentUsername = getCertainUserInfoById(addId).username;
                    console.log(`${addName} has become as admin of group ${groupTitle} by ${currentUsername}`);
                }
            });
        }
    });

    $('.chitchat-right-sidebar .contact-profile .group_operation').on('click', 'li.remove_groupuser_btn', function () {
        let globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('groupId');
        let groupTitle = $('#myTabContent1 .tab-pane.active .chat-main>li.active .details h5').text();
        let admins = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('admins');
        let removeId = $('.chitchat-right-sidebar .contact-profile .group_operation').attr('profileId');
        let senderName = getCertainUserInfoById(currentUserId).username;
        if (currentUserId != removeId) {
            if (admins.split(',').includes(removeId.toString())) {
                admins = admins.split(',').filter(id => id != removeId).join(',');
            }
            socket.emit('remove:groupUser', { globalGroupId, admins, removeId, groupTitle, senderName }, res => {
                if (res.status == 'OK') {
                    $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('admins', admins);
                    let groupUsers = $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('groupUsers');
                    groupUsers = groupUsers.split(',').filter(id => id != removeId).join(',');
                    $('#myTabContent1 .tab-pane.active .chat-main>li.active').attr('groupUsers', groupUsers);
                    $('.messages.active .groupuser').find(`.gr-profile[data-user-id=${removeId}]`).remove();
                    let removeName = getCertainUserInfoById(removeId).username;
                    let currentUsername = getCertainUserInfoById(currentUserId).username;
                    console.log(`${removeName} has been removed from group ${groupTitle} by ${currentUsername}`);
                }
            });
        }
    });
});

function addUsersListItem(target, data, statusItem) {
    $(target).prepend(
        `<li data-to="blank" key="${data.id}">
            <div class="chat-box">
                <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                    
                </div>
                <div class="details">
                    <h5>${data.username}</h5>
                    <h6>${data.description || 'Hello'}</h6>
                </div>
                <div class="date-status">
                    ${statusItem}
                </div>
            </div>
        </li>`
    );
}

function addNewGroupItem(target, data) {
    let { id, title, avatar, type, users, owner, admins } = data;
    if (type == 1) {
        let directId = users.find(item => item != currentUserId);
        let userInfo = getCertainUserInfoById(directId);
        avatar = userInfo.avatar;
        title = userInfo.username;
        var description = userInfo.description;
    }
    let groupUsersAvatar = users.filter((item, index) => index < 3).map(item => {
        let avatar = getCertainUserInfoById(item).avatar;
        avatar = avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png';
        return { id: item, avatar: avatar };
    });
    let avatarContents = groupUsersAvatar.reduce((content, item) => content + `<li userId=${item.id}><a class="group-tp" href="#" data-tippy-content="John Doe"> <img src="${item.avatar}" alt="group-icon-img"/></a></li>\n`, '');
    avatarContents = type == 1 ? '' : avatarContents;
    // let displayNames = groupUsers.length > 24 ? groupUsers.slice(0, 24) + '...' : groupUsers;
    let countRecipients = users.length;
    $(target).prepend(
        `<li class="" data-to="group_chat" groupId=${id} groupUsers=${users.join(',')} owner=${owner} admins=${admins}>
            <div class="group-box">
                <div class="profile">
                    <img class="bg-img" src=${avatar ? 'v1/api/downloadFile?path=' + avatar : '/images/default-avatar.png'} alt="Avatar"/>
                </div>
                <div class="details">
                    <h5>${title}</h5>
                    <h6>${data.lastMessageSender ? data.lastMessageSender + ': ' : ''}${data.lastMessageContent || description || ''}</h6>
                </div>
                <div class="date-status">
                    <h6 class="last_message_date">${data.lastMessageDate ? getThreadTimeString(data.lastMessageDate) : ''}</h6>
                    <ul class="grop-icon">
                        ${avatarContents}
                        ${countRecipients > 3 ? "<li>+" + (countRecipients - 3) + "</li>" : ""}
                    </ul>
                    <div class="thread_info">
                        <a class="icon-btn btn-xs btn-light bg-transparent button-effect outside" href="#"><i class="ti-more-alt"></i></a>
                        <div class="thread_info_content">
                            <ul>
                                <li class="delete_thread">
                                    <a class="icon-btn btn-outline-primary button-effect btn-xs"
                                        href="#"><i class="ti-trash"></i></a>
                                    <h5>Remove</h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>`
    );
}

function addGroupChatItem(target, data, loadFlag) {
    let replyId = data.replyId || data.reply_id;
    let replyKind = data.replyKind || data.reply_kind || 0;
    if (replyId) {
        if (replyKind == 0) {
            var replyContent = $('.chatappend').find(`li.msg-item[key="${replyId}"]`).find('.msg-setting-main .content').text();
        } else if (replyKind == 2) {
            let imageSrc = $('.chatappend').find(`li.msg-item[key="${replyId}"]`).find('.receive_photo').attr('src');
            var replyContent = `<img src="${imageSrc}" width="50">`;
        } else if (replyKind == 4) {
            let imageSrc = $('.chatappend').find(`li.msg-item[key="${replyId}"]`).find('.file_photo').attr('src');
            var replyContent = `<img src="${imageSrc}" width="50">`;
        }
    }
    let senderInfo = getCertainUserInfoById(data.sender);
    let type = senderInfo.id == currentUserId ? "replies" : "sent";
    let time = data.created_at ? new Date(data.created_at) : new Date();

    if (data.kind == 3) {
        var inviteContent = `
        <div class="content invite_link" inviteGroupId=${data.content}>
            <p class="invite_group_title">Join Group: ${data.inviteGroupTitle}</p>
            <p class="invite_group_fee">${data.inviteGroupFeeType ? "Price " + groupFeeTypeConstant[data.inviteGroupFeeType] + ": $" + data.inviteGroupFeeValue : "Free"}</p>
            <button class="btn btn-sm btn-success">Pay</button>
         </div>`;
    } else if (data.kind == 4) {
        var fileContent = getFileContent(data);
    }
    let item = `<li class="${type} msg-item" key="${data.messageId || data.id}" kind="${data.kind || 0}">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6 class="${State[data.state || 0]}">${getChatTimeString(time)}</h6>
                    <div class="photoRating">
                        <div>★</div><div>★</div><div>★</div><div>★</div><div>★</div>
                    </div>
                    <ul class="msg-box">
                        <li class="msg-setting-main">
                            ${data.kind == 0 || data.kind == null ?
            `${replyId ? '<div class="replyMessage">\
                <span class="replyIcon"><i class="fa fa-reply"></i></span>\
                <span class="replyContent">' + replyContent + '</span>\
                <hr style="color: black">\
                <span class="content">' + data.content + '</span>\
            </div>' : '<h5 class="content">' + data.content + '</h5>'}`
            : data.kind == 1 ?
                `<div class="camera-icon" requestid="${data.requestId}">$${data.content}</div>`
                : data.kind == 2 ? `<img class="receive_photo" messageId="${data.messageId}" photoId="${data.photoId}" src="${data.content}">`
                    : data.kind == 3 ? inviteContent 
                        : data.kind == 4 ? fileContent : ''}
                            <div class="msg-dropdown-main">
                                <div class="msg-open-btn"><span>Open</span></div>
                                <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                <div class="msg-dropdown"> 
                                    <ul>
                                        <li class="replyBtn"><a href="#"><i class="fa fa-reply"></i>reply</a></li>
                                        <li class="forwardBtn"><a href="#"><i class="fa fa-share"></i>forward</a></li>
                                        ${data.kind == 0 ? '<li class="copyBtn"><a href="#"><i class="fa fa-copy"></i>copy</a></li>' : ''}
                                        ${data.kind == 2 ? '<li class="replyEditBtn"><a href="#"><i class="fa fa-edit"></i>edit</a></li>' : ''}
                                        <li class="rateBtn"><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                                        <li class="deleteMessageBtn"><a href="#"><i class="ti-trash"></i>delete</a></li>
                                    </ul>
                                </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </li>`;
    if (loadFlag) {
        $(target).prepend(item);
    } else {
        $(target).append(item);
    }
    // $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');

    if (data.rate) {
        getContentRate(`li.msg-item[key="${data.id}"]`, Math.round(data.rate))
    }
}

function getFileContent(data) {
    let fileContent = '';
    switch(data.fileType.toLowerCase()) {
        case 'jpeg':
        case 'png':
            fileContent = `<img class="file_photo" messageId="${data.id}" src="v1/api/downloadFile?path=${data.path}">`
            break;
        case 'mp4':
        case 'mkv':
        case 'avi':
        case 'mov':
        case '3gp':
            fileContent = `<video width="130" controls>
                <source src="v1/api/downloadFile?path=${data.path}" type="video/mp4">
            </video>`
            break;
        case "mp3":
        case "wav":
        case "oga":
            fileContent = `<audio controls>
                <source src="v1/api/downloadFile?path=${data.path}" type="audio/mpeg">
            </audio>`
            break;
        default:
            fileContent = `
                <div class="document">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
                    <div class="details">
                        <h5>${data.fileName}</h5>
                        <h6>Seprate file</h6>
                    </div>
                    <div class="icon-btns">
                        <a class="icon-btn btn-outline-light" href="v1/api/downloadFile?path=${data.path}" target="_blank"><i class="fa fa-download"></i></a>
                    </div>
                </div>
            `

    }
    return fileContent;
}

function showCurrentChatHistory(target, groupId, groupUsers, pageSettingFlag) {

    $('.spining').css('display', 'flex');
    var form_data = new FormData();
    form_data.append('currentGroupId', groupId);
    $.ajax({
        url: '/home/getCurrentGroupChatContent',
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
                $(target).empty();
                getUsersList();
                let { messageData, groupInfo, userStatus } = res;
                // chat page setting
                if (pageSettingFlag == 1) {
                    let contactId = $('#direct .chat-main>li.active').attr('groupUsers').split(',').find(id => id != currentUserId);
                    setUserProfileContent(contactId);
                    groupInfo.avatar = $('#direct .chat-main li.active .profile .bg-img').attr('src');
                    groupInfo.title = $('#direct .chat-main li.active .details h5').text();
                    $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.profile.menu-trigger').css('background-image', `url(${groupInfo.avatar})`);
                } else {
                    setGroupProfileContent(groupId);
                    if (groupInfo.avatar) {
                        $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.profile.menu-trigger .bg-img').attr('src', `v1/api/downloadFile?path=${groupInfo.avatar}`);
                    } else {
                        $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.profile.menu-trigger .bg-img').attr('src', '/chat/images/avtar/teq.jpg');
                    }
                    let groupUsersTarget = $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.groupuser');
                    groupUsersTarget.empty();
                    groupUsers.split(',').forEach(id => {
                        let userInfo = getCertainUserInfoById(id);
                        let avatar = userInfo.avatar ? `v1/api/downloadFile?path=${userInfo.avatar}` : '/images/default-avatar.png';
                        let item = groupUsersTarget.append(`<div class="gr-profile dot-btn dot-success" data-user-id=${userInfo.id} data-tippy-content="${userInfo.username}"><img class="bg-img" src="${avatar}" alt="Avatar"/></div>`).children('.gr-profile:last-child');
                    });
                    tippy('.gr-profile[data-tippy-content]', { placement: "right" });
                    convertListItems();
                }
                $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.group_title').html(groupInfo.title);

                // show chat page display
                $('.section-py-space').css('display', 'none');
                $('.app-list').css('display', 'block');
                $('#content').css('display', 'block');

                // chat history append
                new Promise(resolve => {
                    if (userStatus.status == 2) {
                        if (messageData.length) {
                            messageData.reverse().forEach(item => {
                                if (item.state != 3 && currentUserId != item.sender) {
                                    let message = {
                                        from: item.sender,
                                        to: currentUserId,
                                        content: item.content,
                                        messageId: item.id,
                                        state: item.state,
                                    }
                                    socket.emit('read:message', message);
                                }
                                addGroupChatItem(target, item);
                            });
                        }
                    } else {
                        if ($('#group_chat').hasClass('active')) {
                            let content = 'Join this Group?'
                            let joinGroupAction = () => {
                                socket.emit('join:group', { currentGroupId, currentGroupUsers }, res => {
                                    if (res.status == 'OK') {
                                        console.log('You joined this group');
                                        alert('You joined this group Successfully');
                                    } else {
                                        console.log(res.status);
                                        alert("You haven't enough balance.");
                                    }
                                });
                            }
                            let cancelGroupAction = () => {
                                socket.emit('leave:group', { currentGroupId, currentGroupUsers, currentUserId });
                            }
                            confirmModal('', content, joinGroupAction, cancelGroupAction);
                        }
                    }
                    resolve();
                }).then(() => {
                    $(".messages").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');
                    setTimeout(() => {
                        $('.spining').css('display', 'none');
                    }, 1000);
                });
            } else {
                $('.section-py-space').css('display', 'block');
                $('#content').css('display', 'none');
                $('.app-list').css('display', 'none');
            }
        },
        error: function (response) { }
    });
}

function getUsersListByGroupId(groupId, resolve) {
    var form_data = new FormData();
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/home/getUsersListByGroupId',
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
                console.log(res.data);
                resolve(res.data);
            } else {

            }
        },
        error: function (response) { }
    });
}
