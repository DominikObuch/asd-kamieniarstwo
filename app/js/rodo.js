let rodoCloseEl = document.getElementsByClassName("close-rodo")
let rodoEl = document.getElementById("rodo");
if (!localStorage.getItem("rodo")) {
    rodoEl.classList.remove("d-none")
for(let i =0; i<rodoCloseEl.length; i++){
    rodoCloseEl[i].addEventListener("click", () => {
        rodoEl.classList.add("d-none");
       localStorage.setItem("rodo", "true");
    })
}
   
}