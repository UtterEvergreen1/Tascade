const dropDowns = document.querySelectorAll('.dropdown-content');

function showDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function showLockedMessage() {
    alert("This feature is locked. Complete more tasks to unlock it!");
}

window.onclick = e => {
    if (!e.target.matches('.dropbtn')) {
        dropDowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// jQuery for dropdown animation
$(document).ready(function () {

    $(".dropbtn").on("click", function (event) {
        event.stopPropagation();
        const menu = $(this).next(".dropdown-content");
        $(".dropdown-content").not(menu).stop(true, true).slideUp(180);
        menu.stop(true, true).slideToggle(180);
    });
    $(document).on("click", function () {
        $(".dropdown-content").stop(true, true).slideUp(180);
    });

});