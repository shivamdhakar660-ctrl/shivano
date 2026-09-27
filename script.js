const searchBox = document.getElementById("productSearch");
const sortBox = document.getElementById("sortProducts");
const categoryFilter = document.getElementById("categoryFilter");

const productContainer = document.querySelector(".product-container");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const noResults = document.getElementById("noResults");
const topButton = document.getElementById("topButton");


/* =========================
   SEARCH + CATEGORY + SORT
========================= */

function updateProducts() {

    const searchText = searchBox.value.toLowerCase();
    const sortValue = sortBox.value;
    const categoryValue = categoryFilter.value;

    let matchingProducts = [];
    let hiddenProducts = [];


    productCards.forEach(function (card) {

        const productName =
            card.querySelector("h3").textContent.toLowerCase();

        const productDescription =
            card.querySelector(".product-card p").textContent.toLowerCase();

        const productCategory =
            card.querySelector(".product-category").textContent;


        const searchMatch =
            (productName + " " + productDescription).includes(searchText);

        const categoryMatch =
            categoryValue === "all" ||
            productCategory === categoryValue;


        if (searchMatch && categoryMatch) {
            matchingProducts.push(card);
        } else {
            hiddenProducts.push(card);
        }

    });


    /* =========================
       SORT BY PRICE
    ========================= */

    if (sortValue === "low") {

        matchingProducts.sort(function (a, b) {

            const priceA = parseInt(
                a.querySelector("h4").textContent.replace(/[^\d]/g, "")
            );

            const priceB = parseInt(
                b.querySelector("h4").textContent.replace(/[^\d]/g, "")
            );

            return priceA - priceB;

        });

    }


    if (sortValue === "high") {

        matchingProducts.sort(function (a, b) {

            const priceA = parseInt(
                a.querySelector("h4").textContent.replace(/[^\d]/g, "")
            );

            const priceB = parseInt(
                b.querySelector("h4").textContent.replace(/[^\d]/g, "")
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
       HIDE NON-MATCHING PRODUCTS
    ========================= */

    hiddenProducts.forEach(function (card) {

        card.style.display = "none";
        productContainer.appendChild(card);

    });


    /* =========================
       NO RESULTS
    ========================= */

    if (matchingProducts.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* =========================
   SEARCH
========================= */

searchBox.addEventListener("input", updateProducts);


/* =========================
   SORT
========================= */

sortBox.addEventListener("change", updateProducts);


/* =========================
   CATEGORY
========================= */

categoryFilter.addEventListener("change", updateProducts);


/* =========================
   SCROLL TO TOP
========================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});

/* =========================
   CLOSE MOBILE MENU
========================= */

const navItems = document.querySelectorAll(".nav-links a");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});