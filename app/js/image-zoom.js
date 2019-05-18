// setup for framework easyzoom 
var $easyzoom = $('.easyzoom').easyZoom();
var api = $easyzoom.data('easyZoom');
api.opts.loadingNotice = "ładowanie";
api.opts.errorNotice = "zdjęcie nie mogło zostać załadowane";
api.opts.linkAttribute = "data-src";

let downloadImg = (src, ...imageSrc) => {

    var downloadingImage = new Image();

    downloadingImage.onload = function () {

        for (let i = 0; i < imageSrc.length; i++) {
            imageSrc[i].src = src;
        }
        api.swap()
        api.show()

        document.getElementsByClassName("easyzoom")[0].classList.add("is-ready")
    };
    downloadingImage.src = src;
}

let zoomed = { //an object that represents the zoomed element 
    images: document.getElementsByClassName("products__image"),
    isZoomed: false,
    zoomSrc: document.getElementById("zoomSrc"),
    zoomHeader: document.getElementById("zoomHeader"),

    appearZoom(imgSrc, headingText) {

        //clearing imgages src
        this.zoomSrc.src = "";

        this.isZoomed = true;
        let fullSizeSrc = imgSrc.replace("products", "fullsize-products");

        downloadImg(fullSizeSrc, this.zoomSrc, this.zoomSrc.parentNode.dataset)
        this.zoomHeader.textContent = headingText;
        this.zoomEl.classList.remove("no-zoom");


    },
    disappearZoom(el) {
        if (el.target !== document.getElementsByClassName("zoomed__image")[0]) {
            this.zoomEl.classList.add("no-zoom");
            this.isZoomed = false

        }

    },
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