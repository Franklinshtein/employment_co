document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");

    // Toggle the menu visibility on burger button click
    burger.addEventListener("click", () => {
        menu.classList.toggle("show");  // Toggling the class 'show' to display the menu
    });
});
