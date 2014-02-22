$(document).ready(function() {

    var sjs = createjs.Sound;
    var interval = 0.46875;

    sjs.alternateExtensions = ["mp3"];
    sjs.addEventListener("fileload", handleLoad); // add an event listener for when load is completed
    sjs.registerSound("/wav/billie-jean/mj-bass.wav", "sound", 3);



    function handleLoad(event) {

        $(".play").click (function() {
            sjs.stop();
            sjs.play("sound");
            $(this).removeClass("play").addClass("stop").text("Stop");
        });
    };
});