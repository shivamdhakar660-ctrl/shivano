const searchBox = document.getElementById("productSearch");
const sortBox = document.getElementById("sortProducts");
const categoryFilter = document.getElementById("categoryFilter");

const productContainer =
    document.querySelector(".product-container");

const productCards =
    Array.from(
        document.querySelectorAll(".product-card")
    );

const noResults =
    document.getElementById("noResults");

const topButton =
    document.getElementById("topButton");


/* =========================
   PRODUCT SEARCH + FILTER + SORT
========================= */

function updateProducts() {

    const searchText =
        searchBox.value.toLowerCase();

    const sortValue =
        sortBox.value;

    const categoryValue =
        categoryFilter.value;


    let matchingProducts = [];

    let hiddenProducts = [];


    productCards.forEach(function (card) {

        const productName =
            card
                .querySelector("h3")
                .textContent
                .toLowerCase();


        const productDescription =
            card
                .querySelector(".product-card p")
                .textContent
                .toLowerCase();


        const productCategory =
            card
                .querySelector(".product-category")
                .textContent;


        const searchMatch =
            (productName + " " + productDescription)
                .includes(searchText);


        const categoryMatch =
            categoryValue === "all" ||
            productCategory === categoryValue;


        if (
            searchMatch &&
            categoryMatch
        ) {

            matchingProducts.push(card);

        } else {

            hiddenProducts.push(card);

        }

    });


    /* =========================
       LOW TO HIGH
    ========================= */

    if (sortValue === "low") {

        matchingProducts.sort(function (a, b) {

            const priceA =
                parseInt(
                    a
                        .querySelector("h4")
                        .textContent
                        .replace(/[^\d]/g, "")
                );


            const priceB =
                parseInt(
                    b
                        .querySelector("h4")
                        .textContent
                        .replace(/[^\d]/g, "")
                );


            return priceA - priceB;

        });

    }


    /* =========================
       HIGH TO LOW
    ========================= */

    if (sortValue === "high") {

        matchingProducts.sort(function (a, b) {

            const priceA =
                parseInt(
                    a
                        .querySelector("h4")
                        .textContent
                        .replace(/[^\d]/g, "")
                );


            const priceB =
                parseInt(
                    b
                        .querySelector("h4")
                        .textContent
                        .replace(/[^\d]/g, "")
                );


            return priceB - priceA;

        });

    }


    /* =========================
       SHOW MATCHING PRODUCTS
    ========================= */

    matchingProducts.forEach(function (card) {

        card.style.display = "block";

        productContainer.appendChild(card);

    });


    /* =========================
       HIDE NON-MATCHING
    ========================= */

    hiddenProducts.forEach(function (card) {

        card.style.display = "none";

        productContainer.appendChild(card);

    });


    /* =========================
       NO RESULTS
    ========================= */

    if (
        matchingProducts.length === 0
    ) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchBox.addEventListener(
    "input",
    updateProducts
);


sortBox.addEventListener(
    "change",
    updateProducts
);


categoryFilter.addEventListener(
    "change",
    updateProducts
);


/* =========================
   SCROLL TO TOP
========================= */

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    }
);


topButton.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle(
            "active"
        );


        if (
            navLinks.classList.contains("active")
        ) {

            menuBtn.textContent = "✕";

        } else {

            menuBtn.textContent = "☰";

        }

    }
);


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            navLinks.classList.remove(
                "active"
            );

            menuBtn.textContent = "☰";

        }
    );

});


/* =========================
   HERO PRODUCT SLIDER
========================= */

const slides =
    document.querySelectorAll(
        ".hero-slide"
    );

const sliderDots =
    document.querySelectorAll(
        ".slider-dot"
    );

const sliderNext =
    document.getElementById(
        "sliderNext"
    );

const sliderPrev =
    document.getElementById(
        "sliderPrev"
    );


let currentSlide = 0;

let sliderTimer;


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    if (index >= slides.length) {

        currentSlide = 0;

    } else if (index < 0) {

        currentSlide =
            slides.length - 1;

    } else {

        currentSlide = index;

    }


    slides.forEach(function (slide) {

        slide.classList.remove(
            "active"
        );

    });


    sliderDots.forEach(function (dot) {

        dot.classList.remove(
            "active"
        );

    });


    slides[currentSlide]
        .classList
        .add("active");


    sliderDots[currentSlide]
        .classList
        .add("active");

}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

    restartSlider();

}


/* =========================
   PREVIOUS SLIDE
========================= */

function previousSlide() {

    showSlide(
        currentSlide - 1
    );

    restartSlider();

}


/* =========================
   AUTOMATIC SLIDER
========================= */

function startSlider() {

    sliderTimer =
        setInterval(
            function () {

                showSlide(
                    currentSlide + 1
                );

            },
            3000
        );

}


/* =========================
   RESTART TIMER
========================= */

function restartSlider() {

    clearInterval(
        sliderTimer
    );

    startSlider();

}


/* =========================
   NEXT BUTTON
========================= */

sliderNext.addEventListener(
    "click",
    nextSlide
);


/* =========================
   PREVIOUS BUTTON
========================= */

sliderPrev.addEventListener(
    "click",
    previousSlide
);


/* =========================
   DOT BUTTONS
========================= */

sliderDots.forEach(
    function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const slideNumber =
                    parseInt(
                        dot.dataset.slide
                    );


                showSlide(
                    slideNumber
                );


                restartSlider();

            }
        );

    }
);


/* =========================
   START SLIDER
========================= */

showSlide(0);

startSlider(3000);