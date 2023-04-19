$(document).ready(() => {
    $('.notification-switch').on('change', () => {
        let state = $('.notification-switch').prop('checked') ? 1 : 0;
        setProfileSetting('notification', state)
    });
    $('.block-switch').on('change', () => {
        let state = $('.block-switch').prop('checked') ? 1 : 0;
        setProfileSetting('block', state)
    });

    $('.show_profile_btn').on('click', function () {
        let userId = $('#direct_chat > div.contact-details  div.media-left.me-3 .profile').attr('key')
        setProfileData(userId)
        $('#profile_modal').modal('show');

    })
    $('.remove_conversation_btn').on('click', function () {
        deleteConversation(currentDirectId);
    })

})
function setProfileSetting(fieldName, state) {
    var form_data = new FormData();
    let userId = $('#profile_modal .contact-profile').attr('userId');
    
    if (fieldName == 'block') {
        form_data.append('blockId', userId);
    } else if (fieldName == 'notification') {
        let directGroupId = getDirectGroupId(userId, 1);
        form_data.append('groupId', directGroupId);
    }
    form_data.append('fieldName', fieldName);
    form_data.append('state', state);

    $.ajax({
        url: '/profile/setProfileSetting',
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
            console.log(res)
        },
        error: function (response) { }
    });
}

function deleteConversation(groupId) {
    let form_data = new FormData();
    form_data.append('groupId', groupId);

    $.ajax({
        url: '/message/deleteConversation',
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
            console.log(res)
            if (res.state == 'true') {
                $('.messages.active .chatappend').empty();

            }
        },
        error: function (response) { }
    });
}