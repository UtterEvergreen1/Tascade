function showLockedMessage() {
    alert("This feature is locked. Complete more tasks to unlock it!");
}

// jQuery for dropdown animation
$(document).ready(function () {
    $(".dropdown-content").hide();
    $(".dropdown-btn").click(function () {
        let $themes = $("#themes");
        $themes.finish();
        $themes.slideToggle(300);
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.my-dropdown').length) {
            let $themes = $("#themes");
            if ($themes.is(":visible")) {
                $themes.finish();
                $themes.slideUp(300);
            }
        }
    });
});