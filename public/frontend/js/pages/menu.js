var copiedContent = '';
var pasteTarget;
$(document).ready(() => {
    // discovery button
    $('.discovery_btn').on('click', function () {
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('discovery_user_modal');
        $('#custom_modal').find('.modal-title').text('Discover Users');
        $('#custom_modal').find('.search_field').hide();
        $('#custom_modal').find('.btn_group .btn').hide();
        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.group_title input').val('');
        let target = '#custom_modal .chat-main';
        $(target).empty();
        lastUserName = '';
        let newUsersList = loadMoreUsers(lastUserName, '', true);
        newUsersList.forEach(item => {
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
            lastUserName = item.username;
        });
    });
});