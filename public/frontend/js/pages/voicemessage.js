
let voiceData;
let recorder = null;
let gumStream;
let input;
let audioElement = null;
let startButton = null;
let stopButton = null;
URL = window.URL || window.webkitURL;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

$(document).ready(() => {
    // voice message
    $('.voiceMsgBtn').on('click', function () {
        if ($(this).hasClass('btn-outline-danger')) {
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
            recorder.exportWAV(createDownloadLink)
            $(this).removeClass('btn-outline-danger')
        } else {
            $(this).addClass('btn-outline-danger')
            $('#voiceMsgTag').removeClass('hidden')
            $('#setemoj').addClass('hidden')
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(stream => {
                audioContext = new AudioContext();
                gumStream = stream;
                input = audioContext.createMediaStreamSource(stream);
                recorder = new Recorder(input, { numChannels: 1 })
                recorder.record()
            }).catch((err) => {
                console.log('Error: ', err)
            })
        }
    })
})

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    $('#voiceMsgTag').attr('src', url);
    voiceData = blob;
    $('#send-msg').removeClass('disabled').removeAttr("disabled")
}