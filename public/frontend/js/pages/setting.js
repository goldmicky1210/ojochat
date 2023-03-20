

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

    // Password Setting
    $('.passwordInput').on('click', 'i', function () {
        let target = $(this).siblings('input');
        $(this).toggleClass('fa-eye');
        $(this).toggleClass('fa-eye-slash');
        if (target.attr('type') == 'password') {
            target.attr('type', 'text');
        } else {
            target.attr('type', 'password');
        }
    });
    $('.changePasswordTab').on('click', '.changePasswordBtn', function () {
        let newPassword = $('.newPassword input').val();
        let confirmNewPassword = $('.confirmNewPassword input').val();
        if (newPassword === confirmNewPassword) {
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
            alert('Password Not Matched');
        }
    })
})