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

    $('.view_all_btn').on('click', function () {
        $('#custom_modal').modal('show');
        $('#custom_modal').find('.btn_group .btn').hide();
        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.group_title input').val('');
        let target = '#custom_modal .chat-main';
        $(target).empty();
        let usersList;
        if ($('.recent .follow_title .recents').hasClass('active')) {
            usersList = recentChatUsers
            $('#custom_modal').find('.modal-title').text('Recent Chat Users');
            $('#custom_modal .modal-content').addClass('recent_chat_user_modal');
        } else if ($('.recent .follow_title .followers').hasClass('active')) {
            usersList = followers.map(item => getCertainUserInfoById(item.user_id))
            $('#custom_modal').find('.modal-title').text('Followers');
            $('#custom_modal .modal-content').addClass('follower_user_modal');
        } else if ($('.recent .follow_title .followings').hasClass('active')) {
            usersList = followings.map(item => getCertainUserInfoById(item.follow_id))
            $('#custom_modal').find('.modal-title').text('Following');
            $('#custom_modal .modal-content').addClass('following_user_modal');
        }
        usersList.forEach(item => {
            let follwStatus = isFollowing(item.id);
            let statusItem = `
                <div class="thread_info">
                    <div class="follow_btn">
                        <a class="icon-btn ${follwStatus ? 'btn-outline-danger' : 'btn-outline-primary'} button-effect btn-xs" href="#" title=${follwStatus ? 'UnFollow' : 'Follow'}>
                            <i class="${follwStatus ? 'ti-heart-broken' : 'ti-heart'}"></i>
                        </a>
                    </div>
                    <div class="contact_request_btn">
                        <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#" title="Contact Request">
                            <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/000000/external-add-user-tanah-basah-basic-outline-tanah-basah-2.png"/>
                        </a>
                    </div>
                </div>
            `;
            addUsersListItem(target, item, statusItem)
        });
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
                    <div class="photoRating">
                        <div>★</div><div>★</div><div>★</div><div>★</div><div>★</div>
                    </div>
                    <div class="gr-profile dot-btn dot-success" data-user-id=${item.id}>
                        <img class="bg-img" src="${item.avatar ? 'v1/api/downloadFile?path=' + item.avatar : '/images/default-avatar.png'}" alt="Avatar" />
                    </div>
                    <div class="username">${item.username}</div>
                </div>
            `);
            convertListItems();
            getContentRate(`.recent-slider .item[key="${item.id}"]`, Math.round(getAverageRate(item.rateData)));

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