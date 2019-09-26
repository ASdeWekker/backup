$(document).ready(function() {
    $(".item--title").on("click", function() {
        $(this).siblings().slideToggle(200)
    })
})
