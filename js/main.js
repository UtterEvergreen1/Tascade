const dropDowns = document.querySelectorAll('.dropdown-content');

function showDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function showLockedMessage() {
    alert("This feature is locked. Complete more tasks to unlock it!");
}

window.onclick = e => {
    if (!e.target.matches('.themes-dropdown')) {
        e.stopPropagation();
        dropDowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}
