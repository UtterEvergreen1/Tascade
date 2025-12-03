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
    $(".dropbtn").click(function () {
        $("#themes").slideToggle(300);
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.dropdown').length) {
            if ($("#themes").is(":visible")) {
                $("#themes").slideUp(300);
            }
        }
    });
});