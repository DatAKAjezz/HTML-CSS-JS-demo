function toggleMobileMenu() {
    var menu = document.getElementById("menu");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        menu.classList.add("hide2");

    } else {
        menu.classList.remove("hide2");
        menu.classList.add("show");
    }
}

function navToSkills() {
    const target = document.getElementById("skills-wrapper");

    if (target) {
        target.scrollIntoView({behavior: "smooth"});
    }
}



