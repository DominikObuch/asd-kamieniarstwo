let zoomed = {
    images: document.getElementsByClassName("products__image"),
    
}
for(let i=0; i<zoomed.length; i++){
    zoomed.images[i].addEventListener("click", ()=>{
        console.log(this)
    })
}
setTimeout(console.log(document.getElementsByClassName("products__image")),90000)