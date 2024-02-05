let totalPrice = 0;
var isWithdrawModalEnabled = true;

$(document).ready(function () {
    payPhoto();
    initPayPalButton(0);
    $('#checkoutModal').on('shown.bs.modal', function (e) {
        totalPrice = 0;
        $('#checkoutModal .product-list .product-item').remove();
        if (!selectedEmojis.length) {
            photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
            selectedEmojis.push('blur');
        }
        let blurPrice = $('#photo_item .blur-image').attr('price');
        photo_canvas._objects.filter(oImg => selectedEmojis.includes(oImg.id) && oImg.price > 0 && !oImg.payersList.includes(currentUserId)).forEach(item => {
            $('#checkoutModal .product-list .bottom-hr').before(
                `<div class="product-item mt-2 mb-2">
                    ${item.type == 'image' ? `<img class="item" key=${item.id} src=${item.getSrc()} />` : `<span key=${item.id} class="item ellipsis_text">${item.text}</span>`}
                    <div class="d-flex align-items-center">
                        <span class='item_price'>$${item.price}</span>
                        <button type="button" class="btn-close" aria-label="Close"></button>        
                    </div>
                </div>`)
            totalPrice += Number(item.price);
        });
        let isBlurPay = $('#photo_item .blur-image').attr('payers').split(',').map(item => +item).includes(currentUserId)
        if (Number(blurPrice) && selectedEmojis.includes('blur') && !isBlurPay) {
            $('#checkoutModal .product-list .bottom-hr').before(
                `<div class="product-item mt-2 mb-2">
                    <img class="item" key="blur" src="/images/blur.png" style="border-radius: 50%;"/>
                    <div class="d-flex align-items-center">
                        <span class='item_price'>$${blurPrice}</span>
                        <button type="button" class="btn-close" aria-label="Close"></button>        
                    </div>
                </div>`);
            totalPrice += Number(blurPrice);
        }
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice.toFixed(2)}`);
    });
    $('#checkoutModal').on('hidden.bs.modal', function (e) {
        let id = $('#photo_item .modal-content').attr('key');
        if (id) {
            showPhotoContent(id);
        }
    });
    $('#checkoutModal .product-list').on('click', '.btn-close', function () {
        let item = $(this).closest('.product-item');
        let key = $(item).find('.item').attr('key');
        let price = $(item).find('.item_price').text().slice(1);
        totalPrice -= Number(price);
        selectedEmojis = selectedEmojis.filter(item => item != key);
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice.toFixed(2)}`);
        $(this).closest('.product-item').remove();
    });

    $('.payWithBalanceBtn').on('click', () => {
        usersList = getUsersList();
        let userInfo = getCertainUserInfoById(currentUserId);
        let availableCreditAmount = userInfo.balances - userInfo.locked_balances;
        if (!totalPrice) {
            payWholePhotoPrice();
            return;
        }
        if (availableCreditAmount >= totalPrice) {
            tempAction();
        } else {
            alert('⚠️Low Balance⚠️ Please add funds to your account.');
        }
    });
    let timer;
    $('.deposit-amount').on('keyup', 'input', function () {
        let amount = $(this).val()
        clearTimeout(timer)
        timer = setTimeout(() => {
            $('#paypal-button-container').empty()
            initPayPalButton(amount)
        }, 300)
    });

    $('.withdraw_request_type select').on('change', function (e) {
        $('.withdraw_detail_info').empty()
        if (e.target.value == 'paypal') {
            $('.withdraw_detail_info').append(`
                <div class="paypal_detail form-group group_title mb-3">
                    <label>Paypal Email Address</label>
                    <input type="email" class="form-control" />
                </div>`
            );
        } else {
            $('.withdraw_detail_info').append(`
                <div class="debit_card_detail form-group group_title mb-3">
                    <label>Phone Number</label>
                    <input type="text" class="form-control" />
                </div>`
            );
        }
    });
    $(".paypal_detail input").blur(function () {
        var email = $(this).val();
        if (email != "") {
            var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (regex.test(email)) {
                $("#emailError").text("");
            } else {
                $("#emailError").text("Invalid email address");
            }
        } else {
            $("#emailError").text("Email address is required");
        }
    });
    $('#withdrawBtn').on('click', openWithdrawModal);

    $('.sendWithdrawRequestBtn').on('click', function (e) {
        let currentUser = getCertainUserInfoById(currentUserId);
        let availableCreditAmount = currentUser.balances - currentUser.locked_balances;
        let withdrawAmount = +$('.withdraw_request_amount input').val();
        let withdrawType = $('.withdraw_request_type select').val();
        let withdrawEmail = $('.paypal_detail input').val();

        function validateEmail(email) {
            if (email != "") {
                var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (regex.test(email)) {
                    $("#emailError").text("");
                    return true;
                } else {
                    $("#emailError").text("Invalid email address");
                }
            } else {
                $("#emailError").text("Email address is required");
            }
            return false;
        }
        if (availableCreditAmount > withdrawAmount) {
            if (validateEmail(withdrawEmail)) {
                $('#withdrawModal').modal('hide');
                $('#withdrawConfirmModal').modal('show');
                $('#withdrawConfirmModal .withdrawAmount span').text(`$${withdrawAmount.toFixed(2)}`);
                $('#withdrawConfirmModal .withdrawType span').text(withdrawType);
                $('#withdrawConfirmModal .withdrawEmail span').text(withdrawEmail);
            }
        } else {
            alert('Withdraw Amount is invalid!');
        }
    });

    $('#withdrawConfirmModal').on('click', '.withdrawConfirmBtn', function () {

        let withdrawAmount = +$('.withdraw_request_amount input').val();
        let withdrawType = $('.withdraw_request_type select').val();
        let form_data = new FormData();
        form_data.append('withdrawAmount', withdrawAmount);
        form_data.append('withdrawType', withdrawType);
        if (withdrawType == 'paypal') {
            form_data.append('paypalEmail', $('.paypal_detail input').val());
        }
        $('#withdrawModal').modal('hide');

        $('#withdrawConfirmModal').modal('show');
        disableWithdrawModal();
        $.ajax({
            url: '/payment/sendWithdrawRequest',
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
                console.log(res);
                if (res.state == true) {
                    let senderName = getCertainUserInfoById(currentUserId).username;
                    let withdrawId = res.withdraw_id;
                    socket.emit('send:sendWithdrawRequest', { senderName, withdrawId, withdrawAmount, withdrawType });
                }
                enableWithdrawModal();

            },
            error: function (response) {

            }
        });
    })

    $('#withdrawModal').on('shown.bs.modal', function (e) {
        let currentUser = getCertainUserInfoById(currentUserId);
        let availableCreditAmount = currentUser.balances - currentUser.locked_balances;
        $('#withdrawModal .modal-body .avaialble_credit_amount').text(`$${availableCreditAmount.toFixed(2)}`);
        // $.ajax({
        //     url: '/payment/getWithdrawList',
        //     headers: {
        //         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        //     },
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     type: 'POST',
        //     dataType: "json",
        //     success: function (res) {
        //         console.log(res);
        //         res.withdraws.forEach((item, index) => {
        //             var dateString = new Date(item.created_at).toLocaleDateString() + ' @ ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')

        //             $('#withdrawListModal .modal-body .chat-main').append(`
        //                 <li class="" data-to="blank" withdrawId="${item.id}">
        //                     <div class="chat-box">
        //                         <div class="profile">
        //                             ${item.user.avatar ?
        //                     `<img class="bg-img" src="v1/api/downloadFile?path=${item.user.avatar}" alt="Avatar" />`
        //                     :
        //                     getNameStr(item.user.username)
        //                 }
        //                         </div>
        //                         <div class="details">
        //                             <h5>${item.user.username}</h5>
        //                             <h6 class="title">${dateString}</h6>
        //                         </div>
        //                         <div class="date-status">
        //                             <div class="text_info">
        //                                 <span class=${'font-danger'}>$${item.amount}</span>
        //                                 <h6 class="status ${item.status == "success" ? 'font-success' : 'font-warning'}" request-status="4"> ${[item.status]}</h6>
        //                             </div>
        //                             ${item.status == 'pending' ?
        //                     `<div class="thread_info">
        //                                     <div class="accept_request_btn">
        //                                         <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#">
        //                                             <i class="ti-check"></i>
        //                                         </a>
        //                                     </div>
        //                                     <div class="reject_request_btn">
        //                                         <a class="icon-btn btn-outline-danger button-effect btn-xs" href="#" title="Reject Request">
        //                                             <i class="ti-close"></i>
        //                                         </a>
        //                                     </div>
        //                                 </div>` : ''
        //                 }
        //                         </div>
        //                     </div>
        //                 </li>`);
        //             convertListItems();
        //         })

        //     },
        //     error: function (response) {

        //     }
        // });

    });

    $('#withdrawListModal').on('shown.bs.modal', function (e) {
        $('#withdrawListModal .modal-body .chat-main').empty();
        $.ajax({
            url: '/payment/getWithdrawList',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: "json",
            success: function (res) {
                console.log(res);
                res.withdraws.forEach((item, index) => {
                    var dateString = new Date(item.created_at).toLocaleDateString() + ' @ ' + new Date(item.created_at).toLocaleTimeString().replace(/:\d{1,2}:/g, ':')

                    $('#withdrawListModal .modal-body .chat-main').append(`
                        <li class="" data-to="blank" withdrawId="${item.id}" userId="${item.user_id}">
                            <div class="chat-box">
                                <div class="profile">
                                    ${item.user.avatar ?
                            `<img class="bg-img" src="v1/api/downloadFile?path=${item.user.avatar}" alt="Avatar" />`
                            :
                            getNameStr(item.user.username)
                        }
                                </div>
                                <div class="details">
                                    <h5>${item.user.username}</h5>
                                    <h6 class="title">${dateString}</h6>
                                </div>
                                <div class="date-status">
                                    <div class="text_info">
                                        <span class=${'font-danger'}>$${item.amount}</span>
                                        <h6 class="status ${item.status == "pending" ? 'font-warning' : item.status == "success" ? 'font-success' : 'font-danger'}" request-status="4"> ${[item.status]}</h6>
                                    </div>
                                    ${item.status == 'pending' ?
                            `<div class="thread_info">
                                            <div class="accept_request_btn">
                                                <a class="icon-btn btn-outline-primary button-effect btn-xs" href="#">
                                                    <i class="ti-check"></i>
                                                </a>
                                            </div>
                                            <div class="reject_request_btn">
                                                <a class="icon-btn btn-outline-danger button-effect btn-xs" href="#" title="Reject Request">
                                                    <i class="ti-close"></i>
                                                </a>
                                            </div>
                                        </div>` : ''
                        }
                                </div>
                            </div>
                        </li>`);
                    convertListItems();
                })

            },
            error: function (response) {

            }
        });

    });

    $('#withdrawListModal .chat-main').on('click', '.accept_request_btn', function () {
        let withdrawId = $(this).closest('li').attr('withdrawId');
        console.log(withdrawId);
        const acceptRequest = () => {
            let form_data = new FormData();
            form_data.append('withdrawId', withdrawId);
            $.ajax({
                url: '/payment/withdraw',
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
                    if (res.success == true) {
                        // alert(res.message);
                        let withdrawId = res.withdrawInfo.id;
                        let userId = res.withdrawInfo.user_id;
                        let withdrawAmount = res.withdrawInfo.amount;
                        socket.emit('send:acceptWithdrawRequest', { userId, withdrawId, withdrawAmount })
                        // let senderName = getCertainUserInfoById(currentUserId).username;
                        // socket.emit('send:sendWithdrawRequest', { senderName });
                    }
                },
                error: function (response) {

                }
            });
            $(this).closest('li').find('.text_info .status').text('success');
            $(this).closest('li').find('.text_info .status').removeClass('font-warning font-danger');
            $(this).closest('li').find('.text_info .status').addClass('font-success');
            $(this).closest('li').find('.thread_info').remove();
        }
        confirmModal('', "Accept this withdraw request?", acceptRequest);
    });

    $('#withdrawListModal .chat-main').on('click', '.reject_request_btn', function () {
        let withdrawId = $(this).closest('li').attr('withdrawId');
        let userId = $(this).closest('li').attr('userId');
        let withdrawAmount = parseFloat($(this).closest('li').find('.text_info>span').text().slice(1));

        const rejectRequest = () => {
            console.log(withdrawId, ' is rejected!');
            socket.emit('send:rejectWithdrawRequest', { withdrawId, userId, withdrawAmount }, (res) => {
                console.log(res);
                if (res.status == 'OK') {
                    $(this).closest('li').find('.text_info .status').text('Canceled');
                    $(this).closest('li').find('.text_info .status').removeClass('font-warning');
                    $(this).closest('li').find('.text_info .status').addClass('font-danger');
                    $(this).closest('li').find('.thread_info').remove();
                }

            })

        }
        confirmModal('', "Reject this withdraw request?", rejectRequest);

    });
});

function openWithdrawModal() {
    if (isWithdrawModalEnabled) {
        // Open the modal
        $('#withdrawModal').modal('show');
    } else {
        // Prevent the modal from opening
        event.preventDefault();
    }
}

// To disable the modal
function disableWithdrawModal() {
    isWithdrawModalEnabled = false;
}

// To enable the modal
function enableWithdrawModal() {
    isWithdrawModalEnabled = true;
}

function initPayPalButton(amount) {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',

        },

        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{ "amount": { "currency_code": "USD", "value": amount } }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, e.g.
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                // Or go to another URL:  actions.redirect('thank_you.html');
                socket.emit('add:balance', { amount }, (res) => {
                    let balance = parseFloat($('.balance-amount').text().slice(1)) + Number(amount);
                    $('.balance-amount').text(`$${Number(balance).toFixed(2)}`)

                })
            });
        },

        onError: function (err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}

function tempAction() {
    let messageId = $('#photo_item .modal-content').attr('key');
    let photoId = $('#photo_item .modal-content').attr('photoId');
    let addBalance = totalPrice * 0.7.toFixed(2);
    $('.payWithBalanceBtn').attr('disabled', true);
    socket.emit('pay:blink', { messageId, photoId, selectedEmojis, addBalance, totalPrice }, (res) => {
        if (res.status == 'OK') {
            $('#checkoutModal').modal('hide');
            alert("You've paid Successfully");
            payWholePhotoPrice();
            photo_canvas._objects.filter(item => item.kind == 'temp').forEach(item => photo_canvas.remove(item));
            let thumbnailPhoto = photo_canvas.toDataURL('image/png');
            socket.emit('update:thumbnailPhoto', { photoId, thumbnailPhoto });
        } else {
            console.log(res);
        }
        $('.payWithBalanceBtn').removeAttr('disabled');
    });
}
function payPhoto() {
    $('.payBtn').on('click', () => {
        let price = selectedEmojis.filter(item => item != 'blur').map(item => Number(photo_canvas._objects.find(oImg => oImg.id == item).price)).filter(item => +item > 0).reduce((total, item) => item + total, 0);

        let blur_price = Number($('.blur-image').attr('price')) < 0 ? 0 : Number($('.blur-image').attr('price'));
        if (selectedEmojis.includes('blur')) price += blur_price;
        price == 0 ? price = photoPrice : '';
        if (price != 0) {
            $('#checkoutModal').modal('show');
        } else {
            // payWholePhotoPrice();
            // let photoId = $('#photo_item .modal-content').attr('photoId');
            // photo_canvas._objects.filter(item => item.kind == 'temp').forEach(item => photo_canvas.remove(item));
            // let thumbnailPhoto = photo_canvas.toDataURL('image/png');
            // socket.emit('update:thumbnailPhoto', { photoId, thumbnailPhoto });
        }
    });
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

