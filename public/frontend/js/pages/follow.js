$(document).ready(() => {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('.follow_title').on('click', 'span', function () {
        $('.follow_title span').removeClass('active');
        $(this).addClass('active');
    });

    $('.follow_btn').on('click', function () {
        let followId = $(this).closest('.contact-profile').attr('userId');
        console.log(followId);
        let data = {
            followId
        }
        if (currentUserId != followId) {
            $.post('/profile/followUser', data, (res) => {
                console.log(res);
            })
        }
    });
});