function showLockedMessage() {
    alert("This feature is locked. Complete more tasks to unlock it!");
}

// jQuery for dropdown animation
$(document).ready(function () {
    $(".dropdown-btn").on("click", function (event) {
        event.stopPropagation();
        const menu = $(this).next(".dropdown-content");
        $(".dropdown-content").not(menu).stop(true, true).slideUp(180);
        menu.stop(true, true).slideToggle(180);
    });

    // Close dropdowns when clicking outside
    $(document).on("click", function () {
        $(".dropdown-content").stop(true, true).slideUp(180);
    });
});