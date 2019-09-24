$(document).ready(function() {
	var height = $("html").height();
	$(".wiper").css({height: height});
	$("button").click(function() {
		$(".wiper").animate({left: "2000px"}, "slow");
	});
});
