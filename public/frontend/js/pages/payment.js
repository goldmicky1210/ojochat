let totalPrice = 0;

$(document).ready(function () {
    payPhoto();

    $('#checkoutModal').on('shown.bs.modal', function (e) {
        totalPrice = 0;
        $('#checkoutModal .product-list .product-item').remove();
        if (!selectedEmojis.length) {
            photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
            selectedEmojis.push('blur');
        }
        let blurPrice = $('#photo_item .blur-image').attr('price');
        photo_canvas._objects.filter(oImg => selectedEmojis.includes(oImg.id) && oImg.price > 0).forEach(item => {
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
        if (Number(blurPrice) && selectedEmojis.includes('blur')) {
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
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice}`);
    });
    $('#checkoutModal').on('hidden.bs.modal', function (e) {
        let id = $('#photo_item .modal-content').attr('key');
        if (id) {
            showPhotoContent(id);
        }
    });
    $('#checkoutModal .product-list').on('click', '.btn-close', function() {
        let item = $(this).closest('.product-item');
        let key = $(item).find('.item').attr('key');
        let price = $(item).find('.item_price').text().slice(1);
        totalPrice -= Number(price);
        selectedEmojis = selectedEmojis.filter(item =>item != key);
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice}`);
        $(this).closest('.product-item').remove();
    });

    $('.payWithBalanceBtn').on('click', () => {
        let userInfo = getCertainUserInfoById(currentUserId);
        if (!totalPrice) {
            payWholePhotoPrice();
            return;
        }
        if (userInfo.balances >= totalPrice) {
            tempAction();
        } else {
            alert('You have no enough balance. Please pay via Paypal or Card');
        }
    });


});

function tempAction() {
    let messageId = $('#photo_item .modal-content').attr('key');
    let photoId = $('#photo_item .modal-content').attr('photoId');
    let addBalance = totalPrice * 0.7.toFixed(2);
    $('.payWithBalanceBtn').attr('disabled', true);
    socket.emit('pay:blink', { photoId, selectedEmojis, addBalance, totalPrice }, (res) => {
        if (res.status == 'OK') {
            $('#checkoutModal').modal('hide');
            alert('You paid Successfully');
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

        // let price = selectedEmojis.filter(item => item != 'blur').reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.id == item).price) + total, 0);
        // let blur_price = Number($('.blur-image').attr('price')) < 0 ? 0 : Number($('.blur-image').attr('price'));
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