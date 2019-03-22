
document.getElementById("hamburger").addEventListener("click", function () {
    for (let i = 0; i < document.getElementsByClassName("hamburger").length; i++) {
        document.getElementsByClassName("hamburger")[i].classList.toggle("hamburger__expanded");
    }
})