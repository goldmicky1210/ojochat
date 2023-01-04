$(document).ready(() => {
    $('#direct_chat .add_contact_user').on('click', () => {
        new Promise(resolve => getUsersListByGroupId(currentDirectId, resolve)).then(data => {
            let userId = data.find(id => id != currentUserId);
            let contactorInfo = getCertainUserInfoById(userId);
            if (contactorInfo.email) {
                // addContact(userId);
                $.post('/home/sendContactRequest', { userId }, (res) => {
                    if (res.message == 'sent') {
                        senderName = getCertainUserInfoById(currentUserId).username
                        socket.emit('send:contactRequest', { userId, senderName });
                        alert('Contact Request sent Successfully');
                    } else if (res.message == 'exist') {
                        alert('Contact Request already exist');
                    }
                })
            }
        });
    });

    // show Contact List
    $('.sidebar-top li.contact_list_btn').on('click', () => {
        let target = '.contact-list-tab .chat-main';
        // let statusItem = '<i class="ti-trash"></i>'
        let statusItem = `
                <div class="thread_info">
                    <div class="open_chat_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#">
                            <i class="ti-themify-favicon-alt"></i>
                        </a>
                    </div>
                    <div class="remove_request_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Remove Request">
                            <i class="ti-trash"></i>
                        </a>
                    </div>
                </div>`
        new Promise(resolve => getContactListData(resolve)).then(data => {
            $(target).empty();
            data.forEach(item => addUsersListItem(target, item, statusItem))
        });
    });
    // create or go chat page
    $('.contact-list-tab .chat-main').on('click', 'li.user_item .open_chat_btn', function () {
        let userId = $(this).closest('.user_item').attr('key');
        $('.dynemic-sidebar, .button-effect.active:not(#myTab .button-effect):not(#myTab1 .button-effect), sidebar-top .sidebar-top > li > a').removeClass("active");
        $('.recent-default').addClass("active");
        $('.messages.custom-scroll').removeClass("active");
        $('#direct_chat').addClass("active");
        $('#group-tab').removeClass('active show');
        $('#direct-tab').addClass('active show');
        $('#group').removeClass('active show');
        $('#direct').addClass('active show');
        $(`#direct .chat-main>li`).removeClass('active');
        getRecentChatUsers(1)

        let directGroupId = getDirectGroupId(userId);
        if (directGroupId) {
            if ($(`#direct .chat-main>li[groupId=${directGroupId}]`).length) {
                $(`#direct .chat-main>li[groupId=${directGroupId}]`).click()
            } else {
                console.log('no group')
            }
        } else {
            new Promise(resolve => getUsersList(resolve)).then(usersList => {
                let item = usersList.find(item => item.id == userId);
                users = [userId, currentUserId];
                socket.emit('create:group', { title: item.username, users, type: 1 });
            });
        }
    });
    $('#profile_modal .open_chat_btn').on('click', function () {
        let userId = $(this).closest('.contact-profile').attr('userId');
        $('#profile_modal').modal('hide');
        $('#custom_modal').modal('hide');
        $('.dynemic-sidebar, .button-effect.active:not(#myTab .button-effect):not(#myTab1 .button-effect), sidebar-top .sidebar-top > li > a').removeClass("active");
        $('.recent-default').addClass("active");
        $('.messages.custom-scroll').removeClass("active");
        $('#direct_chat').addClass("active");
        $('#group-tab').removeClass('active show');
        $('#direct-tab').addClass('active show');
        $('#group').removeClass('active show');
        $('#direct').addClass('active show');
        $(`#direct .chat-main>li`).removeClass('active');
        getRecentChatUsers(1)

        let directGroupId = getDirectGroupId(userId);
        if (directGroupId) {
            if ($(`#direct .chat-main>li[groupId=${directGroupId}]`).length) {
                $(`#direct .chat-main>li[groupId=${directGroupId}]`).click()
            } else {
                console.log('no group')
            }
        } else {
            new Promise(resolve => getUsersList(resolve)).then(usersList => {
                let item = usersList.find(item => item.id == userId);
                users = [userId, currentUserId];
                socket.emit('create:group', { title: item.username, users, type: 1 });
            });
        }
    })

    // remove contact
    $('.contact-list-tab .chat-main').on('click', 'li.user_item .ti-trash', function () {
        let userId = $(this).closest('.user_item').attr('key');
        removeContactRequest(userId, this);
    });
    // show contact request
    $('.sidebar-top li.notification_list_btn').on('click', () => {
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
        });
    });
    // accept contact request
    $('.notification-tab .chat-main').on('click', 'li.user_item .accept_request_btn', function () {
        let userId = $(this).closest('.user_item').attr('key');
        addContact(userId);
    });

    // remove contact request
    $('.notification-tab .chat-main').on('click', 'li.user_item .remove_request_btn', function () {
        let userId = $(this).closest('.user_item').attr('key');
        removeContactRequest(userId, this);
    });

});

function addContact(userId) {
    var form_data = new FormData();
    form_data.append('userId', userId || $('#exampleInputEmail1').val());
    $.ajax({
        url: '/home/addContactItem',
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
            if (res.state) {
                senderName = getCertainUserInfoById(currentUserId).username
                socket.emit('accept:contactRequest', { userId, senderName })
                alert('Contact is added Successfully');
            }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('Add Contact Error');
        }
    });
}

function removeContactRequest(userId, target) {
    const removeAction = () => {
        var form_data = new FormData();
        form_data.append('userId', userId);
        $.ajax({
            url: '/home/removeContactRequest',
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
                console.log(res);
                if (res.state) {
                    $(target).closest(`.user_item[key='${userId}']`).remove();
                    alert('Remove Successfully')
                }
            },
            error: function (response) {
                // document.location.href = '/';
                alert('Add Contact Error');
            }
        });
    }
    confirmModal('', 'Remove this Contact?', removeAction)
}

function getContactListData(resolve) {
    $.ajax({
        url: '/home/getContactList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            resolve(res);
        },
        error: function (response) {

        }
    });
}

function getPendingContactListData(resolve) {
    $.ajax({
        url: '/home/getPendingContactList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            resolve(res);
        },
        error: function (response) {

        }
    });
}