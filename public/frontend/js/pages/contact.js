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
        new Promise(resolve => getContactListData(resolve)).then(data => {
            console.log(data);
            $(target).empty();
            data.forEach(item => addNewUserItem(target, item))
        });
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
        removeContactRequest(userId);
    });

});

function addContact(userId) {
    var form_data = new FormData();
    // form_data.append('email', email || $('#exampleInputEmail1').val());
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

            }
            // if (res.insertion == false) {
            //     $('.addContactError').html(res.message);
            //     setTimeout(() => {
            //         $('.addContactError').html('');
            //     }, 1000);
            // } else {
            //     let data = res.data;
            //     data.created_at = new Date();
            //     let target = '#contact-list .chat-main';
            //     addNewUserItem(target, data);
            //     if (userId) {
            //         let username = getCertainUserInfoById(userId).username;
            //         alert(`${username} has been added to contacts successfully`);
            //     }
            // }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('Add Contact Error');
        }
    });
}

function removeContactRequest(userId) {
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

            }
            // if (res.insertion == false) {
            //     $('.addContactError').html(res.message);
            //     setTimeout(() => {
            //         $('.addContactError').html('');
            //     }, 1000);
            // } else {
            //     let data = res.data;
            //     data.created_at = new Date();
            //     let target = '#contact-list .chat-main';
            //     addNewUserItem(target, data);
            //     if (userId) {
            //         let username = getCertainUserInfoById(userId).username;
            //         alert(`${username} has been added to contacts successfully`);
            //     }
            // }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('Add Contact Error');
        }
    });
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

function addNewUserItem(target, data) {
    $(target).prepend(
        `<li data-to="blank" userId="${data.id}">
            <div class="chat-box">
                <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                    
                </div>
                <div class="details">
                    <h5>${data.username}</h5>
                    <h6>${data.description || 'Hello'}</h6>
                </div>
                <div class="date-status">
                    <i class="ti-trash"></i>
                    <h6></h6>
                    <h6 class="font-success status"></h6>
                    <div class="badge badge-primary sm"></div>
                </div>
            </div>
        </li>`
    );
}