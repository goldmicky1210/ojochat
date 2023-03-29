

$(document).ready(function () {
    var phoneNumberInput = document.querySelector('#phone');
    var telInput = $("#phone"),
        errorMsg = $("#error-msg"),
        validMsg = $("#valid-msg");

    // var iti = window.intlTelInput(phoneNumberInput, {
    //     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.js"
    // })
    var reset = function () {
        telInput.removeClass("error");
        errorMsg.addClass("hide");
        validMsg.addClass("hide");
    };

    // on blur: validate
    telInput.blur(function () {
        reset();
        let isValid = iti.isValidNumber();
        if (isValid) {
            validMsg.removeClass('hide');
        } else {
            telInput.addClass("error");
            errorMsg.removeClass("hide");
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    $('.phoneNumberConfirmBtn').on('click', () => {
        let countryData = iti.getSelectedCountryData();
        let dialCode = countryData.dialCode;
        let isoCode2 = countryData.iso2;
        let phoneNumber = iti.getNumber();
        // if (phoneNumber.includes('+')) {
        //     phoneNumber = phoneNumber.replace(`+${dialCode}`, '');
        // }
        let smsType = $('.smsTestBtns .btn.active').text().replace(/[^0-9]/g, '');
        if (!smsType) {
            alert('Please set SMS1 or SMS2.');
            return;
        }

        var form_data = new FormData();
        let isValid = iti.isValidNumber();
        if (isValid) {
            form_data.append('isoCode2', isoCode2);
            form_data.append('dialCode', dialCode);
            form_data.append('phoneNumber', phoneNumber);

            validMsg.removeClass('hide');
        } else {
            alert('Please input valid phone number');

            telInput.addClass("error");
            errorMsg.removeClass("hide");
            return;
        }
        form_data.append('smsType', smsType);
        $.ajax({
            url: '/setting/setPhoneNumber',
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
                if (res.update == 'true') {
                    alert('Phone Number saved correctly');
                }
            },
            error: function (response) { }
        });

    });

    //notificatin setting
    $('.js-switch8').on('change', () => {
        let state = $('.js-switch8').prop('checked') ? 1 : 0;
        var form_data = new FormData();
        form_data.append('state', state);
        $.ajax({
            url: '/setting/setNotification',
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
    });
    

    // wallpaper setting
    $('#backgroundImageFileSelect').on('change', function (e) {
        let backgroundImageFile = $(this)[0].files[0];
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            $('.backgroundImagePreview').css('background-image', `url("${reader.result}")`);
        }
        if (files.length)
            reader.readAsDataURL(files[0]);
    });
    $('.uploadBackgroundImageBtn').on('click', function () {
        let form_data = new FormData();
        form_data.append('backgroundImage', $('#backgroundImageFileSelect')[0].files[0] || null);
        if ($('#backgroundImageFileSelect')[0].files.length) {
            $.ajax({
                url: '/setting/uploadBackgroundImage',
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
                    if (res.state = true) {
                        alert('Image is uploaded Successfully');
                    } else {
                        alert('Upload Failed');
                    }
                },
                error: function (response) {

                }
            });
        }
    });

    // Privacy read recipts setting
    readReceiptsStatus = $('.read-receipts-switch').prop('checked') ? 1 : 0;
    $('.read-receipts-switch').on('change', () => {
        readReceiptsStatus = $('.read-receipts-switch').prop('checked') ? 1 : 0;
        var form_data = new FormData();
        form_data.append('state', readReceiptsStatus);
        $.ajax({
            url: '/setting/setReadReceipts',
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
    });

    // block user list setting
    $('.block-user-list-btn').on('click', function (e) {
        $('#custom_modal').modal('show');

        $('#custom_modal').find('.sub_title').hide();
        $('#custom_modal').find('.btn_group .btn').hide();
        $('#custom_modal').find('.modal-title').text('Blocked Users');

        let target = '#custom_modal .chat-main';
        $(target).empty();

        let usersList = blockUserList.map(item => getCertainUserInfoById(item))
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
            addUsersListItem(target, item, statusItem, 'blockflag')

        });

    });

    // Password Setting

    $('.passwordInput i').on('click touchstart touchend', function (e) {
        let target = $(this).siblings('input');
        $(this).toggleClass('fa-eye');
        $(this).toggleClass('fa-eye-slash');
        let type = target.attr('type') == 'password' ? 'text' : 'password';
        target.attr('type', type);
    });

    $('.newPassword input').blur(function () {
        if ($(this).val().length < 6) {
            $('.newPassword').siblings('.text-danger').text('Password length should be at least 6');
        }
    })

    $('.newPassword input').focus(function () {
        $('.newPassword').siblings('.text-danger').text('');
    })
    $('.confirmNewPassword input').focus(function () {
        $('.confirmNewPassword').siblings('.text-danger').text('');
    })

    $('.changePasswordTab').on('click', '.changePasswordBtn', function () {
        let newPassword = $('.newPassword input').val();
        let confirmNewPassword = $('.confirmNewPassword input').val();
        if (newPassword.length >= 6 && newPassword === confirmNewPassword) {
            let form_data = new FormData();
            form_data.append('id', currentUserId);
            form_data.append('password', newPassword);
            $.ajax({
                url: '/updatePassword',
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
                    if (res.state = true) {
                        alert('Password Updated Successfully');
                        window.location.reload()
                    } else {
                        alert('Update Failed');
                    }
                },
                error: function (response) {

                }
            });
        } else {
            $('.confirmNewPassword').siblings('.text-danger').text("Password doesn't match");
        }
    })


})