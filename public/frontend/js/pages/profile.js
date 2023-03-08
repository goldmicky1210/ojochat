$(document).ready(() => {
    $('.notification-switch').on('change', () => {
        let state = $('.notification-switch').prop('checked') ? 1 : 0;
        setProfileSetting('notification', state)
    });
    $('.block-switch').on('change', () => {
        let state = $('.block-switch').prop('checked') ? 1 : 0;
        setProfileSetting('block', state)
    });
})
function setProfileSetting(fieldName, state) {
    var form_data = new FormData();
    let userId = $('#profile_modal .contact-profile').attr('userId');
    let directGroupId = getDirectGroupId(userId);
    form_data.append('groupId', directGroupId);

    form_data.append('fieldName', fieldName);
    form_data.append('state', state);


    $.ajax({
        url: '/group/setProfileSetting',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        data: form_data,
        success: function (res) { },
        error: function (response) { }
    });
}