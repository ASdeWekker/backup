$(document).ready(function() {
    $("h1").on("click", function() {
        $(this).css("color", "white");
    });

    $(".knop").on("click", function() {
        $("p").toggleClass("hide");
    });
});