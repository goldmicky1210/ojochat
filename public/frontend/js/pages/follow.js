let followers = [];
let followings = [];
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
        followers = res.follows
        followings = res.followings
        $('.chitchat-left-sidebar .theme-title .follow_title .followers .count').text(res.follows.length);
        $('.chitchat-left-sidebar .theme-title .follow_title .followings .count').text(res.followings.length);
        if (flag == 1) {
            var data = res.follows.map(item => getCertainUserInfoById(item.user_id));
        } else if (flag == 2) {
            var data = res.followings.map(item => getCertainUserInfoById(item.follow_id));
        }
        $('.recent-slider').empty();
        data.forEach(item => {
            $('.recent-slider').append(`
                <div class="item" key=${item.id}>
                    <div class="gr-profile dot-btn dot-success" data-user-id=${item.id}>
                        <img class="bg-img" src="${item.avatar ? 'v1/api/downloadFile?path=' + item.avatar : '/images/default-avatar.png'}" alt="Avatar" />
                    </div>
                    <div class="username">${item.username}</div>
                </div>
            `);
            convertListItems();
        });
    })
}

function isFollowing(userId) {
    return followings.find(item => item.follow_id == userId) ? 1 : 0;
}

function isFollower(userId) {
    return followers.find(item => item.user_id == userId) ? 1 : 0;
}
function isContact(userId) {

}