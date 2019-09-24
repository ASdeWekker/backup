// File for all the jquery code.

// Getting the JSON data.
$.getJSON("5-json/pers.json", function(json) {
    var items = [];
    $.each(json, function(key, val) {
        for(var i = 0;i < val.werk0.length;i++) {
            items.push("<div class=" + val.classes[i] + "><p class='left'>" + val.datums[i] + "</p><p class='right'><b>" + val.werk0[i] + "</b><br>" + val.werk1[i] + "</p></div>");
        }
    });
    $("<div/>", { "class": "personalia", html: items.join("")}).prependTo(".page");
    $("<h2/>", { "class" : "title", html : "Personalia" }).prependTo(".personalia");
});
$.getJSON("5-json/werk.json", function(json) {
    var items = [];
    $.each(json, function(key, val) {
        for(var i = 0;i < val.werk0.length;i++) {
            items.push("<div class=" + val.classes[i] + "><p class='left'>" + val.datums[i] + "</p><p class='right'><b>" + val.werk0[i] + "</b><br>" + val.werk1[i] + "</p></div>");
        }
    });
    $("<div/>", { "class": "werk", html: items.join("")}).appendTo(".page");
    $("<h2/>", { "class" : "title", html : "Werkervaring" }).prependTo(".werk");
});
$.getJSON("5-json/seno.json", function(json) {
    var items = [];
    $.each(json, function(key, val) {
        for(var i = 0;i < val.werk0.length;i++) {
            items.push("<div class=" + val.classes[i] + "><p class='left'>" + val.datums[i] + "</p><p class='right'><b>" + val.werk0[i] + "</b><br>" + val.werk1[i] + "</p></div>");
        }
    });
    $("<div/>", { "class": "seno", html: items.join("")}).appendTo(".page");
    $("<h2/>", { "class" : "title", html : "Stages & Opleidingen" }).prependTo(".seno");
});

// Waiting for the document to be ready.
$(document).ready(function() {

    // Checking how to footer needs to be styled.
    var wheight = $(window).height();
    var hheight = $("html").height();
    if (hheight >= wheight) {
        $(".footer").addClass("fixed").removeClass("bottom");
    } else if (hheight <= wheight) {
        $(".footer").addClass("bottom").removeClass("fixed");
    }
    // Change the footer location after resizing the page.
    $(window).resize(function() {
        var wheight = $(window).height();
        var hheight = $("html").height() + 60;
        if (hheight >= wheight) {
            $(".footer").addClass("fixed").removeClass("bottom");
        } else if (hheight <= wheight) {
            $(".footer").addClass("bottom").removeClass("fixed");
        }
    });
});
