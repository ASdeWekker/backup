$(document).ready(function() {
  $(".menu-button").click(function() {
    if ($("nav").css("height") === "0px") {
    $("nav").removeClass("closed");
      $("nav").addClass("open");
    } else if ($("nav").css("height") === "188px") {
      $("nav").removeClass("open");
      $("nav").addClass("closed");
    }
  });
});
