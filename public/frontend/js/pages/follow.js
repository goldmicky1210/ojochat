$(document).ready(() => {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('.follow_title').on('click', 'span', function () {
        $('.follow_title span').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('followers')) {
            getFollowData(currentUserId, 1);
        } else if ($(this).hasClass('followings')) {
            getFollowData(currentUserId, 2);
        } else if ($(this).hasClass('recents')) {
            displayRecentChatFriends(recentChatUsers);
        }
    });

    $('.follow_btn').on('click', function () {
        let followId = $(this).closest('.contact-profile').attr('userId');
        $(this).find('.btn').prop('disabled', true)
        if (currentUserId != followId) {
            $.post('/profile/followUser', { followId }, (res) => {
                if (res.result == 'follow') {
                    $('.contact-profile .follow_btn .btn').text('UnFollow');
                    $('.contact-profile .follow_btn .btn').removeClass('btn-success');
                    $('.contact-profile .follow_btn .btn').addClass('btn-danger');
                } else if (res.result == 'unfollow') {
                    $('.contact-profile .follow_btn .btn').text('Follow');
                    $('.contact-profile .follow_btn .btn').addClass('btn-success');
                    $('.contact-profile .follow_btn .btn').removeClass('btn-danger');
                }
                $(this).find('.btn').prop('disabled', false)
            })
        }
    });

});
function getFollowData(userId, flag) {
    $.post('/profile/getFollowData', { userId }, res => {
        console.log(res);
        $('.chitchat-left-sidebar .theme-title .follow_title .followers .count').text(res.follows.length);
        $('.chitchat-left-sidebar .theme-title .follow_title .followings .count').text(res.followings.length);
        if (flag == 1) {
            var data = res.follows.map(item => getCertainUserInfoById(item.user_id));
        } else if (flag == 2) {
            var data = res.followings.map(item => getCertainUserInfoById(item.follow_id));
        }
        $owl = $('.recent-slider');
        $owl.trigger('destroy.owl.carousel');
        $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
        $('.recent-slider').empty();
        data.forEach(item => {
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
    })
}

function isFollow(userId) {
    let form_data = new FormData();
    form_data.append('userId', userId);
    let result = 0;
    $.ajax({
        url: '/profile/isFollow',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        async: false,

        success: function (res) {
            if (res.state = 'true') {
                result = res.result;
            }
        },
        error: function (response) { }
    });
    return result;
}