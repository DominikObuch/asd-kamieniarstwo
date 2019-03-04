// let graniteEl = document.getElementsByClassName("d-granite");
// let widthEl = document.getElementsByClassName("d-width");
// let heightEl = document.getElementsByClassName("d-height");
// let priceEl = document.getElementsByClassName("d-price");
// let articlesEl = document.getElementsByClassName("products__card");
// let sortByType;

// let table = [];


// let comparator = {
//     increasing(a, b) {
//         if (+a[0] == +b[0]) {
//             return 0;
//         } else {
//             return (+a[0] < +b[0]) ? -1 : 1;
//         }
//     },
//     decresing(a, b) {
//         if (+b[0] == +a[0]) {
//             return 0;
//         } else {
//             return (+b[0] < +a[0]) ? -1 : 1;
//         }
//     },
//     alphabetically(a, b) {

//         if (a[0] == b[0]) {
//             return 0;
//         } else {
//             return (b[0] > a[0]) ? -1 : 1;
//         }
//     }


// }



// let sorting = {
//     list: [...document.getElementsByClassName("menu__list-point--sort")],
//     comparingSequence: [comparator.increasing, comparator.decresing, comparator.alphabetically, comparator.increasing, comparator.decresing, comparator.increasing, comparator.decresing],
//     sortTypeSequence: [priceEl, priceEl, graniteEl, widthEl, widthEl, heightEl, heightEl],
// }
// for (let x = 0; x < sorting.list.length; x++) {
//     sorting.list[x].addEventListener("click", function () {
//         menu.toggle();
//         for (let i = 0; i < articlesEl.length; i++) {
//             table[i] = [sorting.sortTypeSequence[x][i].textContent, articlesEl[i]];
//         }
//         table.sort(sorting.comparingSequence[x]);
//         for (let i = 0; i < table.length; i++) {
//             table[i][1].classList.add("fadeOutIn");
//             table[i][1].style.order = `${i}`;
//         }
//         lazyLoadingAnim(lazyLoadingEl);
//         lazyLoadingImg(lazyImageEl, lazyLoadingEl);
//     })
// }
// for (let i = 0; i < articlesEl.length; i++) {
//     articlesEl[i].addEventListener("animationend", function () {
//         table[i][1].classList.remove("fadeOutIn");
//     })
// }

