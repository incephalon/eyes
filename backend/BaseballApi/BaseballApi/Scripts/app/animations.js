

baseballApp.animation('.animate-team', function (globals) {

    var imgWidth = $("#teamsContainer").width() / $(".container img").length;

    return {
        enter: function (element, done) {
            $(element).css({
                width: imgWidth,
                opacity: 0
            });

            $(element).delay(50 * globals.teamsCounter++).fadeTo(1000, 1, done);
        }
    };
});

baseballApp.animation('.animate-player', function (globals) {

    return {
        enter: function (element, done) {
            $(element).css({
                opacity: 0
            });

            $(element).delay(50 * globals.playersCounter++).fadeTo(1000, 1, done);
        }
    };
});