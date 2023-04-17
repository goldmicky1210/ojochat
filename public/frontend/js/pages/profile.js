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
