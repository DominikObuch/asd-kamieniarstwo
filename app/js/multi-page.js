let prom = new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    filename = filename.substr(0, filename.length - 5) //remove ".html" from it 
    let fullurl = window.location.href.substring(0, window.location.href.lastIndexOf("/"))
    fullurl = fullurl.substring(0, fullurl.lastIndexOf("/"))
    fullurl = `${fullurl}/js/dataJSON/${filename}.json`
    xhr.open("GET", fullurl, true);

    xhr.addEventListener('load', function () {
        resolve(this.response)
    })
    xhr.send();
})
prom.then(function (value) {
    let response = JSON.parse(value);
    pages.data = response.data;
    pages.imageSrc = response.src;
    pages.letterNumber = response.letterNumber;
    let name = 'cont'
    var container = $('#pagination-' + name);
    var sources = function () {

        var result = [];
        for (let i = 1; i <= Math.ceil(pages.data.length / pages.articleEl[0].length); i++) {
            result.push(i)
        }
        return result;
    }();
    var options = {
        dataSource: sources,
        ulClassName: "products__list-point",
        pageSize: 1,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function (response, pagination) {
            let amount = pagination.pageNumber - pages.currentPage;
            animSwitchSite();

            if (pages.lastShown + pages.containersEl.length - pages.articleEl[0].length <= pages.data.length) { //checks if there are still some articles
                pages.lastShown += pages.containersEl.length * amount; // adds pages 

                pages.currentPage += amount;
                setTimeout(() => {
                    pages.overwriteCurrent();
                }, 200);
            }
        }
    };
    container.pagination(options);


})
//if in the future u will read it, just know I didn't know how the sql and any back-end language works and the customer didn't like cms so i had to do it like that :/ 
let pages = {
    lastShown: 0,
    currentShown: null,
    currentPage: 1,
    articleEl: [ //there are all the dom nodes I will change
        document.getElementsByClassName("products__heading"),
        document.getElementsByClassName("d-category"),
        document.getElementsByClassName("d-price"),
        document.getElementsByClassName("products__image"),
        document.getElementsByClassName("products__number"),
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
            if (this.data[this.currentShown] !== undefined) { //  image changing
                this.articleEl[3][i].src = `${this.imageSrc}${pages.lastShown+i+1}.jpg`
            }

            for (let x = 0; x < this.articleEl.length; x++) { //this one for specyfic property
                if (this.data[this.currentShown] == undefined) {
                    this.containersEl[i].classList.add("d-none");

                } else if (this.containersEl[i].classList.contains("d-none")) {
                    this.containersEl[i].classList.remove("d-none");
                    this.articleEl[x][i].textContent = this.data[this.currentShown][x];
                } else if (this.articleEl[x][i] !== undefined) {
                    this.articleEl[x][i].textContent = this.data[this.currentShown][x];

                }
            }
            if (this.data[this.currentShown] !== undefined) { //  letterNumber changing 
                this.articleEl[4][i].textContent += ` ${this.letterNumber+(pages.lastShown+i+1)}`

            }


            i++
        }
    }
}


function animSwitchSite(i) {

    for (let i = 0; i < document.getElementsByClassName("products__card").length; i++) {
        document.getElementsByClassName("products__card")[i].classList.add("reload-page");
    }
    pages.scrollTop();


    for (let i = 0; i < document.getElementsByClassName("products__card").length; i++) {
        document.getElementsByClassName("products__card")[i].addEventListener("animationend", function () {
            this.classList.remove("reload-page");
        })
    }
}