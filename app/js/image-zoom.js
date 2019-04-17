// setup for framework easyzoom 
var $easyzoom = $('.easyzoom').easyZoom();
var api = $easyzoom.data('easyZoom');
api.opts.loadingNotice = "ładowanie";
api.opts.errorNotice = "Zdjęcie nie mogło zostać załadowane";
api.opts.linkAttribute = "data-src";

let zoomed = { //an object that represents the zoomed element 
    images: document.getElementsByClassName("products__image"),
    isZoomed: false,
    zoomSrc: document.getElementById("zoomSrc"),
    zoomHeader: document.getElementById("zoomHeader"),

    appearZoom(imgSrc, headingText) {

        this.isZoomed = true;
        this.currentImgSrc = imgSrc;
        this.zoomSrc.src = this.currentImgSrc; //change current image src
        this.zoomHeader.textContent = headingText;
        this.zoomSrc.parentNode.dataset.src = this.currentImgSrc;
        this.zoomEl.classList.remove("no-zoom");
        api.swap();
    },
    disappearZoom(el) {
        if (el.target !== document.getElementsByClassName("zoomed__image")[0]) {
            this.zoomEl.classList.add("no-zoom");
            this.isZoomed = false
            
        }

    },
    currentImgSrc: null,
    zoomEl: document.getElementById("zoomEl"),
}
for (let i = 0; i < zoomed.images.length; i++) {
    zoomed.images[i].addEventListener("click", function (el) {
        zoomed.appearZoom(el.target.src, el.target.nextElementSibling.firstElementChild.textContent, )
    })
}
zoomed.zoomEl.addEventListener("click", function (el) {
    if ((el.target == document.getElementById("zoomEl")) || (el.target.parentNode === document.getElementsByClassName("zoomed__close")[0])) {
        zoomed.disappearZoom(el);
    }
})
//when u press esc and zoom is on then zoom disappear
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if ((evt.keyCode == 27) && (zoomed.isZoomed)) {
        zoomed.disappearZoom(zoomed.zoomEl)
    }
};