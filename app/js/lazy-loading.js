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
            if (contEl[i].offsetTop + 50 <= window.innerHeight + window.scrollY) {
                imgEl[i].src = imgEl[i].dataset.src;
            }
        }

    }
}

window.addEventListener("scroll", () => {

    lazyLoadingAnim(lazyLoadingEl);
    lazyLoadingImg(lazyImageEl, lazyLoadingEl)
})
document.addEventListener("DOMContentLoaded", () => {
    lazyLoadingAnim(lazyLoadingEl);
    lazyLoadingImg(lazyImageEl, lazyLoadingEl)
})