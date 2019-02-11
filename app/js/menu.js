let menu = {
    isShowed: false,
    childNumber: null,
    currentElShow: undefined,
    toggle() {
        this.isShowed = !this.isShowed;
        document.getElementsByClassName("menu__list-cont")[this.childNumber].classList.toggle("menu__show")
    },
    secondClicked() {
        if (this.target !== document.getElementsByClassName("menu__list-cont")[menu.childNumber]) {
            menu.toggle();
        }
    },
    clicked() {
        if (this.isShowed) {
            document.getElementsByClassName("menu__show")[0].addEventListener("transitionend", menu.secondClicked)
            if (menu.isShowed) {
                menu.isShowed = !menu.isShowed;
                document.getElementsByClassName("menu__show")[0].classList.remove("menu__show")
            }
        } else {
            this.toggle()
        }
    }
}
for (let i = 0; i < document.getElementsByClassName("menu").length; i++) {

    document.getElementsByClassName("menu")[i].addEventListener("click", function (e) {
        menu.childNumber = i;
        menu.currentElShow = e.target;
        menu.clicked()
        document.getElementsByClassName("menu__list-cont")[menu.childNumber].removeEventListener("transitionend", menu.secondClicked)

    })
}