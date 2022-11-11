$(document).ready(() => {
    $('#direct_chat .add_contact_user').on('click', () => {
        new Promise(resolve => getUsersListByGroupId(currentDirectId, resolve)).then(data => {
            let userId = data.find(id => id != currentUserId);
            let contactorInfo = getCertainUserInfoById(userId);
            if (contactorInfo.email) {
                addContact(userId);
            }
        });
    });

    // show Contact List
    $('.sidebar-top li.contact_list_btn').on('click', () => {
        let target = '.contact-list-tab .chat-main';
        let statusItem = '<i class="ti-trash"></i>'
        new Promise(resolve => getContactListData(resolve)).then(data => {
            $(target).empty();
            data.forEach(item => addUsersListItem(target, item, statusItem))
        });
    });
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
            let statusItem = `
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
            data.forEach(item => addUsersListItem(target, item, statusItem))
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
            console.log(res);
            if (res.state) {
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