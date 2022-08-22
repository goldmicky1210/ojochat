var copiedContent = '';
var pasteTarget;
Dropzone.autoDiscover = false;
$(document).ready(() => {
    mediaDropzone = null;
    mediaDropzone = new Dropzone("div#dropzoneForm", {
        url: "/v1/api/uploadFile",
        paramName: "file",
        maxFilesize: 200000, // MB
        addRemoveLinks: true,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        // thumbnailMethod: "contain",
        autoProcessQueue: true,
        // dictDefaultMessage: '<strong>Drop attach files here or click to upload. </strong></br> (File will be safe.)',
        dictDefaultMessage: '<img class="dropzone_back_img" src="/images/upload.png" width=100%>',
        init: function () {
            this.on("processing", function (file) {

            });
            this.on("uploadprogress", function (file, progress, bytesSent) {

            });
            this.on("thumbnail", function (file, dataUrl) {
            });
            this.on("success", function (file) {

            });
            this.on("sending", function (file, xhr, formData) {
            });
            this.on("success", function (file, res) {
                console.log(res);
            });
            this.on("complete", function (file) {
                if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {

                }
            });
            this.on('error', function (file, errorMessage) {

            });
            this.on('removedfile', function (file) {
                console.log(file);
            });
        }
    });

    $('#mediaPhoto .send_attach_btn').on('click', function () {

        $('#mediaPhoto').modal('hide');
        var form_data = new FormData();
        form_data.append('senderId', currentUserId);
        form_data.append('groupId', globalGroupId);
        mediaDropzone.files.forEach((item, index) => {
            form_data.append('files[]', item);
        });
        $.ajax({
            url: '/v1/api/attachFiles',
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
                console.log(res.messageData);
                let messageData = res.messageData;
                let target = '.messages.active .contact-chat ul.chatappend';
                if (messageData.length) {
                    messageData.reverse().forEach(item => {
                        if (item.state != 3 && currentUserId != item.sender) {
                            let message = {
                                from: item.sender,
                                to: currentUserId,
                                content: item.content,
                                messageId: item.id,
                                state: item.state,
                            }
                            socket.emit('read:message', message);
                        }
                        addGroupChatItem(target, item);
                        $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');
                        item.senderName = getCertainUserInfoById(currentUserId).username;
                        socket.emit('send:mediaNotification', item);
                    });
                }
            },
            error: function (response) {

            }
        });
    });
});
