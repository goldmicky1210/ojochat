
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
            // recorder.start();
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(stream => {
                audioContext = new AudioContext();
                gumStream = stream;
                input = audioContext.createMediaStreamSource(stream);
                recorder = new Recorder(input, { numChannels: 1 })
                recorder.record()
                // recorder = new MediaRecorder(stream);
                // recorder.ondataavailable = (event) => {
                //     voiceData = event.data
                // }
                // recorder.onstop = () => {
                //     const blob = new Blob([voiceData], {type: 'audio/webm'}, 'audio.webm');
                //     const url = URL.createObjectURL(blob);
                //     $('#voiceMsgTag').attr('src', url);
                //     $('#send-msg').removeClass('disabled').removeAttr("disabled")
                // }
            }).catch((err) => {
                console.log('Error: ', err)
            })
        }
    })
})

function createDownloadLink(blob) {

    var url = URL.createObjectURL(blob);
    $('#voiceMsgTag').attr('src', url);
    console.log(url)
    console.log(blob)
    voiceData = blob;
    $('#send-msg').removeClass('disabled').removeAttr("disabled")

    // var au = document.createElement('audio');
    // var li = document.createElement('li');
    // var link = document.createElement('a');

    // //name of .wav file to use during upload and download (without extendion)
    // var filename = new Date().toISOString();

    // //add controls to the <audio> element
    // au.controls = true;
    // au.src = url;

    // //save to disk link
    // link.href = url;
    // link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
    // link.innerHTML = "Save to disk";

    // //add the new audio element to li
    // li.appendChild(au);

    // //add the filename to the li
    // li.appendChild(document.createTextNode(filename + ".wav "))

    // //add the save to disk link to li
    // li.appendChild(link);

    // //upload link
    // var upload = document.createElement('a');
    // upload.href = "#";
    // upload.innerHTML = "Upload";
    // upload.addEventListener("click", function (event) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.onload = function (e) {
    //         if (this.readyState === 4) {
    //             console.log("Server returned: ", e.target.responseText);
    //         }
    //     };
    //     var fd = new FormData();
    //     fd.append("audio_data", blob, filename);
    //     xhr.open("POST", "upload.php", true);
    //     xhr.send(fd);
    // })
    // li.appendChild(document.createTextNode(" "))//add a space in between
    // li.appendChild(upload)//add the upload link to li

    // //add the li element to the ol
    // recordingsList.appendChild(li);
}