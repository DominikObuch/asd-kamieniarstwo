let arrowBackEl = document.getElementsByClassName("zoomed__arrow--back")[0];
let arrowForwardEl = document.getElementsByClassName("zoomed__arrow--forward")[0];

let isNotPlayingAnim = true;
let handleArrowBackClick = () => {
    let currentElNb = +(zoomed.zoomHeader.textContent.substring(zoomed.zoomHeader.textContent.lastIndexOf(pages.letterNumber[pages.letterNumber.length - 1]) + 1, zoomed.zoomHeader.textContent.length))
    if ((currentElNb != 1 && isNotPlayingAnim)) {
        isNotPlayingAnim = false;
        currentElNb--;
        document.getElementsByClassName("zoomed__cont")[0].classList.add("cont-move-back")


        zoomed.appearZoom(`${pages.imageSrc+currentElNb}.jpg`, `${pages.data[--currentElNb][0]} ${pages.letterNumber+ (++currentElNb)}`)


    }
}
let handleArrowForwardClick = () => {
    let currentElNb = +(zoomed.zoomHeader.textContent.substring(zoomed.zoomHeader.textContent.lastIndexOf(pages.letterNumber[pages.letterNumber.length - 1]) + 1, zoomed.zoomHeader.textContent.length))
    if ((currentElNb != pages.data.length && isNotPlayingAnim)) {
        isNotPlayingAnim = false;
        currentElNb++;
        document.getElementsByClassName("zoomed__cont")[0].classList.add("cont-move-forward")



        zoomed.appearZoom(`${pages.imageSrc+currentElNb}.jpg`, `${pages.data[--currentElNb][0]} ${pages.letterNumber+ (++currentElNb)}`)


    }
}
document.getElementsByClassName("zoomed__cont")[0].addEventListener("animationend", function () {
    document.getElementsByClassName("zoomed__cont")[0].classList.remove("cont-move-forward")
    document.getElementsByClassName("zoomed__cont")[0].classList.remove("cont-move-back")
    isNotPlayingAnim = true;
})
arrowBackEl.addEventListener("click", handleArrowBackClick)
arrowForwardEl.addEventListener("click", handleArrowForwardClick)
//disabling zoom on mobile devices
if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    api.teardown()
}



let startX;
let startY;
let endX;
let endY;

//Function to handle swipes
function handleTouch(start, end) {
    //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
    var xDist = endX - startX;
    let maxDyst = 100;


    if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && (window.matchMedia("(max-width:765px)").matches)) {

        if (xDist <= -maxDyst) {
            handleArrowForwardClick();
        } else if (xDist >= maxDyst) {
            handleArrowBackClick();
        }
    }

}
document.getElementsByClassName("zoomed__cont")[0].addEventListener('touchstart', function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
})
document.getElementsByClassName("zoomed__cont")[0].addEventListener('touchend', function (event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    handleTouch(startX, endX)
})