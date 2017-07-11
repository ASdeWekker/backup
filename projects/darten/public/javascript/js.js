$(document).ready(function() {
    $("p").click(function() {
        $(this).css({color: "red"});
    });
    $(".addPlayer").click(function() {
        var NOP = parseInt($(".numberOP").val());
        console.log(NOP);
    });
});
