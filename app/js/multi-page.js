let pages = {
    lastShown: null,
    articleEl: [ //there are all the dom nodes I will change
        document.getElementsByClassName("products__heading"),
        document.getElementsByClassName("d-category"),
        document.getElementsByClassName("d-granite"),
        document.getElementsByClassName("d-width"),
        document.getElementsByClassName("d-height"),
        document.getElementsByClassName("d-price"),
        document.getElementsByClassName("products__image"),
    ],


    containersEl: document.getElementsByClassName("products__card"),
    firstPage: [ //table with all the date for the first page 
        //[name, category, granite, widht, height,]
        ["N1", "pojedyńcze", "impala", 20, 500, 50100, "/images/products/single/single5.jpg"],
        ["N2", "dziecięce", "Baltic Green", 100, 100, 7000, "/images/products/single/single2.jpg"],
        ["N3", "pojedyńcze", "impala", 400, 100, 4000, "/images/products/single/single3.jpg"],
        ["N4", "urnowe", "Azul Noche", 660, 100, 1000, "/images/products/single/single4.jpg"],
        ["N5", "podwójne", "Baltic Brown", 101, 100, 4000, "/images/products/single/single5.jpg"],
        ["N6", "pojedyńcze", "impala", 200, 111, 6000, "/images/products/single/single3.jpg"],
        ["N7", "pojedyńcze", "impala", 200, 111, 6000, "/images/products/single/single6.jpg"],
        ["N8", "pojedyńcze", "impala", 200, 111, 6000, "/images/products/single/single1.jpg"],
        ["N9", "pojedyńcze", "impala", 200, 111, 6000, "/images/products/single/single6.jpg"],
        ["N10", "pojedyńcze", "impala", 200, 111, 6000, "/images/products/single/single7.jpg"]
    ],
    overwriteCurrent() {
        for (let i = 0; i < this.firstPage.length; i++) {//this one for current article 
            for (let x = 0; x < this.articleEl.length; x++) {//this one for specyfic property
                    this.articleEl[x][i].textContent = this.firstPage[i][x]
            }
            // another one for image changing
            this.articleEl[6][i].dataset.src = this.firstPage[i][6]
        }
    }
}
pages.overwriteCurrent();