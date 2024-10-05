document.addEventListener("DOMContentLoaded", function() {
    const nav = document.getElementById("nav");
    let lastScrollY = window.scrollY;
    const scrollThreshold = 200; // Cantidad de scroll en px

    window.addEventListener("scroll", () => {
        if (window.scrollY > scrollThreshold) {
            if (window.scrollY > lastScrollY) {
                nav.style.top = "-100px"; // Altura de tu nav
            } else {
                nav.style.top = "0";
            }
        } else {
            nav.style.top = "0";
        }
        lastScrollY = window.scrollY;
    });
});

