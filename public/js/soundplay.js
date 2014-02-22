$(document).ready(function() {

    var sjs = createjs.Sound;
    var interval = 468.75;
    var beatCount = 1; //use beatCount = -1 to cancel the updateBeat() function

    sjs.alternateExtensions = ["mp3"];
    sjs.addEventListener("fileload", handleLoad); // add an event listener for when load is completed
    sjs.registerSound("/wav/billie-jean/mj-bass.wav", "sound", 3);




    function handleLoad(event) {

        $("#play").click (function() {
            sjs.stop();
            var instance = sjs.play("sound");
            instance.addEventListener("complete", function() {beatCount = -1;}); //stop the beating when sound finishes
            _updateBeat();

        });

        $("#record").click (function() {
            sjs.stop();
            beatCount = -1;

            $("#play, #record").css({
                opacity: 0});

            setTimeout(function() {
                $("#play, #record").css({display: "none"});
                $("#cancel").css({display: "block"});
            }, 500);

        });
    };

    function _updateBeat(){

        $(".beat").removeClass("on"); //reset the previous beat
        $(".beat:nth-child(" + beatCount + ")").addClass("on");

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
});



