let globalImage;
let ori_image;
let tempImage;
let text;
let selectedEmojis = [];
let lockImage;
let unlockImage;
let priceImage;
let blurPrice = 0;
let photoPrice = 0;
fabric.Object.prototype.cornerSize = 5;
fabric.Image.fromURL('/images/lock.png', (oImg) => {
    lockImage = oImg;
});
fabric.Image.fromURL('/images/unlock.png', (oImg) => {
    unlockImage = oImg;
});
fabric.Image.fromURL('/images/normal.png', (oImg) => {
    priceImage = oImg;
});

var viewportWidth = jQuery(window).width();
if (viewportWidth > 650) {
    var canvasDimension = 400
} else if (viewportWidth <= 425) {
    var canvasDimension = 280
} else if (viewportWidth <= 510) {
    var canvasDimension = 300
} else if (viewportWidth <= 650) {
    var canvasDimension = 350
}

var canvas = new fabric.Canvas('back_canvas', {
    width: canvasDimension,
    height: canvasDimension,
    preserveObjectStacking: true
});
var photo_canvas = new fabric.Canvas('photo_canvas', {
    width: canvasDimension,
    height: canvasDimension,
    preserveObjectStacking: true
});
var fonts = ["Arial", "monospace", "cursive", "fantasy", "emoji", "math",
    "fangsong", "Verdana", "Trebuchet MS", "Gill Sans", "Optima"
];

$(document).ready(function () {

    addFont();
    getRequestList();
    selectBackPhoto();
    blurPhoto();
    addEmojisOnPhoto();
    savePhoto();
    sendBlink();
    showPhoto();
    setContentRate();
    addTextOnPhoto();
    lockResizeEmojis();
    setPriceOfElement();
    document.getElementById("input_btn")
        .addEventListener('click', function () {
            document.getElementById("input_file").click();
        }, false);
    document.getElementById("input_emoji_btn")
        .addEventListener('click', function () {
            document.getElementById("input_emoji_select").click();
        }, false);
    document.getElementById("edit_layer_photo")
        .addEventListener('click', function () {
            document.getElementById("select_layer_photo").click();
        }, false);

    socket.on('receive:request', data => {
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        addRequestItem(senderInfo, receiverInfo, data);
        if (data.from != currentUserId)
            $('.photo_request_icon').addClass('dot-btn');
    });

    socket.on('get:rate', data => {
        let target = $('.chatappend').find(`li.msg-item[key=${data.messageId}]`);
        getContentRate(target, data.rate);
    });

    socket.on('stickyToFree', data => {
        let id = $('#photo_item .modal-content').attr('key');
        if (id) {
            showPhotoContent(id);
        }
    });

    socket.on('edi:photo', data => {

    })


    $('ul.chat-main.request-list').on('click', 'li', (e) => {
        $('#detailRequestModal').find('.btn-success').css('display', 'block');

        let from = $(e.currentTarget).data('from');
        let to = $(e.currentTarget).data('to');
        $('#detailRequestModal .request-title').text($(e.currentTarget).find('.title').text());
        $('#detailRequestModal .request-description').text($(e.currentTarget).find('.description').val());
        $('#detailRequestModal .request-price').text($(e.currentTarget).find('.price').val() + "$");
        $('.photo_request_icon').removeClass('dot-btn');
        $(e.currentTarget).find('.read-status').removeClass('fa-eye-slash');
        $(e.currentTarget).find('.read-status').addClass('fa-eye');
        if (e.currentTarget.className.includes('sent')) {
            $('#detailRequestModal').find('.btn-success').css('display', 'none');
        }
    });

    $('#detailRequestModal .btn-warning').click(e => {
        let senderInfo = getCertainUserInfoById(currentUserId);
        let receiverInfo = getCertainUserInfoById(currentContactId);
        e.preventDefault();
        let reason = prompt('Please enter the reject reason.');
        if (reason) {
            let target = '#direct_chat .contact-chat ul.chatappend';
            $(target).append(`<li class="replies photo-request">
                <div class="media">
                    <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center;">
                    </div>
                    <div class="media-body">
                        <div class="contact-name">
                            <h5>${senderInfo.username}</h5>
                            <h6>01:42 AM</h6>
                            <ul class="msg-box">
                                <li><h5>You rejected Photo Request from ${receiverInfo.username}</h5></li>
                                <li><h5>Reason: ${reason}</h5></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>`);
        };
        $('#detailRequestModal').modal("hide");
        socket.emit('reject:request');
    });

    $('.toggleFreeBtn').on('click', function () {
        let id = $('#photo_item .modal-content').attr('key');
        $(this).toggleClass('lock');
        $(this).toggleClass('unLock');
        let isLock = $(this).hasClass('lock');
        toggleFreeEmojis(isLock);
    });
    function toggleFreeEmojis(isLock) {
        if (isLock) {
            photo_canvas._objects.forEach(item => {
                item.price = item.oldPrice;
            })
        } else {
            photo_canvas._objects.forEach(item => {
                item.price = 0;
            })
        }
        photo_canvas._objects.filter(item => item.kind == 'temp').forEach(item => photo_canvas.remove(item));
        let data = {};
        data.sender = currentUserId;
        data.senderName = getCertainUserInfoById(currentUserId).username;
        data.content = getEmojisInfo(photo_canvas._objects);
        data.photo = photo_canvas.toDataURL('image/png');
        data.photoId = $('#photo_item').find('.modal-content').attr('photoId');
        data.messageId = $('#photo_item').find('.modal-content').attr('key');
        socket.emit('save:photo', data, res => {
            if (res.status == 'OK') {
                $(`.messages.active .chatappend .msg-item[key=${data.messageId}]`).find('.msg-setting-main .receive_photo').attr('src', data.photo);
            } else {
                console.log('edit photo error');
            }
        });
    }
    $('.restoreBtn').on('click', () => {
        let id = $('#photo_item .modal-content').attr('key');
        if (id) {
            showPhotoContent(id);
        }
    });
    $('.payWholePriceBtn').on('click', () => {
        payWholePhotoPrice();
    });

});

function addFont() {
    fonts.unshift('Times New Roman');
    // Populate the fontFamily select
    var select = $(".font_select");
    fonts.forEach(function (font) {
        var option = document.createElement('option');
        option.innerHTML = font;
        option.value = font;
        select.append(option);
    });
}

function getRequestList() {
    $('.icon-btn[data-tippy-content="PhotoRequest"]').on('click', () => {
        if ($('.document-tab.dynemic-sidebar').hasClass('active')) {
            var form_data = new FormData();
            $.ajax({
                url: '/home/getPhotoRequest',
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
                    if (res.state == 'true') {
                        let target = 'ul.request-list';
                        $(target).empty();
                        res.data.forEach(item => {
                            let senderInfo = getCertainUserInfoById(item.from);
                            let receiverInfo = getCertainUserInfoById(item.to);
                            addRequestItem(senderInfo, receiverInfo, item);
                        });
                    }

                },
                error: function (response) {

                }
            });
        }
    });
}

function sendPhotoRequest() {
    let title = $('#photoRequestModal .title').val();
    let description = $('#photoRequestModal .description').val();
    let price = $('#photoRequestModal .price').val();
    let type = 1;
    let to = currentContactId;
    let data = {
        title,
        description,
        price,
        type,
        to
    };
    socket.emit('send:request', data);
}

function addRequestItem(senderInfo, receiverInfo, data) {
    let sendFlag = senderInfo.id == currentUserId ? true : false;
    $("ul.request-list").append(
        `<li class="${sendFlag ? 'sent' : ''}" key="${data.id || data.requestId}" data-from="${senderInfo.id}" data-to="${receiverInfo.id}">
            <a data-bs-toggle="modal" data-bs-target="#detailRequestModal">
                <div class="chat-box">
                    <div class="profile bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                        
                    </div>
                    <div class="details">
                        <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                        <h6 class="title">${data.title || ''}</h6>
                        <input class="description" type="hidden" value="${data.description}">
                        <input class="price" type="hidden" value="${data.price}">
                        <input class="status" type="hidden" value="1">
                    </div>
                    <div class="date-status">
                        <a>
                            <i class="read-status fa ${!data.unread ? 'fa-eye-slash' : 'fa-eye'}"></i>
                            <i class="fa ${sendFlag ? 'fa-arrow-circle-o-right' : 'fa-arrow-circle-o-left'}"></i>
                        </a>
                        <div>$${data.price}</div>
                        <h6 class="font-success status" request-status="4"> Completed</h6>
                    </div>
                </div>
            </a>    
        </li>`
    );
}

function selectBackPhoto() {
    let photoFileInput = $('#input_file')
    photoFileInput.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function (oImg) {
                ori_image = reader.result || '';
                globalImage = oImg;

                let imgWidth = oImg.width;
                let imgHeight = oImg.height;
                let imgRatio = imgWidth / imgHeight;

                var width = canvasDimension;
                var height = width / imgRatio;
                canvas.setWidth(width);
                canvas.setHeight(height);

                canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
                    scaleX: width / oImg.width,
                    scaleY: height / oImg.height
                });
                ori_image = canvas.toDataURL('image/png');
            });

        }
        if (files.length)
            reader.readAsDataURL(files[0]);

    });

    $('#input_reset').on('click', () => {
        canvas.setWidth(canvasDimension);
        canvas.setHeight(canvasDimension);
        canvas.clear();
        globalImage = undefined;
        ori_image = null;
        $('.blur-tool').slideUp();
        $('.text-tool').slideUp();
        $('#createPhoto .photo-price').text('');
    });
}

function blurPhoto() {
    $('.blur_btn').on('click', () => {
        $('.blur-tool').slideToggle();
        $('.text-tool').slideUp();
    });
    $('.blurRange').on('input', e => {
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        let modalId = $(e.target).closest('.modal').attr('id');

        if (target.getActiveObject()) {
            let obj = target.getActiveObject();
            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            obj.blur = e.currentTarget.value;
            target.renderAll();
        } else if (globalImage && modalId == 'createPhoto') {
            if ($('#createPhoto .preview-paid').hasClass('d-none')) {
                blurPrice = $('.emojis-price').val() > 0 ? $('.paid_value input').val() : $('.emojis-price').val();
            } else {
                blurPrice = $('.preview-paid').val();
                // blurPrice = $('.sticky-switch').is(':checked') ? -1 : 0;
            }
            // blurPrice = blurPrice < 0 ? 0 : blurPrice;
            $('#createPhoto .photo-price').text(getPhotoPrice(canvas));
            let obj = Object.assign(globalImage);

            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            obj.blur = e.currentTarget.value;
            canvas.renderAll();
        }
    })
}

function addEmojisOnPhoto() {
    EmojiButton(document.getElementById('create_emoji_button'), function (emoji) {
        if ($('#createPhoto .preview-paid').hasClass('d-none')) {
            var price = $('.emojis-price').val() > 0 ? $('.paid_value input').val() : $('.emojis-price').val();
        } else {
            var price = $('.preview-paid').val();
        }
        let text = emoji;
        if (text) {
            let textBox = new fabric.Textbox(text, {
                with: 200,
                fontSize: 35,
                textAlign: 'center',
                editable: false,
                price: price,
                oldPrice: price,
                payersList: []
            });
            textBox.id = Date.now();
            if ($('#createPhoto').hasClass('show')) {
                addEventAction(canvas, textBox);
                canvas.add(textBox).setActiveObject(textBox);
                canvas.centerObject(textBox);
                $('#createPhoto .photo-price').text(getPhotoPrice(canvas));
            } else if ($('#photo_item').hasClass('show')) {
                addEventAction(photo_canvas, textBox);
                photo_canvas.add(textBox).setActiveObject(textBox);
                photo_canvas.centerObject(textBox);
            }
        }
    });
    EmojiButton(document.querySelector('#edit_emoji_button'), function (emoji) {
        if ($('#createPhoto .preview-paid').hasClass('d-none')) {
            var price = $('.emojis-price').val() > 0 ? $('.paid_value input').val() : $('.emojis-price').val();
        } else {
            var price = $('.preview-paid').val();
        }
        let text = emoji;
        if (text) {
            let textBox = new fabric.Textbox(text, {
                with: 200,
                fontSize: 35,
                textAlign: 'center',
                editable: false,
                price: price,
                oldPrice: price,
                payersList: []
            });
            textBox.id = Date.now();
            if ($('#createPhoto').hasClass('show')) {
                addEventAction(canvas, textBox);
                canvas.add(textBox).setActiveObject(textBox);
                canvas.centerObject(textBox);
                $('#createPhoto .photo-price').text(getPhotoPrice(canvas));
            } else if ($('#photo_item').hasClass('show')) {
                addEventAction(photo_canvas, textBox);
                photo_canvas.add(textBox).setActiveObject(textBox);
                photo_canvas.centerObject(textBox);
            }
        }
    });

    $('.layer_photo_btn').on('change', e => {
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function (oImg) {
                if ($('#createPhoto .preview-paid').hasClass('d-none')) {
                    oImg.price = $('.emojis-price').val() > 0 ? $('.paid_value input').val() : $('.emojis-price').val();
                } else {
                    oImg.price = $('.preview-paid').val();
                }

                let ratio = oImg.width / oImg.height;
                oImg.scaleX = 100 / oImg.width;
                oImg.scaleY = 100 / ratio / oImg.height;
                oImg.id = Date.now();
                oImg.oldPrice = oImg.price;
                oImg.payersList = [];
                addEventAction(target, oImg);

                target.add(oImg);
                target.centerObject(oImg);
                if ($('#createPhoto').hasClass('show')) {
                    $('#createPhoto .photo-price').text(getPhotoPrice(canvas));
                }

            });

        }
        if (files.length)
            reader.readAsDataURL(files[0]);

    })
}

function savePhoto() {
    // edit Photo
    $('.savePhotoBtn').on('click', function (e) {
        photo_canvas._objects.filter(item => item.kind == 'temp').forEach(item => photo_canvas.remove(item));
        let data = {};
        data.sender = currentUserId;
        data.senderName = getCertainUserInfoById(currentUserId).username;
        data.content = getEmojisInfo(photo_canvas._objects);
        data.photo = photo_canvas.toDataURL('image/png');
        data.photoId = $(this).closest('.modal-content').attr('photoId');
        data.messageId = $(this).closest('.modal-content').attr('key');
        socket.emit('edit:photo', data, res => {
            if (res.status == 'OK') {
                $(`.messages.active .chatappend .msg-item[key=${data.messageId}]`).find('.msg-setting-main .receive_photo').attr('src', data.photo);
            } else {
                console.log('edit photo error');
            }
            $('#photo_item').modal('hide');
        });
    });
}

function sendBlink() {
    // send New Photo
    $('#send-photo').on('click', function (e) {
        if ($(this).hasClass('disabled')) {
            alert("This User is not Following you or in your Contacts.");
            return;
        }
        if (!ori_image && !canvas._objects.length) {
            return;
        }
        canvas._objects.filter(item => item.kind == 'temp').forEach(item => canvas.remove(item));
        let data = {};
        data.sender = currentUserId;
        data.senderName = getCertainUserInfoById(currentUserId).username;
        data.photo = canvas.toDataURL('image/png');
        data.original_thumb = canvas.toDataURL('image/png');
        data.back = ori_image || (canvas.backgroundImage && canvas.backgroundImage._originalElement.currentSrc);
        data.blur = canvas.backgroundImage && canvas.backgroundImage.blur || 0;
        data.blurPrice = blurPrice;
        data.blurPayersList = '';
        data.content = getEmojisInfo(canvas._objects);
        // data.original_content = getEmojisInfo(canvas._objects);
        if ($('#direct_chat').hasClass('active')) {
            globalGroupId = currentDirectId;
            data.groupType = 1;
        } else if ($('#group_chat').hasClass('active')) {
            globalGroupId = currentGroupId;
            data.groupType = 2;
        } else if ($('#cast_chat').hasClass('active')) {
            globalGroupId = currentCastId;
            globalGroupUsers = currentCastUsers;
            data.groupType = 3;
        }

        if (globalGroupId) {
            data.globalGroupId = globalGroupId;
            data.globalGroupUsers = globalGroupUsers;
            socket.emit('send:groupBlink', data);
        }
        $('#createPhoto .photo-price').text('');
    });
    // save Blink
    $('#save-blink').on('click', function () {
        if (!ori_image && !canvas._objects.length) {
            return;
        }
        canvas._objects.filter(item => item.kind == 'temp').forEach(item => canvas.remove(item));
        let data = {};
        data.sender = currentUserId;
        data.senderName = getCertainUserInfoById(currentUserId).username;
        data.photo = canvas.toDataURL('image/png');
        data.back = ori_image || (canvas.backgroundImage._originalElement && canvas.backgroundImage._originalElement.currentSrc);
        data.blur = canvas.backgroundImage && canvas.backgroundImage.blur || 0;
        data.blurPrice = blurPrice;
        data.blurPayersList = '';
        data.content = getEmojisInfo(canvas._objects);
        socket.emit('save:blink', data, res => {
            if (res.status == 'OK') {
                alert('Blink is saved Successfully');
            }
        });
    });

    // edit Photo
    // $('.savePhotoBtn').on('click', function (e) {
    //     photo_canvas._objects.filter(item => item.kind == 'temp').forEach(item => photo_canvas.remove(item));
    //     let data = {};
    //     data.from = currentUserId;
    //     data.content = getEmojisInfo(photo_canvas._objects);
    //     data.photo = photo_canvas.toDataURL('image/png');
    //     data.photoId = $(this).closest('.modal-content').attr('photoId');
    //     socket.emit('edit:photo', data);
    // });
}

function showPhoto() {
    $('#direct_chat .contact-chat ul.chatappend, #cast_chat .contact-chat ul.chatappend, #group_chat .contact-chat ul.chatappend').on('click', '.receive_photo~.msg-dropdown-main .msg-open-btn', e => {
        $('#photo_item .modal-content .btn-group.edit_btn_group').css('display', 'none');
        $('#photo_item .modal-content .btn-group.open_btn_group').css('display', 'flex');
        if ($(e.currentTarget).closest('li.msg-item').hasClass('replies')) {
            $('.previewBtn').removeClass('d-none');
            $('.payBtn').addClass('d-none');
            $('.toggleFreeBtn').removeClass('d-none');
        } else {
            $('.previewBtn').addClass('d-none');
            $('.payBtn').removeClass('d-none');
            $('.toggleFreeBtn').addClass('d-none');
        }
        let id = $(e.currentTarget).closest('li.msg-item').attr('key');
        $('.selected-emojis').empty();
        selectedEmojis = [];
        if (id) {
            showPhotoContent(id);
        } else {
            $('#createPhoto').modal('show');
        }
    });

    $('.contact-chat ul.chatappend').on('click', '.file_photo~.msg-dropdown-main .msg-open-btn', function () {
        let src = $(this).closest('.msg-setting-main').find('.file_photo').attr('src');
        $('#photo_modal').modal('show');
        $('#photo_modal').find('.media_photo_src').attr('src', src);
    });

    $('.history-list').on('click', '.accordion-item .accordion-body .thumb', function () {
        let messageId = $(this).closest('.accordion-body').attr('key');
        $('#photo_item .modal-content .btn-group.edit_btn_group').css('display', 'none');
        $('#photo_item .modal-content .btn-group.open_btn_group').css('display', 'flex');
        if ($(this).closest('li.accordion-item').attr('sendFlag') == "true") {
            $('.previewBtn').addClass('d-none');
            $('.payBtn').removeClass('d-none');
            $('.toggleFreeBtn').addClass('d-none');
        } else {
            $('.previewBtn').removeClass('d-none');
            $('.payBtn').addClass('d-none');
            $('.toggleFreeBtn').removeClass('d-none');
        }
        $('.selected-emojis').empty();
        selectedEmojis = [];
        showPhotoContent(messageId);
    });

    $('.history-list').on('click', '.accordion-item .accordion-body .send_heart', function () {
        if ($(this).find('.fa-heart').hasClass('ti-heart')) {
            let userId = $(this).closest('.accordion-item').attr('userId');
            let paymentId = $(this).closest('.accordion-item').attr('paymentId');
            let senderName = getCertainUserInfoById(currentUserId).username;
            socket.emit('send:thanksMessage', { userId, paymentId, senderName }, (res) => {
                $(this).find('.fa-heart').removeClass('ti-heart');
                $(this).find('.fa-heart').addClass('fa');
            });
        }
    });


}

function getEmojisInfo(obj) {
    return JSON.stringify(obj.filter((item => item.kind != 'temp')).map((item, index) => {
        if (item.type == 'image')
            return {
                id: item.id,
                type: 'image',
                src: item._originalElement.src,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                oldPrice: item.oldPrice,
                blur: item.blur,
                // originalBlur: item.originalBlur || item.blur,
                payersList: item.payersList || [],
                // selectable: item.selectable
            }
        else
            return {
                id: item.id,
                type: 'text',
                text: item.text,
                width: item.width,
                height: item.height,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                oldPrice: item.oldPrice,
                // selectable: item.selectable,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                fontSize: item.fontSize,
                fill: item.fill,
                backgroundColor: item.backgroundColor,
                fontWeight: item.fontWeight,
                fontStyle: item.fontStyle,
                payersList: item.payersList || [],
            }
    }));
}

function getPhotoPrice(target) {
    // return target._objects.map(item => item.price).filter(item => item && item > 0).reduce((total, item) => Number(item) + total, 0);
    let blur_price = isNaN(blurPrice) ? 0 : +blurPrice;
    let price = target._objects.filter(item => item.payersList && !item.payersList.includes(currentUserId) && +item.price > 0).map(item => item.price).reduce((total, item) => Number(item) + total, 0) + blur_price;
    if (price - Math.floor(price) > 0) price = price.toFixed(2);

    return price <= 0 ? '' : '$' + price;
}

function getPhotoSrcById(id, target) {
    let form_data = new FormData();
    form_data.append('id', id);
    new Promise(resolve => {
        $.ajax({
            url: '/home/getPhotoData',
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
                if (res.state == 'true') {
                    let data = JSON.parse(res.data[0].content);
                    // return res.data[0].photo;
                    resolve(res.data[0].photo);
                } else {
                    // return'/images/default-avatar.png';
                }
            },
            error: function (response) {

            }
        });
    }).then(v => {
        target.find('.receive_photo').src = v;
    });
}

function payWholePhotoPrice() {
    let messageId = $('#photo_item .modal-content').attr('key');
    let photoId = $('#photo_item .modal-content').attr('photoId');
    // $('#removeBlur').removeAttr('disabled');
    // let price = selectedEmojis.reduce((total, item) => photo_canvas._objects.find(oImg => oImg.cacheKey == item).price + sum, 0);
    if (!selectedEmojis.length) {
        photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
        if ($('.blur-image').attr('price') >= 0) {
            selectedEmojis.push('blur');
        }
    }
    photo_canvas._objects.filter(item => selectedEmojis.includes(item.id)).forEach(item => {
        if (item.price > 0) {
            item.price = 0;
            item.selectable = true;
        }
        if (item.blur) {
            let filter = new fabric.Image.filters.Blur({
                blur: 0
            });
            item.filters = [];
            item.filters.push(filter);
            item.applyFilters();
        }
        photo_canvas.renderAll();
    });
    if (selectedEmojis.includes('blur')) {
        let obj = photo_canvas.backgroundImage;
        if (obj) {
            let filter = new fabric.Image.filters.Blur({
                blur: 0
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
        }
        photo_canvas.renderAll();
    }
    // alert(`You can control emojis which you selected`);
    // alert(`You can control ${selectedEmojis.length} emojis which you selected`);

}

function getContentRate(target, rate) {
    $(target).find(`.photoRating div`).removeClass('checked');
    $(target).find(`.photoRating div:nth-child(${6 - rate})`).addClass('checked');
}

function setContentRate() {
    $(document).on('click', '.photoRating div', function (e) {
        let rate = 5 - $(this).index();

        if ($('#photo_item').hasClass('show') && !$('#photo_item .modal-content').hasClass('sent')) {
            var messageId = $('#photo_item .modal-content').attr('key');
            var kind = 2;
        } else {
            var messageId = $(this).parents('li.sent').attr('key');
            var kind = $(this).parents('li.sent').attr('kind');
        }

        if (messageId) {
            $(e.target).closest('.photoRating').find('div').removeClass('checked');
            $(this).toggleClass('checked');
            socket.emit('give:rate', {
                messageId,
                rate,
                kind
            });
        }
    });
}

function addTextOnPhoto() {

    $('.text_btn').on('click', () => {
        $('.text-tool').slideToggle();
        $('.blur-tool').slideUp();
    });

    $('.addText').on('click', function (e) {
        let modalId = $(e.target).closest('.modal').attr('id');
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        let price = 0;
        if ($('#createPhoto .preview-paid').hasClass('d-none')) {
            price = $('.emojis-price').val() > 0 ? $('.paid_value input').val() : $('.emojis-price').val();
        } else {
            price = $('.preview-paid').val();
            // var price = $('.sticky-switch').is(':checked') ? -1 : 0;
        }
        if ($('#photo_item').attr('edit') == 'true')
            price = 0;
        let text = $(`#${modalId} .text-tool .text`).val();
        if (text) {
            let textBox = new fabric.Textbox(text, {
                with: 200,
                fontSize: 35,
                fill: '#000000',
                textAlign: 'center',
                backgroundColor: '#FFFFFF00',
                editable: false,
                price: price,
                payersList: []
            });
            textBox.id = Date.now();
            addEventAction(target, textBox);
            target.add(textBox).setActiveObject(textBox);
            target.centerObject(textBox);
            $(`#${modalId} .text-tool .text`).val('');
            $(`#${modalId} .text-tool`).slideToggle();
            if ($('#createPhoto').hasClass('show')) {
                $('#createPhoto .photo-price').text(getPhotoPrice(target));
            }

        }

    });

    $('.font_select').on('change', function (e) {
        let modalId = $(e.target).closest('.modal').attr('id');
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        if (target.getActiveObject()) {
            target.getActiveObject().set("fontFamily", this.value);
            target.requestRenderAll();
        }
    });

    $('.backColorPicker').colorpicker().on('changeColor', function (e) {
        let modalId = $(e.target).closest('.modal').attr('id');
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        let color = e.color.toString();
        $(this).css('backgroundColor', color);
        $(this).attr('value', color);
        if (target.getActiveObject()) {
            target.getActiveObject().set("backgroundColor", color);
            target.requestRenderAll();
        }
    });

    $('.fontColorPicker').colorpicker().on('changeColor', function (e) {
        let modalId = $(e.target).closest('.modal').attr('id');
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        let color = e.color.toString();
        console.log(color);
        $(this).css('backgroundColor', color);
        $(this).attr('value', color);
        if (target.getActiveObject()) {
            target.getActiveObject().set("fill", color);
            target.requestRenderAll();
        }
    });

    $('.font-style').on('click', function (e) {
        let target = $(e.target).closest('.modal').attr('id') == 'createPhoto' ? canvas : photo_canvas;
        if (target.getActiveObject()) {
            if ($(e.target).hasClass('bold')) {
                if ($(e.target).hasClass('active')) {
                    target.getActiveObject().set("fontWeight", '400');
                } else {
                    target.getActiveObject().set("fontWeight", 'bold');
                }
            } else {
                if ($(e.target).hasClass('active')) {
                    target.getActiveObject().set("fontStyle", 'normal');
                } else {
                    target.getActiveObject().set("fontStyle", 'italic');
                }
            }
            $(e.target).toggleClass('active');
            target.requestRenderAll();
        }
    });
}

function addEventAction(panel, element) {
    let touchtime = 0;
    element.on({
        'mouseup': () => {
            if (touchtime == 0) {
                touchtime = new Date().getTime();
            } else {
                if (((new Date().getTime()) - touchtime) < 800) {
                    if ($('#createPhoto').hasClass('show') || $('#photo_item').attr('edit')) {

                        let panel = $('#createPhoto').hasClass('show') ? canvas : photo_canvas;
                        let origin = panel.getActiveObject();
                        panel.getActiveObject().clone(function (clonedObj) {
                            panel.discardActiveObject();
                            clonedObj.set({
                                left: clonedObj.left + 10,
                                top: clonedObj.top + 10,
                                evented: true,
                                editable: false,
                                price: origin.price,
                                payersList: []
                            });

                            clonedObj.id = Date.now();
                            clonedObj.payersList = [];
                            clonedObj.price = origin.price;
                            panel.add(clonedObj);
                            clonedObj.top += 10;
                            clonedObj.left += 10;
                            panel.setActiveObject(clonedObj);
                            addEventAction(panel, clonedObj);
                            panel.requestRenderAll();
                            setTimeout(() => {
                                if (clonedObj.payersList) {
                                    $('#createPhoto .photo-price').text(getPhotoPrice(canvas));
                                }
                            }, 500)
                        });
                    }
                    touchtime = 0;
                } else {
                    touchtime = new Date().getTime();
                }
            }
            if (tempImage) panel.remove(tempImage);
            if (text) panel.remove(text);
            let timeout = 2000;
            if (element.left < -(element.width * element.scaleX) || element.left > (panel.width + element.width * element.scaleX) || element.top < -(element.height * element.scaleY) || element.top > (panel.height + element.height * element.scaleY)) {
                panel.remove(panel.getActiveObject());
                panel.remove(tempImage);
                panel.remove(text);
                photoPrice -= element.price;
                if ($('#createPhoto').hasClass('show')) {
                    $('#createPhoto .photo-price').text(getPhotoPrice(panel));
                }
            }
            if (element.price == -1) tempImage = lockImage;
            else if (element.price == 0 || element.payersList.includes(currentUserId)) tempImage = unlockImage;
            else {
                tempImage = priceImage;
                timeout = 5000;
            }
            tempImage.scale(0.5);
            if (element.price > 9) tempImage.scaleX *= 1.2;
            // tempImage.left = element.aCoords.tr.x - 0.25 * tempImage.width + 5;
            tempImage.left = element.aCoords.tr.x;
            tempImage.top = element.aCoords.tr.y - 0.5 * tempImage.height;
            if (element.aCoords.tr.x + 30 > panel.width) {
                tempImage.left = element.aCoords.tl.x - 0.5 * tempImage.width;
            }
            if (element.aCoords.tr.y < 30)
                tempImage.top = element.aCoords.br.y;
            tempImage.kind = 'temp';
            tempImage.selectable = false;
            tempImage.hasControls = false;
            panel.add(tempImage);
            let temp = tempImage;
            if (element.price > 0 && !element.payersList.includes(currentUserId)) {
                text = new fabric.Text('$' + element.price, {
                    left: tempImage.left + 3,
                    top: tempImage.top + 3,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: '15'
                });
                text.kind = 'temp';
                text.selectable = false;
                text.hasControls = false;
                panel.add(text);
                temp = text;
            }
            temp.off().on({
                'mouseup': () => {
                    let photoId = $('#photo_item .modal-content').attr('photoId');
                    let emojiId = element.id
                    socket.emit('stickyToFree', { photoId, emojiId });
                }
            });
            setTimeout(() => {
                panel.remove(tempImage);
                panel.remove(text);
            }, timeout);
        },
        'moving': () => {
            if (tempImage)
                panel.remove(tempImage);
            if (text)
                panel.remove(text);
        }

    });
}

function showPhotoContent(id) {
    var form_data = new FormData();
    form_data.append('id', id);
    $.ajax({
        url: '/home/getPhotoData',
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
            $('.selected-emojis').css('left', canvasDimension + 40 + 'px');
            if (res.state == 'true') {
                let emojis = JSON.parse(res.data[0].content);
                $('#photo_item').modal('show');
                $('#photo_item .modal-content').attr('key', id);
                $('#photo_item .modal-content').attr('photoId', res.data[0].id);
                $('#photo_item .modal-content').removeClass('sent');
                if (res.data[0].senderId == currentUserId) {
                    $('#photo_item .modal-content').addClass('sent');
                }
                photo_canvas.clear();
                selectedEmojis = [];
                $('.selected-emojis').empty();
                //add blur price 
                let blurPrice = res.data[0].blur_payers_list.split(',').map(item => +item).includes(currentUserId) ? 0 : res.data[0].blur_price;
                $('#photo_item .blur-image').attr('price', blurPrice);
                $('#photo_item .blur-image').attr('payers', res.data[0].blur_payers_list);
                // add/remove blur to cart
                let touchtime = 0;
                $('#photo_item .blur-image').off().on('mouseup', () => {
                    if (touchtime == 0) {
                        touchtime = new Date().getTime();
                    } else {
                        if (((new Date().getTime()) - touchtime) < 800) {
                            if (res.data[0].blur_price >= 0 && !res.data[0].blur_payers_list.split(',').map(item => +item).includes(currentUserId)) {
                                if (selectedEmojis.find(item => item == 'blur')) {
                                    $(`.selected-emojis img[key=blur]`).remove();
                                    selectedEmojis = selectedEmojis.filter(item => item != 'blur');
                                } else {
                                    selectedEmojis.push('blur');
                                    var img = document.createElement('img');
                                    img.src = '/images/blur.png';
                                    $(img).attr('key', 'blur');
                                    $('.selected-emojis').append(img);
                                }

                                let price = selectedEmojis.filter(item => item != 'blur').map(item => Number(photo_canvas._objects.find(oImg => oImg.id == item).price)).filter(item => +item > 0).reduce((total, item) => item + total, 0);

                                let blur_price = blurPrice < 0 ? 0 : blurPrice;
                                if (selectedEmojis.includes('blur')) price += blur_price;
                                price == 0 ? price = photoPrice : '';
                                if (price > 0) {
                                    if (price - Math.floor(price) > 0) price = price.toFixed(2);
                                    $('#photo_item .modal-content .photo-price').text('$' + price);
                                } else {
                                    $('#photo_item .modal-content .photo-price').text('');
                                }
                            } else if (res.data[0].blur_price < 0) {
                                alert('Blur is Sticky');
                            }
                            touchtime = 0;
                        } else {
                            // not a double click so set as a new first click
                            touchtime = new Date().getTime();
                        }
                    }
                });
                //5 star rating
                getContentRate('#photo_item', Math.round(res.data[0].rate));
                //background
                new Promise(resolve => {
                    if (res.data[0].back) {
                        let blur = res.data[0].blur_payers_list.split(',').map(item => +item).includes(currentUserId) ? 0 : res.data[0].blur;
                        fabric.Image.fromURL(res.data[0].back, function (oImg) {
                            let filter = new fabric.Image.filters.Blur({
                                blur: blur
                            });
                            oImg.filters = [];
                            oImg.filters.push(filter);
                            oImg.applyFilters();
                            photo_canvas.setWidth(oImg.width);
                            photo_canvas.setHeight(oImg.height);
                            photo_canvas.setBackgroundImage(oImg, photo_canvas.renderAll.bind(photo_canvas));
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                }).then(() => {
                    photoPrice = 0;
                    Promise.all(emojis.map(item => {
                        return new Promise(resolve => {
                            if (item.type == 'image') {
                                fabric.Image.fromURL(item.src, function (oImg) {
                                    oImg.id = item.id;
                                    oImg.left = item.position[0];
                                    oImg.top = item.position[1];
                                    oImg.scaleX = item.size[0];
                                    oImg.scaleY = item.size[1];
                                    oImg.angle = item.angle;
                                    oImg.price = item.price;
                                    oImg.oldPrice = item.olPrice;
                                    oImg.payersList = item.payersList;
                                    let filter = new fabric.Image.filters.Blur({
                                        blur: item.blur || 0
                                    });
                                    oImg.blur = item.blur;
                                    oImg.filters = [];
                                    oImg.filters.push(filter);
                                    oImg.applyFilters();
                                    let touchtime = 0;
                                    oImg.on("mouseup", e => {
                                        if (touchtime == 0) {
                                            touchtime = new Date().getTime();
                                        } else {
                                            if (((new Date().getTime()) - touchtime) < 800) {
                                                if (oImg.price == -1) {
                                                    alert('This is static Element')
                                                    return;
                                                }
                                                if (oImg.price == 0 || oImg.payersList.includes(currentUserId))
                                                    return;
                                                if (selectedEmojis.find(item => item == oImg.id)) {
                                                    $(`.selected-emojis img[key=${oImg.id}]`).remove();
                                                    selectedEmojis = selectedEmojis.filter(item => item != oImg.id);
                                                } else {
                                                    selectedEmojis.push(oImg.id);
                                                    var img = document.createElement('img');
                                                    img.src = oImg.getSrc();
                                                    $(img).attr('key', oImg.id);
                                                    $('.selected-emojis').append(img);
                                                }
                                                let price = selectedEmojis.filter(item => item != 'blur').map(item => Number(photo_canvas._objects.find(oImg => oImg.id == item).price)).filter(item => +item > 0).reduce((total, item) => item + total, 0);

                                                let blur_price = blurPrice < 0 ? 0 : blurPrice;

                                                if (selectedEmojis.includes('blur')) price += blur_price;
                                                price == 0 ? price = photoPrice : '';
                                                if (price > 0) {
                                                    if (price - Math.floor(price) > 0) price = price.toFixed(2);
                                                    $('#photo_item .modal-content .photo-price').text('$' + price);
                                                } else {
                                                    $('#photo_item .modal-content .photo-price').text('');
                                                }
                                                touchtime = 0;
                                            } else {
                                                // not a double click so set as a new first click
                                                touchtime = new Date().getTime();
                                            }
                                        }
                                    });
                                    resolve(oImg);
                                });
                            } else if (item.type == 'text') {
                                let textBox = new fabric.Textbox(item.text, {
                                    id: item.id,
                                    width: item.width,
                                    height: item.height,
                                    scaleX: item.size[0],
                                    scaleY: item.size[1],
                                    left: item.position[0],
                                    top: item.position[1],
                                    angle: item.angle,
                                    price: item.price,
                                    oldPrice: item.oldPrice,
                                    payersList: item.payersList,
                                    fontSize: item.fontSize,
                                    fontFamily: item.fontFamily,
                                    fontSize: item.fontSize,
                                    fontWeight: item.fontWeight,
                                    fontStyle: item.fontStyle,
                                    fill: item.fill,
                                    backgroundColor: item.backgroundColor,
                                    textAlign: 'center'
                                });
                                let touchtime = 0;
                                textBox.on("mouseup", e => {
                                    if (touchtime == 0) {
                                        touchtime = new Date().getTime();
                                    } else {
                                        if (((new Date().getTime()) - touchtime) < 800) {
                                            if (textBox.price == -1) {
                                                alert('This is static Element')
                                                return;
                                            }
                                            if (textBox.price == 0 || textBox.payersList.includes(currentUserId))
                                                return;
                                            if (selectedEmojis.find(item => item == textBox.id)) {
                                                $(`.selected-emojis [key=${textBox.id}]`).remove();
                                                selectedEmojis = selectedEmojis.filter(item => item != textBox.id);
                                            } else {
                                                selectedEmojis.push(textBox.id);
                                                var img = document.createElement('span');
                                                $(img).attr('key', textBox.id);
                                                if (textBox.text.charCodeAt() > 128) {
                                                    img.innerHTML = textBox.text;
                                                } else {
                                                    img.innerHTML = textBox.text[0];
                                                }
                                                $('.selected-emojis').append(img);
                                            }
                                            // let price = selectedEmojis.filter(item => item != 'blur').reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.id == item).price) + total, 0);
                                            let price = selectedEmojis.filter(item => item != 'blur').map(item => Number(photo_canvas._objects.find(oImg => oImg.id == item).price)).filter(item => +item > 0).reduce((total, item) => item + total, 0);

                                            let blur_price = blurPrice < 0 ? 0 : blurPrice;

                                            if (selectedEmojis.includes('blur')) price += blur_price;
                                            price == 0 ? price = photoPrice : '';
                                            if (price > 0) {
                                                if (price - Math.floor(price) > 0) price = price.toFixed(2);
                                                $('#photo_item .modal-content .photo-price').text('$' + price);
                                            } else {
                                                $('#photo_item .modal-content .photo-price').text('');
                                            }
                                            touchtime = 0;
                                        } else {
                                            // not a double click so set as a new first click
                                            touchtime = new Date().getTime();
                                        }
                                    }
                                });
                                resolve(textBox);
                            }
                        });
                    })).then(objects => {
                        for (var object of objects) {
                            if ((+object.price != 0 && !object.payersList.includes(currentUserId)) || +object.price < 0) {
                                object.selectable = false;
                            }
                            photo_canvas.add(object);
                            addEventAction(photo_canvas, object);
                            if (!object.payersList.includes(currentUserId) && +object.price > 0) {
                                photoPrice += Number(object.price);
                            }
                        }
                        let blur_price = blurPrice < 0 ? 0 : blurPrice;
                        if (res.data[0].blur_price) photoPrice += blur_price;
                        if (photoPrice > 0) {
                            if (photoPrice - Math.floor(photoPrice) > 0) photoPrice = photoPrice.toFixed(2);
                            $('#photo_item .modal-content .photo-price').text('$' + photoPrice);
                        } else {
                            $('#photo_item .modal-content .photo-price').text('');
                        }
                    });
                });
            } else {
                $('#photo_item').modal('show');
            }
        },
        error: function (response) {

        }
    });
}

function showBlinkData(blinkId) {
    $('#createPhoto').modal('show');
    $('#createPhoto .preview-paid').addClass('d-none');
    $('#createPhoto .emojis-price').removeClass('d-none');
    $('#createPhoto .save-send').css('margin-left', '0px');
    var form_data = new FormData();
    form_data.append('blinkId', blinkId);
    $.ajax({
        url: '/home/getBlinkData',
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
            console.log(res);
            // $('.selected-emojis').css('left', canvasDimension + 40 + 'px');
            if (res.state == 'true') {
                let emojis = JSON.parse(res.data[0].content);

                canvas.clear();
                selectedEmojis = [];
                $('.selected-emojis').empty();
                //add blur price 
                blurPrice = res.data[0].blur_price;
                //background
                new Promise(resolve => {
                    if (res.data[0].back) {
                        let blur = res.data[0].blur_payers_list.split(',').map(item => +item).includes(currentUserId) ? 0 : res.data[0].blur;
                        fabric.Image.fromURL(res.data[0].back, function (oImg) {
                            let filter = new fabric.Image.filters.Blur({
                                blur: blur
                            });
                            oImg.filters = [];
                            oImg.filters.push(filter);
                            oImg.applyFilters();
                            canvas.setWidth(oImg.width);
                            canvas.setHeight(oImg.height);
                            canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                }).then(() => {
                    photoPrice = 0;
                    Promise.all(emojis.map(item => {
                        return new Promise(resolve => {
                            if (item.type == 'image') {
                                fabric.Image.fromURL(item.src, function (oImg) {
                                    oImg.id = item.id;
                                    oImg.left = item.position[0];
                                    oImg.top = item.position[1];
                                    oImg.scaleX = item.size[0];
                                    oImg.scaleY = item.size[1];
                                    oImg.angle = item.angle;
                                    oImg.price = item.price;
                                    oImg.oldPrice = item.olPrice;
                                    oImg.payersList = item.payersList;
                                    let filter = new fabric.Image.filters.Blur({
                                        blur: item.blur || 0
                                    });
                                    oImg.blur = item.blur;
                                    oImg.filters = [];
                                    oImg.filters.push(filter);
                                    oImg.applyFilters();
                                    resolve(oImg);
                                });
                            } else if (item.type == 'text') {
                                let textBox = new fabric.Textbox(item.text, {
                                    id: item.id,
                                    width: item.width,
                                    height: item.height,
                                    scaleX: item.size[0],
                                    scaleY: item.size[1],
                                    left: item.position[0],
                                    top: item.position[1],
                                    angle: item.angle,
                                    price: item.price,
                                    oldPrice: item.oldPrice,
                                    payersList: item.payersList,
                                    fontSize: item.fontSize,
                                    fontFamily: item.fontFamily,
                                    fontSize: item.fontSize,
                                    fontWeight: item.fontWeight,
                                    fontStyle: item.fontStyle,
                                    fill: item.fill,
                                    backgroundColor: item.backgroundColor,
                                    textAlign: 'center'
                                });
                                resolve(textBox);
                            }
                        });
                    })).then(objects => {
                        for (var object of objects) {
                            canvas.add(object);
                            addEventAction(canvas, object);
                            if (!object.payersList.includes(currentUserId) && +object.price > 0) {
                                photoPrice += Number(object.price);
                            }
                        }
                        let blur_price = blurPrice < 0 ? 0 : blurPrice;
                        if (res.data[0].blur_price) photoPrice += blur_price;
                        if (photoPrice > 0) {
                            if (photoPrice - Math.floor(photoPrice) > 0) photoPrice = photoPrice.toFixed(2);
                            $('#createPhoto .modal-content .photo-price').text('$' + photoPrice);
                        } else {
                            $('#createPhoto .modal-content .photo-price').text('');
                        }
                    });
                });
            }
        },
        error: function (response) {

        }
    });
}

function lockResizeEmojis() {
    $('.lock-tool').on('click', event => {
        $(event.currentTarget).toggleClass('lock');
        $(event.currentTarget).toggleClass('unlock');
        $(event.currentTarget).find('.icon-btn').toggleClass('btn-outline-danger');
        $(event.currentTarget).find('.icon-btn').toggleClass('btn-outline-success');
        let myCanvas = $('#photo_item').hasClass('show') ? photo_canvas : canvas;
        let lock = $(event.currentTarget).hasClass('lock');
        if (myCanvas.getActiveObject()) {
            myCanvas.getActiveObject().lockScalingX = lock;
            myCanvas.getActiveObject().lockScalingY = lock;
        } else {
            myCanvas._objects.forEach(item => {
                item.lockScalingX = lock;
                item.lockScalingY = lock;
            });
        }
        myCanvas.renderAll();
    });
}

function setPriceOfElement() {
    $('.emojis-price').on('change', function () {
        let priceType = $(this).val();
        if (+priceType > 0) {
            $('.paid_value').show();
        } else {
            $('.paid_value').hide();
        }

        $('.price_type .paid_value input').blur(function () {
            if ($(this).val() > 100) {
                $(this).val(100);
            } else if ($(this).val() < 0) {
                $(this).val(0);
            }
        })
    });
}