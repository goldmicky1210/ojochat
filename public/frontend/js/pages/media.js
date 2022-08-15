var copiedContent = '';
var pasteTarget;
Dropzone.autoDiscover = false;
$(document).ready(() => {
    annDropzone = null;
    annDropzone = new Dropzone("div#dropzoneForm", {
        url: "/v1/api/uploadFile",
        paramName: "file",
        maxFilesize: 200, // MB
        addRemoveLinks: true,
        thumbnailWidth: 294,
        thumbnailHeight: 294,
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
                formData.append("_token", jQuery('meta[name="csrf-token"]').attr('content'));
                formData.append('kind', 0);
                formData.append('id', jQuery('#edit_id').val());
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
});
 