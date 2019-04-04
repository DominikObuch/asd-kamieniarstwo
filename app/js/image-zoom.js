let zoomed = {
    images: document.getElementsByClassName("products__image"),
    isZoomed: false,

    appearZoom(el){
        this.isZoomed = true;
        this.currentImgSrc = el.target.src;
        this.zoomEl.childNodes[1].childNodes[1].src = this.currentImgSrc;
        this.zoomEl.classList.remove("no-zoom");
    },
    disappearZoom(el){
        if(el.target !== document.getElementsByClassName("zoomed__image")[0]){
        this.zoomEl.classList.add("no-zoom");}
        this.isZoomed = false

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
//when u press esc and zoom is on then zoom disappear
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if ((evt.keyCode == 27) &&(zoomed.isZoomed)) {
       zoomed.disappearZoom(zoomed.zoomEl)
    }
};
document.getElementsByClassName("zoomed__image")[0].addEventListener("touchstart", e=>{

})


let startX;
let startY;
let endX;
let endY;

//Function to handle swipes
function handleTouch(start,end){
  //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
  var xDist = endX - startX;
  var yDist = endY - startY;
  let maxDyst = 100;
  
  if(xDist >= maxDyst || yDist >= maxDyst || xDist <= -maxDyst || yDist <= -maxDyst ){
      zoomed.disappearZoom(zoomed.zoomEl)
  }  
}
 document.getElementsByClassName("zoomed__image")[0].addEventListener('touchstart', function(event){
   startX = event.touches[0].clientX;
   startY = event.touches[0].clientY;
 })
  document.getElementsByClassName("zoomed__image")[0].addEventListener('touchend', function(event){
   endX = event.changedTouches[0].clientX;
   endY = event.changedTouches[0].clientY;
   handleTouch(startX, endX)
 })

