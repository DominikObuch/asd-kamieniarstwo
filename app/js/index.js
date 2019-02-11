document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('vid').play();
})
for (let i = 0; i < document.getElementsByClassName("link-smooth").length; i++) {
    document.getElementsByClassName("link-smooth")[i].addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}