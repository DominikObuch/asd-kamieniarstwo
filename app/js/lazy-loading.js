let lazyImageEl = document.getElementsByClassName("lazy-image");
let lazyLoadingEl = document.getElementsByClassName("lazy-loading");

let lazyLoadingAnim = (el) => {

    for (let i = 0; i < el.length; i++) {

        if (el[i].offsetTop <= window.innerHeight + window.scrollY) {
            el[i].classList.add("lazy-loaded");


        }
    }
}

let lazyLoadingImg = (imgEl, contEl) => {

    for (let i = 0; i < lazyLoadingEl.length; i++) {
        if (imgEl[i] != undefined) {
            if (contEl[i].offsetTop - 100 <= window.innerHeight + window.scrollY) {
                imgEl[i].src = imgEl[i].dataset.src;
            }
        }

    }
}
var scroll = function () {

    lazyLoadingAnim(lazyLoadingEl);
    lazyLoadingImg(lazyImageEl, lazyLoadingEl)
};
var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
var $window = window;
var lastScrollTop = $window.pageYOffset;

if (raf) {
    loop();
}

function loop() {
    var scrollTop = $window.pageYOffset;
    if (lastScrollTop === scrollTop) {
        raf(loop);
        return;
    } else {
        lastScrollTop = scrollTop;

        scroll();
        raf(loop);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    lazyLoadingAnim(lazyLoadingEl);
    lazyLoadingImg(lazyImageEl, lazyLoadingEl);
})