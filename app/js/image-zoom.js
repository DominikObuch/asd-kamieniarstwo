let zoomed = {
    images: document.getElementsByClassName("products__image"),

    appearZoom(el){
        
        this.currentImgSrc = el.target.src;
        this.zoomEl.childNodes[1].childNodes[1].src = this.currentImgSrc;
        this.zoomEl.classList.remove("no-zoom");
    },
    disappearZoom(el){
        if(el.target !== document.getElementsByClassName("zoomed__image")[0]){
        this.zoomEl.classList.add("no-zoom");}
        

    },
    currentImgSrc: null,
    zoomEl: document.getElementById("zoomEl"),
}
for(let i=0; i<zoomed.images.length; i++){
    zoomed.images[i].addEventListener("click", function(el){zoomed.appearZoom(el)})
}
zoomed.zoomEl.addEventListener("click", function(el){
    zoomed.disappearZoom(el);
})