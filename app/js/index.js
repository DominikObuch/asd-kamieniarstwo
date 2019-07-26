window.addEventListener("load", () => {
    if (document.getElementById("vid") != undefined) {
        document.getElementById('vid').play();
    }
    document.getElementsByClassName("header__heading")[0].classList.add("header__heading--active")


})
for (let i = 0; i < document.getElementsByClassName("link-smooth").length; i++) {
    document.getElementsByClassName("link-smooth")[i].addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}