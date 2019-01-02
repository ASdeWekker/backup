// ---------- ALL THE JQUERY STUFF ----------

$(document).ready(function() {
    // Change a bit of text color
    var cuntt = 1;
    $("p").click(function() {
        //$(this).css("color", "blue");
        if (cuntt === 1) {
            $(this).css("color", "blue");
            cuntt = 2;
        } else if (cuntt === 2) {
            $(this).css("color", "#eee");
            cuntt = 1;
        }
    });

    // Handle server side request
    $(".dbbutton").click(function() {
        $.post("/dbtest");
    });
});