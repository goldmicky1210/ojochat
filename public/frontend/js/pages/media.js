var copiedContent = '';
var pasteTarget;
Dropzone.autoDiscover = false;
$(document).ready(() => {
    annDropzone = null;
    annDropzone = new Dropzone("div#dropzoneForm", {
        url: "/v1/api/attachFile",
        paramName: "file",
        maxFilesize: 200, // MB
        addRemoveLinks: false,
        thumbnailWidth: 294,
        thumbnailHeight: 294,
        autoProcessQueue: true,
        dictDefaultMessage: '<strong>Drop attach files here or click to upload. </strong></br> (File will be safe.)',
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
                formData.append("_token", jQuery('meta[name="csrf-token"]').attr('content'));
                formData.append('kind', 0);
                formData.append('id', jQuery('#edit_id').val());
            });
            this.on("success", function (file, res) {
                res = JSON.parse(res);
                var radio = document.createElement('input');
                radio.setAttribute('type', 'radio');
                radio.setAttribute('name', 'discovery_file');
                radio.setAttribute('class', 'discovery-file');
                radio.setAttribute('data-id', res.id);
                radio.setAttribute('onchange', 'selectDiscoverImage(' + res.id + ');');
                file.previewTemplate.appendChild(radio);
                var div = document.createElement('div');
                div.setAttribute('class', 'portada');
                div.setAttribute('id', res.id);
                if (!res.flag) div.setAttribute('style', 'display:none;');
                div.innerHTML = 'Portada';
                file.previewTemplate.appendChild(div);
                if (res.flag) radio.setAttribute('checked', true);
            });
            this.on("complete", function (file) {
                if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {

                }
            });
            this.on('error', function (file, errorMessage) {

            });
            this.on('removedfile', function (file) {

            });
        }
    });
});
