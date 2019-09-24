$(document).ready(function() { 

    // Set the SVG window size.
    var h = $(window).height();
    var w = $(window).width();
    if (h > w) {
        $(".svg").css("width", "100%");
        var sh = $(".svg").width() + 10;
        $(".svg").css({"height":sh,"display":"block"});
    } else {
        $(".svg").css("height", "100%");
        var sw = $(".svg").height() + 10;
        $(".svg").css({"width":sw, "display":"block"});
    }

    $("h3").on("click", function() {
        $(this).css("color", "red");
    });

});

var svg = d3.select("svg");

svg.append("rect").attr("height", "6%").attr("width", "6%").attr("fill", "lightblue").attr("x", "2%").attr("y", "2%");
d3.select("rect").transition().attr("x","92%").duration(2000).transition().attr("y", "92%").duration(2000).transition().attr("x", "2%").duration(2000).transition().attr("y", "2%").duration(2000);
