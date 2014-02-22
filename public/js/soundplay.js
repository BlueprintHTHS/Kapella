$(document).ready(function() {

    var sjs = createjs.Sound;
    var interval = 468.75;
    var beatCount = 1; //use beatCount = -1 to cancel the updateBeat() function

    sjs.alternateExtensions = ["mp3"];
    sjs.addEventListener("fileload", handleLoad); // add an event listener for when load is completed
    sjs.registerManifest([
        {src: "/wav/billie-jean/mj-bass.wav", id: "sound"},
        {src:"/wav/hi-hat.wav", id: "beat"}
    ]);

    var audioContext;
    var recorder;

    function startUserMedia(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        console.log('Media stream created.');

        input.connect(audioContext.destination);
        console.log('Input connected to audio context destination.');

        recorder = new Recorder(input);
        console.log('Recorder initialised.');
    }

    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audioContext = new AudioContext;
        console.log('Audio context set up.');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
        alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
        __log('No live audio input: ' + e);
    });

    function handleLoad(event) {
        if (event.src == "/wav/billie-jean/mj-bass.wav") {
            $("#play").click (function() {
                $(this).disabled = true;
                sjs.stop();
                var sound = sjs.play("sound");
                sound.addEventListener("complete", function() {
                    beatCount = -1;
                }); //stop the beating when sound finishes
                _updateBeat();

            });

            $("#record").click (function() { //cannot click till playing is done :'(
                sjs.stop(); //stop all sounds
                recorder.record();

                var sound = sjs.play("sound"); //mute the file
                sound.setMute(true);
                console.log('start record');
                sound.addEventListener("complete", function() {
                    beatCount = -1;
                    recorder.stop();
                    console.log('stop record');

                    $("#cancel").css({ //show cancel button
                        opacity: 0});

                    setTimeout(function() {
                        $("#cancel").css({display: "none"});
                        $("#play, #record").css({display: "block", opacity: 1});
                    }, 500);

                    var buffer = recorder.getBuffer();
                    getBufferCallback(buffer);

                }); //stop the beating when sound finishes
                _updateBeat();

                $("#play, #record").css({ //show cancel button
                    opacity: 0});

                setTimeout(function() {
                    $("#play, #record").css({display: "none"});
                    $("#cancel").css({display: "block", opacity: 1});
                }, 500);

            });

            $("#cancel").click(function() {
                beatCount = -1;

                sjs.stop(); //stop all sounds
                recorder.stop();
                recorder.clear();

                $("#cancel").css({ //show cancel button
                    opacity: 0});

                setTimeout(function() {
                    $("#cancel").css({display: "none"});
                    $("#play, #record").css({display: "block", opacity: 1});
                }, 500);
            });
        }
    };

    function _updateBeat(){

        $(".beat").removeClass("on"); //reset the previous beat
        $(".beat:nth-child(" + beatCount + ")").addClass("on");
        var beat = sjs.play("beat");
        beat.setVolume(0.25);

        setTimeout(function() {
            beatCount += 1;
            if (beatCount ==  5) {
                $(".beat").removeClass("on"); //increment the red dots on the beats
                beatCount = 1;
            }

            if (beatCount == 0) {
                $(".beat").removeClass("on"); //clear all beat circles
                beatCount = 1; //reset the beatcount
                return;
            }
            _updateBeat();
        }, interval);

    };

    function getBufferCallback( buffers ) {
        var newSource = audioContext.createBufferSource();
        var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        newSource.buffer = newBuffer;

        newSource.connect( audioContext.destination );
        newSource.start(0);
    }
});



