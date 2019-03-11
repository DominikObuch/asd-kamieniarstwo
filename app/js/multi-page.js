let prom = new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    filename = filename.substr(0, filename.length - 5) //remove ".html" from it 
    xhr.open("GET", `${window.origin}/js/dataJSON/${filename}.json`, true);
    xhr.addEventListener('load', function () {
        resolve(this.response)
    })
    xhr.send();
})
prom.then(function (value) {

    let response = JSON.parse(value);
    pages.data = response.data;
    pages.overwriteCurrent();
    document.getElementById("lastPage").textContent = Math.ceil(pages.data.length / pages.containersEl.length)


})
//if in the future u will read it, just know I didn't know how the sql and any back-end language works and the customer didn't like cms so i had to do it like that :/ 
let pages = {
    lastShown: 0,
    currentShown: null,
    currentPage: 1,
    articleEl: [ //there are all the dom nodes I will change
        document.getElementsByClassName("products__heading"),
        document.getElementsByClassName("d-category"),
        document.getElementsByClassName("d-granite"),
        document.getElementsByClassName("d-width"),
        document.getElementsByClassName("d-height"),
        document.getElementsByClassName("d-price"),
        document.getElementsByClassName("products__image"),
    ],

    scrollTop() {
        document.getElementById("scroll-top").scrollIntoView({
            behavior: 'smooth'
        })
    },

    containersEl: document.getElementsByClassName("products__card"),


    overwriteCurrent() {
        let i = 0;
        for (this.currentShown = this.lastShown; this.currentShown < this.containersEl.length + this.lastShown; this.currentShown++) { //this one for current article 

            for (let x = 0; x < this.articleEl.length; x++) { //this one for specyfic property


                if (this.data[this.currentShown] == undefined) {
                    this.containersEl[i].classList.add("d-none");
                } else if (this.articleEl[x][i] != undefined) {
                    this.articleEl[x][i].textContent = this.data[this.currentShown][x];
                }

            }

            // another one for image changing
            if (this.data[this.currentShown] !== undefined) {

                this.articleEl[6][i].src = this.data[this.currentShown][6]
            }
            i++
        }
    }
}

let switchSiteEl = document.getElementsByClassName("switchSite")

function animSwitchSite(i) {

    for (let i = 0; i < document.getElementsByClassName("products__card").length; i++) {
        document.getElementsByClassName("products__card")[i].classList.add("reload-page");
    }
    pages.scrollTop();
    window.setTimeout(function () {

        if (+switchSiteEl[i].textContent > pages.currentPage) {
            nextPages(+switchSiteEl[i].textContent - pages.currentPage)
        } else {
            prevPages(+switchSiteEl[i].textContent - pages.currentPage)
        }
    }, 750)

    for (let i = 0; i < document.getElementsByClassName("products__card").length; i++) {
        document.getElementsByClassName("products__card")[i].addEventListener("animationend", function () {
            this.classList.remove("reload-page");
        })
    }


}

for (let i = 0; i < switchSiteEl.length; i++) {
    switchSiteEl[i].addEventListener("click", function () {
        animSwitchSite(i)

    })
}
let nextPageEl = document.getElementById("nextPage");
nextPageEl.addEventListener("click", () => { // it goes to next page of products
    animSwitchSite()
    nextPages();

})

let prevPageEl = document.getElementById("prevPage");
prevPageEl.addEventListener("click", () => { // it goes to previous page of products

    prevPages();
})
let nextPages = (amount = 1) => {

    if (pages.lastShown + pages.containersEl.length <= pages.data.length) { //checks if there are still some articles
        pages.lastShown += pages.containersEl.length * amount; // adds pages 
        switchingNumbers(amount);
        pages.currentPage += amount;
        pages.overwriteCurrent();
    }
}
let prevPages = (amount = -1) => {

    if (pages.lastShown >= pages.containersEl.length) { //checks if there are still some articles
        pages.lastShown += pages.containersEl.length * amount;

        for (let i = 0; i < pages.containersEl.length; i++) { // shows the unseen articles 
            pages.containersEl[i].classList.remove("d-none");
        }
        switchingNumbers(amount)
        pages.currentPage += amount;
        pages.overwriteCurrent();
    }
}


//this function adds or minus numbers from the menu section
function switchingNumbers(char) { //this argument can be -1 or 1, -1 means prev page and 1 means next page
    console.log("first case: " + pages.currentPage == 1 || (pages.currentPage == 2 && char == -1),
        "second case: " + pages.currentPage + char + 2 >= Math.ceil(pages.data.length / pages.containersEl.length) || char >= pages.currentPage,
        "third case: " + pages.currentPage + char > Math.ceil(pages.data.length / pages.containersEl.length) - 2,
        char, pages.currentPage

    )

    if (pages.currentPage == 1 || (pages.currentPage == 2 && char == -1)) { //checks if are u on first site or want to go there
        for (let i = 0; i < 2; i++) {
            document.getElementsByClassName("changeNumber")[i].classList.toggle("text-danger")
        }
        if (pages.currentPage == 1 && char > 1) {
            char--;
            for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {

                document.getElementsByClassName("changeNumber")[i].textContent = +document.getElementsByClassName("changeNumber")[i].textContent + char;
            }
        }
    } else if (pages.currentPage + char + 2 >= Math.ceil(pages.data.length / pages.containersEl.length) || char >= pages.currentPage) {
        document.getElementsByClassName("products__list-point")[--document.getElementsByClassName("products__list-point").length].classList.add("d-none")
        document.getElementsByClassName("products__list-point")[document.getElementsByClassName("products__list-point").length -= 2].classList.add("d-none")

        let current;
        for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {

            if (document.getElementsByClassName("changeNumber")[i].classList.contains("text-danger")) {
                current = i; // it cholds the number of the active element 
            }

        }
        // when only 2 pages remaining and u clicked the last or the one before last  
        if ((pages.currentPage + char > Math.ceil(pages.data.length / pages.containersEl.length) - 2) || (pages.currentPage + char > Math.ceil(pages.data.length / pages.containersEl.length))) {

            if (char < 0) {

                char++;
            }
            if (pages.currentPage == Math.ceil(pages.data.length / pages.containersEl.length)) {

                document.getElementsByClassName("changeNumber")[current].classList.toggle("text-danger")
                document.getElementsByClassName("changeNumber")[current - 1].classList.toggle("text-danger")
                char--;
            } else {
                document.getElementsByClassName("changeNumber")[current].classList.toggle("text-danger")
                document.getElementsByClassName("changeNumber")[current + char].classList.toggle("text-danger")
                char++

            }

        } //when u clicked 3 from the end
        else {
            for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {
                document.getElementsByClassName("changeNumber")[i].textContent = +document.getElementsByClassName("changeNumber")[i].textContent + char;
            }

        }

    } else { //it starts when u leave the lasts of the pages  
        for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {
            if (document.getElementsByClassName("changeNumber")[i].classList.contains("text-danger")) {
                current = i; //it cholds the number of the active element 
                if (document.getElementsByClassName("changeNumber")[current] == document.getElementsByClassName("changeNumber")[i]) {
                    diff = i;

                }
            }

        }

        for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {

        }
        for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {
            document.getElementsByClassName("changeNumber")[i].classList.remove("text-danger");

        }
        document.getElementsByClassName("changeNumber")[1].classList.add("text-danger")

        if (pages.currentPage == Math.ceil(pages.data.length / pages.containersEl.length)) {
            char -= 2;
           
        }
        if (pages.currentPage == Math.ceil(pages.data.length / pages.containersEl.length) - 1) {
           
            if (char == -2) {
                char++
            } else {

            }

        }
        if (pages.currentPage == Math.ceil(pages.data.length / pages.containersEl.length)) {

        }

        document.getElementsByClassName("products__list-point")[--document.getElementsByClassName("products__list-point").length].classList.remove("d-none")
        document.getElementsByClassName("products__list-point")[document.getElementsByClassName("products__list-point").length -= 2].classList.remove("d-none")
        for (let i = 0; i < document.getElementsByClassName("changeNumber").length; i++) {
            document.getElementsByClassName("changeNumber")[i].textContent = +document.getElementsByClassName("changeNumber")[i].textContent + char;
        }
    }
}