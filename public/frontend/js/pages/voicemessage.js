
const voiceList = [];
let recorder = null;
let audioElement = null;
let startButton = null;
let stopButton = null;

$(document).ready(() => {
    // voice message
    $('.voiceMsgBtn').on('click', function () {
        if ($(this).hasClass('btn-outline-danger')) {
            recorder.stop();
            $(this).removeClass('btn-outline-danger')
        } else {
            $(this).addClass('btn-outline-danger')
            $('#voiceMsgTag').removeClass('hidden')
            $('#setemoj').addClass('hidden')
            recorder.start();
        }
    })
    navigator.mediaDevices.getUserMedia({
        audio:true
    }).then(stream => {
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
            voiceList.push(event.data);
        }
        recorder.onstop = () => {
            const blob = new Blob(voiceList, {
                type: 'audio/mp4; codecs=opus'
            });
            const url = URL.createObjectURL(blob);
            $('#voiceMsgTag').attr('src', url);
        }
    })

})