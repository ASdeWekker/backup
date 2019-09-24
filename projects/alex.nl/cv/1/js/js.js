$(document).ready(function() {
    for (var i = 1; i < 6; i++) {
        var tmpheight = $(".werk-plek:nth-child(" + i + ") .right").css("height");
        $(".werk-plek:nth-child(" + i + ") .left").css("height", tmpheight);
    }
});
