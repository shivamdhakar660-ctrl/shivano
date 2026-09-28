/* =========================================================
   SHIVANO - MAIN JAVASCRIPT
========================================================= */

const products = [
    {
        id: 1,
        name: "Classic Shirt",
        price: 999,
        image: "./images/shirt.jpg",
        category: "Fashion",
        description: "Comfortable and stylish shirt designed for everyday wear.",
        link: "shirt.html",
        rating: 4.5,
        reviews: 128,
        new: true
    },
    {
        id: 2,
        name: "Casual Shoes",
        price: 1499,
        image: "./images/shoe.jpg",
        category: "Footwear",
        description: "Simple, comfortable and versatile shoes for daily use.",
        link: "shoes.html",
        rating: 4.4,
        reviews: 96,
        new: false
    },
    {
        id: 3,
        name: "Classic Watch",
        price: 1999,
        image: "./images/watch.jpg",
        category: "Accessories",
        description: "Minimal design that fits perfectly with every occasion.",
        link: "watch.html",
        rating: 4.6,
        reviews: 74,
        new: false
    }
];

/* PRODUCT CARD */

function createProductCard(product) {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            ${
                product.new
                    ? '<span class="new-badge">NEW</span>'
                    : ""
            }
        </div>

        <span class="product-category">
            ${product.category}
        </span>

        <h3>
            ${product.name}
        </h3>

        <p>
            ${product.description}
        </p>

        <div class="product-rating">
            ⭐ ${product.rating}
            <span>
                (${product.reviews})
            </span>
        </div>

        <h4>
            ₹${product.price.toLocaleString("en-IN")}
        </h4>

        <a
            href="${product.link}"
            class="product-btn"
        >
            View Product →
        </a>
    `;

    return card;
}

/* PRODUCTS / SEARCH / CATEGORY / SORT */

const productContainer =
    document.getElementById("productContainer");

if (productContainer) {
    const searchBox =
        document.getElementById("productSearch");

    const sortBox =
        document.getElementById("sortProducts");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const noResults =
        document.getElementById("noResults");

    function updateProducts() {
        const searchText =
            searchBox
                ? searchBox.value.toLowerCase().trim()
                : "";

        const sortValue =
            sortBox
                ? sortBox.value
                : "default";

        const categoryValue =
            categoryFilter
                ? categoryFilter.value
                : "all";

        let matchingProducts = products.filter(function(product) {
            const productText =
                (
                    product.name +
                    " " +
                    product.description
                ).toLowerCase();

            const searchMatch =
                productText.includes(searchText);

            const categoryMatch =
                categoryValue === "all" ||
                product.category === categoryValue;

            return searchMatch && categoryMatch;
        });

        if (sortValue === "low") {
            matchingProducts.sort(function(a, b) {
                return a.price - b.price;
            });
        }

        if (sortValue === "high") {
            matchingProducts.sort(function(a, b) {
                return b.price - a.price;
            });
        }

        productContainer.innerHTML = "";

        matchingProducts.forEach(function(product) {
            productContainer.appendChild(
                createProductCard(product)
            );
        });

        if (noResults) {
            noResults.style.display =
                matchingProducts.length === 0
                    ? "block"
                    : "none";
        }
    }

    updateProducts();

    if (searchBox) {
        searchBox.addEventListener(
            "input",
            updateProducts
        );
    }

    if (sortBox) {
        sortBox.addEventListener(
            "change",
            updateProducts
        );
    }

    if (categoryFilter) {
        categoryFilter.addEventListener(
            "change",
            updateProducts
        );
    }
}

/* CURRENT PRODUCT */

const pageName =
    window.location.pathname
        .split("/")
        .pop();

const currentProduct =
    products.find(function(product) {
        return product.link === pageName;
    });

/* SIMILAR PRODUCTS */

const similarProducts =
    document.getElementById("similarProducts");

if (similarProducts && currentProduct) {
    const similar =
        products.filter(function(product) {
            return (
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
            );
        });

    if (similar.length === 0) {
        similarProducts.innerHTML =
            "<p>More similar products coming soon.</p>";
    } else {
        similar.forEach(function(product) {
            similarProducts.appendChild(
                createProductCard(product)
            );
        });
    }
}

/* RECOMMENDED PRODUCTS */

const recommendedProducts =
    document.getElementById("recommendedProducts");

if (recommendedProducts && currentProduct) {
    products
        .filter(function(product) {
            return product.id !== currentProduct.id;
        })
        .forEach(function(product) {
            recommendedProducts.appendChild(
                createProductCard(product)
            );
        });
}

/* RECENTLY VIEWED */

const recentlyViewed =
    document.getElementById("recentlyViewed");

if (recentlyViewed && currentProduct) {
    let viewed =
        JSON.parse(
            localStorage.getItem("recentlyViewed")
        ) || [];

    viewed =
        viewed.filter(function(id) {
            return id !== currentProduct.id;
        });

    viewed.unshift(currentProduct.id);

    viewed = viewed.slice(0, 3);

    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(viewed)
    );

    viewed.forEach(function(id) {
        const product =
            products.find(function(item) {
                return item.id === id;
            });

        if (product) {
            recentlyViewed.appendChild(
                createProductCard(product)
            );
        }
    });
}

if (
    recentlyViewed &&
    recentlyViewed.children.length === 0
) {
    recentlyViewed.innerHTML =
        "<p>No recently viewed products yet.</p>";
}

/* SCROLL TO TOP */

const topButton =
    document.getElementById("topButton");

if (topButton) {
    window.addEventListener(
        "scroll",
        function() {
            topButton.style.display =
                window.scrollY > 300
                    ? "block"
                    : "none";
        }
    );

    topButton.addEventListener(
        "click",
        function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}

/* MOBILE MENU */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener(
        "click",
        function() {
            navLinks.classList.toggle("active");

            menuBtn.textContent =
                navLinks.classList.contains("active")
                    ? "✕"
                    : "☰";
        }
    );

    navLinks
        .querySelectorAll("a")
        .forEach(function(link) {
            link.addEventListener(
                "click",
                function() {
                    navLinks.classList.remove("active");
                    menuBtn.textContent = "☰";
                }
            );
        });
}

/* HERO SLIDER */

const slides =
    document.querySelectorAll(".hero-slide");

const sliderDots =
    document.querySelectorAll(".slider-dot");

const sliderNext =
    document.getElementById("sliderNext");

const sliderPrev =
    document.getElementById("sliderPrev");

if (
    slides.length > 0 &&
    sliderDots.length > 0 &&
    sliderNext &&
    sliderPrev
) {
    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(function(slide) {
            slide.classList.remove("active");
        });

        sliderDots.forEach(function(dot) {
            dot.classList.remove("active");
        });

        slides[currentSlide].classList.add("active");

        if (sliderDots[currentSlide]) {
            sliderDots[currentSlide].classList.add("active");
        }
    }

    function startSlider() {
        clearInterval(sliderTimer);

        sliderTimer = setInterval(
            function() {
                showSlide(currentSlide + 1);
            },
            3000
        );
    }

    sliderNext.addEventListener(
        "click",
        function() {
            showSlide(currentSlide + 1);
            startSlider();
        }
    );

    sliderPrev.addEventListener(
        "click",
        function() {
            showSlide(currentSlide - 1);
            startSlider();
        }
    );

    sliderDots.forEach(function(dot) {
        dot.addEventListener(
            "click",
            function() {
                const number =
                    parseInt(
                        dot.dataset.slide,
                        10
                    );

                if (!Number.isNaN(number)) {
                    showSlide(number);
                    startSlider();
                }
            }
        );
    });

    showSlide(0);
    startSlider();
}

/* SIZE SELECTION */

const sizeButtons =
    document.querySelectorAll(
        ".size-options button"
    );

if (sizeButtons.length > 0) {
    sizeButtons.forEach(function(button) {
        button.addEventListener(
            "click",
            function() {
                sizeButtons.forEach(function(item) {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");
            }
        );
    });
}

/* QUANTITY */

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");

const quantity =
    document.getElementById("quantity");

if (minusBtn && plusBtn && quantity) {
    let quantityValue = 1;

    plusBtn.addEventListener(
        "click",
        function() {
            quantityValue++;

            quantity.textContent =
                quantityValue;
        }
    );

    minusBtn.addEventListener(
        "click",
        function() {
            if (quantityValue > 1) {
                quantityValue--;

                quantity.textContent =
                    quantityValue;
            }
        }
    );
}

/* BUY NOW POPUP */

const buyPopup = 
    document.getElementById("buyPopup");

document.addEventListener(
    "click",
    function(event) {
        const button = 
            event.target.closest("#buyNowBtn");

        if (!button) {
            return;
        }

        event.preventDefault();

        const currentPage = 
            window.location.pathname
                .split("/")
                .pop();

        const currentProduct = 
            products.find(function(product) {
                return product.link === currentPage;
            });

        const popupSize = 
            document.getElementById("popupSize");

        const popupQuantity = 
            document.getElementById("popupQuantity");

        const popupTotal = 
            document.getElementById("popupTotal");

        if (!buyPopup) {
            alert(
                "Buy Now popup is missing on this product page."
            );

            return;
        }

        const selectedSize = 
            document.querySelector(
                ".size-options button.selected"
            );

        const quantityElement = 
            document.getElementById("quantity");

        const size = 
            selectedSize 
                ? selectedSize.textContent.trim() 
                : "M";

        const quantityValue = 
            quantityElement 
                ? parseInt(
                    quantityElement.textContent,
                    10
                ) || 1
                : 1;

        const price = 
            currentProduct 
                ? currentProduct.price 
                : 999;

        const total = 
            price * quantityValue;

        if (popupSize) {
            popupSize.textContent = size;
        }

        if (popupQuantity) {
            popupQuantity.textContent = quantityValue;
        }

        if (popupTotal) {
            popupTotal.textContent =
                "₹" +
                total.toLocaleString("en-IN");
        }

        buyPopup.classList.add("active");
    }
);
/* CLOSE BUY POPUP */

document.addEventListener(
    "click",
    function(event) {
        const closeButton =
            event.target.closest("#closeBuyPopup");

        if (!closeButton) {
            return;
        }

        if (buyPopup) {
            buyPopup.classList.remove("active");
        }
    }
);

/* CLICK OUTSIDE BUY POPUP */

document.addEventListener(
    "click",
    function(event) {
        if (
            buyPopup &&
            event.target === buyPopup
        ) {
            buyPopup.classList.remove("active");
        }
    }
);

/* CART + CHECKOUT SYSTEM */

(function() {
    const CART_KEY = "shivanoCart";

    let cart =
        JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    function saveCart() {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );
    }

    function loadCart() {
        cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];
    }

    function getCartCount() {
        return cart.reduce(
            function(total, item) {
                return (
                    total +
                    Number(item.quantity)
                );
            },
            0
        );
    }

    function getCartTotal() {
        return cart.reduce(
            function(total, item) {
                return (
                    total +
                    Number(item.price) *
                    Number(item.quantity)
                );
            },
            0
        );
    }

    /* CART BUTTON */

    const cartButton =
        document.createElement("button");

    cartButton.id =
        "shivanoCartButton";

    cartButton.type =
        "button";

    cartButton.innerHTML = `
        🛒 Cart
        <span id="shivanoCartCount">
            0
        </span>
    `;

    document.body.appendChild(cartButton);

    /* CART STYLE */

    const cartStyle =
        document.createElement("style");

    cartStyle.textContent = `
        #shivanoCartButton {
            position: fixed;
            top: 85px;
            right: 25px;
            z-index: 1500;
            border: none;
            background: #111;
            color: white;
            padding: 12px 18px;
            border-radius: 30px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow:
                0 8px 25px
                rgba(0,0,0,0.18);
            transition: 0.3s;
        }

        #shivanoCartButton:hover {
            transform: translateY(-3px);
            background: #e53935;
        }

        #shivanoCartCount {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 22px;
            height: 22px;
            margin-left: 6px;
            padding: 0 5px;
            border-radius: 50%;
            background: #e53935;
            color: white;
            font-size: 12px;
        }

        .shivano-cart-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            padding: 20px;
        }

        .shivano-cart-overlay.active {
            display: flex;
        }

        .shivano-cart-box {
            width: 100%;
            max-width: 550px;
            max-height: 85vh;
            overflow-y: auto;
            background: white;
            border-radius: 20px;
            padding: 28px;
            box-shadow:
                0 25px 70px
                rgba(0,0,0,0.3);
        }

        .shivano-cart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .shivano-cart-header h2 {
            margin: 0;
        }

        .shivano-cart-close {
            border: none;
            background: #f1f1f1;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            font-size: 22px;
            cursor: pointer;
        }

        .shivano-cart-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }

        .shivano-cart-item img {
            width: 75px;
            height: 75px;
            object-fit: cover;
            border-radius: 10px;
        }

        .shivano-cart-info {
            flex: 1;
        }

        .shivano-cart-info h3 {
            margin: 0 0 5px;
            font-size: 17px;
        }

        .shivano-cart-info p {
            margin: 3px 0;
            color: #666;
            font-size: 14px;
        }

        .shivano-cart-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
        }

        .shivano-cart-controls button {
            width: 28px;
            height: 28px;
            border: none;
            border-radius: 6px;
            background: #eee;
            cursor: pointer;
            font-weight: bold;
        }

        .shivano-cart-remove {
            width: auto !important;
            background: transparent !important;
            color: #e53935;
        }

        .shivano-cart-total {
            display: flex;
            justify-content: space-between;
            margin-top: 22px;
            padding-top: 18px;
            border-top: 2px solid #eee;
            font-size: 20px;
            font-weight: 700;
        }

        .shivano-cart-empty {
            text-align: center;
            padding: 35px 10px;
            color: #666;
        }

        .shivano-cart-checkout {
            width: 100%;
            margin-top: 20px;
            padding: 14px;
            border: none;
            border-radius: 10px;
            background: #111;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }

        .shivano-cart-checkout:hover {
            background: #e53935;
        }

        .shivano-add-cart {
            display: inline-block;
            margin-top: 8px;
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            background: #111;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
        }

        .shivano-add-cart:hover {
            background: #e53935;
            transform: translateY(-2px);
        }

        #shivanoCheckoutOverlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(8px);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            z-index: 100000;
        }

        #shivanoCheckoutOverlay.active {
            display: flex;
        }

        #shivanoCheckoutModal {
            position: relative;
            width: 100%;
            max-width: 560px;
            max-height: 90vh;
            overflow-y: auto;
            background: white;
            border-radius: 22px;
            padding: 34px;
            box-shadow:
                0 30px 80px
                rgba(0,0,0,0.3);
        }

        #shivanoCheckoutClose {
            position: absolute;
            right: 18px;
            top: 15px;
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 50%;
            background: #f2f2f2;
            font-size: 25px;
            cursor: pointer;
        }

        .shivano-checkout-label {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #888;
            margin-bottom: 8px;
        }

        .shivano-checkout-header {
            margin-bottom: 28px;
        }

        .shivano-checkout-header h2 {
            margin: 0 0 8px;
            font-size: 30px;
        }

        .shivano-checkout-header p {
            margin: 0;
            color: #777;
        }

        #shivanoCheckoutModal h3 {
            margin: 0 0 20px;
        }

        .shivano-form-group {
            margin-bottom: 17px;
        }

        .shivano-form-group label {
            display: block;
            margin-bottom: 7px;
            font-size: 13px;
            font-weight: 600;
        }

        .shivano-form-group input,
        .shivano-form-group textarea {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 13px 14px;
            font-size: 14px;
            outline: none;
            font-family: inherit;
        }

        .shivano-form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }

        .shivano-checkout-error {
            min-height: 18px;
            margin: 5px 0 12px;
            color: #d62828;
            font-size: 13px;
            font-weight: 600;
        }

        .shivano-checkout-primary,
        .shivano-checkout-secondary {
            border: none;
            border-radius: 10px;
            padding: 14px 20px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
        }

        .shivano-checkout-primary {
            width: 100%;
            background: #111;
            color: white;
        }

        .shivano-checkout-primary:hover {
            background: #ff4d4d;
        }

        .shivano-checkout-secondary {
            background: #eee;
            color: #111;
        }

        #shivanoOrderItems {
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
        }

        .shivano-order-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 0;
            border-bottom: 1px solid #eee;
        }

        .shivano-order-item img {
            width: 58px;
            height: 58px;
            object-fit: cover;
            border-radius: 9px;
        }

        .shivano-order-item-info {
            flex: 1;
        }

        .shivano-order-item-info strong {
            display: block;
        }

        .shivano-order-item-info span {
            color: #777;
            font-size: 13px;
        }

        .shivano-order-item-price {
            font-weight: 700;
        }

        .shivano-order-total {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            padding: 15px 0 20px;
        }

        .shivano-delivery-info {
            padding: 15px;
            background: #f7f7f7;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .shivano-delivery-info p {
            margin: 7px 0 0;
            color: #666;
            line-height: 1.6;
            white-space: pre-line;
        }

        .shivano-summary-actions {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 12px;
        }

        #shivanoSuccessSection {
            text-align: center;
        }

        .shivano-success-icon {
            width: 75px;
            height: 75px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 5px auto 20px;
            border-radius: 50%;
            background: #111;
            color: white;
            font-size: 38px;
            font-weight: bold;
        }

        .shivano-success-message {
            margin: 20px 0;
            padding: 15px;
            background: #f6f6f6;
            border-radius: 12px;
            color: #666;
            line-height: 1.6;
            font-size: 13px;
        }

        .shivano-order-number {
            margin-top: 15px;
            color: #777;
        }

        @media (max-width: 600px) {
            #shivanoCartButton {
                top: 75px;
                right: 12px;
                padding: 10px 14px;
                font-size: 13px;
            }

            .shivano-cart-box {
                padding: 20px;
            }

            .shivano-cart-item img {
                width: 60px;
                height: 60px;
            }

            #shivanoCheckoutModal {
                padding: 25px 20px;
            }

            .shivano-form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .shivano-summary-actions {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(cartStyle);

    /* CART POPUP HTML */

    const cartOverlay =
        document.createElement("div");

    cartOverlay.className =
        "shivano-cart-overlay";

    cartOverlay.id =
        "shivanoCartOverlay";

    cartOverlay.innerHTML = `
        <div class="shivano-cart-box">
            <div class="shivano-cart-header">
                <h2>
                    Your Cart
                </h2>

                <button
                    class="shivano-cart-close"
                    id="shivanoCartClose"
                    type="button"
                >
                    ×
                </button>
            </div>

            <div id="shivanoCartItems"></div>

            <div
                class="shivano-cart-total"
                id="shivanoCartTotal"
            ></div>

            <button
                class="shivano-cart-checkout"
                id="shivanoCartCheckout"
                type="button"
            >
                Continue to Buy
            </button>
        </div>
    `;

    document.body.appendChild(cartOverlay);

    /* CHECKOUT HTML */

    const checkoutOverlay =
        document.createElement("div");

    checkoutOverlay.id =
        "shivanoCheckoutOverlay";

    checkoutOverlay.innerHTML = `
        <div id="shivanoCheckoutModal">
            <button
                id="shivanoCheckoutClose"
                type="button"
            >
                ×
            </button>

            <div class="shivano-checkout-header">
                <span class="shivano-checkout-label">
                    SHIVANO CHECKOUT
                </span>

                <h2>
                    Complete Your Order
                </h2>

                <p>
                    Enter your details to place the order.
                </p>
            </div>

            <div id="shivanoCustomerSection">
                <h3>
                    Customer Details
                </h3>

                <div class="shivano-form-group">
                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="shivanoName"
                        placeholder="Enter your full name"
                    >
                </div>

                <div class="shivano-form-group">
                    <label>
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        id="shivanoMobile"
                        placeholder="10-digit mobile number"
                        maxlength="10"
                    >
                </div>

                <div class="shivano-form-group">
                    <label>
                        Address
                    </label>

                    <textarea
                        id="shivanoAddress"
                        placeholder="House no., street, area"
                        rows="3"
                    ></textarea>
                </div>

                <div class="shivano-form-row">
                    <div class="shivano-form-group">
                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            id="shivanoCity"
                            placeholder="City"
                        >
                    </div>

                    <div class="shivano-form-group">
                        <label>
                            PIN Code
                        </label>

                        <input
                            type="tel"
                            id="shivanoPin"
                            placeholder="PIN"
                            maxlength="6"
                        >
                    </div>
                </div>

                <p
                    id="shivanoCheckoutError"
                    class="shivano-checkout-error"
                ></p>

                <button
                    type="button"
                    id="shivanoReviewOrder"
                    class="shivano-checkout-primary"
                >
                    Review Order →
                </button>
            </div>

            <div
                id="shivanoSummarySection"
                style="display:none;"
            >
                <h3>
                    Order Summary
                </h3>

                <div id="shivanoOrderItems"></div>

                <div class="shivano-order-total">
                    <span>
                        Total
                    </span>

                    <strong id="shivanoOrderTotal">
                        ₹0
                    </strong>
                </div>

                <div class="shivano-delivery-info">
                    <strong>
                        📦 Delivery Address
                    </strong>

                    <p
                        id="shivanoDeliveryAddress"
                    ></p>
                </div>

                <div class="shivano-summary-actions">
                    <button
                        type="button"
                        id="shivanoBackToDetails"
                        class="shivano-checkout-secondary"
                    >
                        ← Edit Details
                    </button>

                    <button
                        type="button"
                        id="shivanoPlaceOrder"
                        class="shivano-checkout-primary"
                    >
                        Place Order ✓
                    </button>
                </div>
            </div>

            <div
                id="shivanoSuccessSection"
                style="display:none;"
            >
                <div class="shivano-success-icon">
                    ✓
                </div>

                <span class="shivano-checkout-label">
                    ORDER SUCCESSFUL
                </span>

                <h2>
                    Order Confirmed!
                </h2>

                <p>
                    Thank you for shopping with Shivano.
                </p>

                <div class="shivano-order-number">
                    Order ID:

                    <strong id="shivanoOrderId">
                        SHV000000
                    </strong>
                </div>

                <div class="shivano-success-message">
                    Your order has been placed successfully.
                    We will use your provided details for delivery.
                </div>

                <button
                    type="button"
                    id="shivanoFinishOrder"
                    class="shivano-checkout-primary"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(checkoutOverlay);

    /* CART RENDER */

    function updateCartCount() {
        const count =
            document.getElementById(
                "shivanoCartCount"
            );

        if (count) {
            count.textContent =
                getCartCount();
        }
    }

    function renderCart() {
        loadCart();

        const cartItems =
            document.getElementById(
                "shivanoCartItems"
            );

        const cartTotal =
            document.getElementById(
                "shivanoCartTotal"
            );

        if (!cartItems || !cartTotal) {
            return;
        }

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="shivano-cart-empty">
                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add some products to get started.
                    </p>
                </div>
            `;

            cartTotal.innerHTML = `
                <span>
                    Total
                </span>

                <span>
                    ₹0
                </span>
            `;

            return;
        }

        cartItems.innerHTML = "";

        cart.forEach(function(item) {
            const itemElement =
                document.createElement("div");

            itemElement.className =
                "shivano-cart-item";

            itemElement.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="shivano-cart-info">
                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${Number(item.price)
                            .toLocaleString("en-IN")}
                    </p>

                    <div class="shivano-cart-controls">
                        <button
                            type="button"
                            data-action="minus"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            type="button"
                            data-action="plus"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            class="shivano-cart-remove"
                            data-action="remove"
                            data-id="${item.id}"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            `;

            cartItems.appendChild(itemElement);
        });

        cartTotal.innerHTML = `
            <span>
                Total
            </span>

            <span>
                ₹${getCartTotal()
                    .toLocaleString("en-IN")}
            </span>
        `;
    }

    /* ADD TO CART */

    function addToCart(
        product,
        quantityToAdd
    ) {
        loadCart();

        const amount =
            Number(quantityToAdd) > 0
                ? Number(quantityToAdd)
                : 1;

        const existing =
            cart.find(function(item) {
                return item.id === product.id;
            });

        if (existing) {
            existing.quantity += amount;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: amount
            });
        }

        saveCart();
        updateCartCount();
        renderCart();

        cartOverlay.classList.add("active");
    }

    /* ADD CART BUTTONS TO PRODUCT CARDS */

    function addCartButtonsToCards() {
        document
            .querySelectorAll(".product-card")
            .forEach(function(card) {
                if (
                    card.querySelector(
                        ".shivano-add-cart"
                    )
                ) {
                    return;
                }

                const nameElement =
                    card.querySelector("h3");

                if (!nameElement) {
                    return;
                }

                const product =
                    products.find(function(item) {
                        return (
                            item.name ===
                            nameElement.textContent.trim()
                        );
                    });

                if (!product) {
                    return;
                }

                const button =
                    document.createElement("button");

                button.type = "button";
                button.className =
                    "shivano-add-cart";

                button.textContent =
                    "🛒 Add to Cart";

                button.addEventListener(
                    "click",
                    function() {
                        addToCart(product, 1);
                    }
                );

                const productButton =
                    card.querySelector(
                        ".product-btn"
                    );

                if (productButton) {
                    productButton.after(button);
                } else {
                    card.appendChild(button);
                }
            });
    }

    /* DETAIL PAGE ADD TO CART */

    function addDetailCartButton() {
        const buyNow =
            document.getElementById(
                "buyNowBtn"
            );

        if (
            !buyNow ||
            document.getElementById(
                "detailAddCartBtn"
            )
        ) {
            return;
        }

        const product =
            products.find(function(item) {
                return item.link === pageName;
            });

        if (!product) {
            return;
        }

        const button =
            document.createElement("button");

        button.type = "button";
        button.id = "detailAddCartBtn";
        button.className =
            "shivano-add-cart";

        button.textContent =
            "🛒 Add to Cart";

        button.addEventListener(
            "click",
            function() {
                const quantityElement =
                    document.getElementById(
                        "quantity"
                    );

                const amount =
                    quantityElement
                        ? parseInt(
                            quantityElement.textContent,
                            10
                        ) || 1
                        : 1;

                addToCart(product, amount);
            }
        );

        buyNow.before(button);
    }

    /* CART OPEN */

    cartButton.addEventListener(
        "click",
        function() {
            renderCart();
            cartOverlay.classList.add("active");
        }
    );

    /* CART CLOSE */

    document
        .getElementById("shivanoCartClose")
        .addEventListener(
            "click",
            function() {
                cartOverlay.classList.remove(
                    "active"
                );
            }
        );

    cartOverlay.addEventListener(
        "click",
        function(event) {
            if (event.target === cartOverlay) {
                cartOverlay.classList.remove(
                    "active"
                );
            }
        }
    );

    /* CART ITEM + / - / REMOVE */

    cartOverlay.addEventListener(
        "click",
        function(event) {
            const button =
                event.target.closest(
                    "[data-action]"
                );

            if (!button) {
                return;
            }

            loadCart();

            const id =
                parseInt(
                    button.dataset.id,
                    10
                );

            const action =
                button.dataset.action;

            const item =
                cart.find(function(product) {
                    return product.id === id;
                });

            if (!item) {
                return;
            }

            if (action === "plus") {
                item.quantity++;
            }

            if (action === "minus") {
                item.quantity--;

                if (item.quantity <= 0) {
                    cart =
                        cart.filter(
                            function(product) {
                                return product.id !== id;
                            }
                        );
                }
            }

            if (action === "remove") {
                cart =
                    cart.filter(
                        function(product) {
                            return product.id !== id;
                        }
                    );
            }

            saveCart();
            updateCartCount();
            renderCart();
        }
    );

    /* CHECKOUT ELEMENTS */

    const checkoutButton =
        document.getElementById(
            "shivanoCartCheckout"
        );

    const checkoutClose =
        document.getElementById(
            "shivanoCheckoutClose"
        );

    const customerSection =
        document.getElementById(
            "shivanoCustomerSection"
        );

    const summarySection =
        document.getElementById(
            "shivanoSummarySection"
        );

    const successSection =
        document.getElementById(
            "shivanoSuccessSection"
        );

    const errorBox =
        document.getElementById(
            "shivanoCheckoutError"
        );

    /* OPEN CHECKOUT */

    function openCheckout() {
        loadCart();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        customerSection.style.display =
            "block";

        summarySection.style.display =
            "none";

        successSection.style.display =
            "none";

        errorBox.textContent = "";

        checkoutOverlay.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";
    }
    /* BUY NOW → CHECKOUT */

const confirmBuyBtn = document.getElementById("confirmBuyBtn");

if (confirmBuyBtn) {
    confirmBuyBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const product = products.find(function(item) {
            return item.link === pageName;
        });

        if (!product) {
            return;
        }

        const quantityElement =
            document.getElementById("quantity");

        const amount = quantityElement
            ? parseInt(quantityElement.textContent, 10) || 1
            : 1;

        loadCart();

        const existing = cart.find(function(item) {
            return item.id === product.id;
        });

        if (existing) {
            existing.quantity += amount;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: amount
            });
        }

        saveCart();
        updateCartCount();
        renderCart();

        if (buyPopup) {
            buyPopup.classList.remove("active");
        }

        cartOverlay.classList.remove("active");

        openCheckout();
    });
}

    /* CLOSE CHECKOUT */

    function closeCheckout() {
        checkoutOverlay.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";
    }

    checkoutButton.addEventListener(
        "click",
        function() {
            openCheckout();
        }
    );

    checkoutClose.addEventListener(
        "click",
        function() {
            closeCheckout();
        }
    );

    checkoutOverlay.addEventListener(
        "click",
        function(event) {
            if (
                event.target ===
                checkoutOverlay
            ) {
                closeCheckout();
            }
        }
    );

    /* REVIEW ORDER */

    document
        .getElementById(
            "shivanoReviewOrder"
        )
        .addEventListener(
            "click",
            function() {
                const name =
                    document
                        .getElementById(
                            "shivanoName"
                        )
                        .value.trim();

                const mobile =
                    document
                        .getElementById(
                            "shivanoMobile"
                        )
                        .value.trim();

                const address =
                    document
                        .getElementById(
                            "shivanoAddress"
                        )
                        .value.trim();

                const city =
                    document
                        .getElementById(
                            "shivanoCity"
                        )
                        .value.trim();

                const pin =
                    document
                        .getElementById(
                            "shivanoPin"
                        )
                        .value.trim();

                if (!name) {
                    errorBox.textContent =
                        "Please enter your full name.";
                    return;
                }

                if (
                    !/^[0-9]{10}$/.test(
                        mobile
                    )
                ) {
                    errorBox.textContent =
                        "Please enter a valid 10-digit mobile number.";
                    return;
                }

                if (!address) {
                    errorBox.textContent =
                        "Please enter your delivery address.";
                    return;
                }

                if (!city) {
                    errorBox.textContent =
                        "Please enter your city.";
                    return;
                }

                if (
                    !/^[0-9]{6}$/.test(
                        pin
                    )
                ) {
                    errorBox.textContent =
                        "Please enter a valid 6-digit PIN code.";
                    return;
                }

                loadCart();

                if (cart.length === 0) {
                    errorBox.textContent =
                        "Your cart is empty.";
                    return;
                }

                errorBox.textContent = "";

                const itemsContainer =
                    document.getElementById(
                        "shivanoOrderItems"
                    );

                itemsContainer.innerHTML = "";

                cart.forEach(function(item) {
                    const itemTotal =
                        Number(item.price) *
                        Number(item.quantity);

                    itemsContainer.insertAdjacentHTML(
                        "beforeend",
                        `
                            <div class="shivano-order-item">
                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                >

                                <div class="shivano-order-item-info">
                                    <strong>
                                        ${item.name}
                                    </strong>

                                    <span>
                                        Qty:
                                        ${item.quantity}
                                    </span>
                                </div>

                                <div class="shivano-order-item-price">
                                    ₹${itemTotal.toLocaleString("en-IN")}
                                </div>
                            </div>
                        `
                    );
                });

                document.getElementById(
                    "shivanoOrderTotal"
                ).textContent =
                    "₹" +
                    getCartTotal().toLocaleString(
                        "en-IN"
                    );

                document.getElementById(
                    "shivanoDeliveryAddress"
                ).textContent =
                    name +
                    " • " +
                    mobile +
                    "\n" +
                    address +
                    ", " +
                    city +
                    " - " +
                    pin;

                customerSection.style.display =
                    "none";

                summarySection.style.display =
                    "block";
            }
        );

    /* EDIT DETAILS */

    document
        .getElementById(
            "shivanoBackToDetails"
        )
        .addEventListener(
            "click",
            function() {
                summarySection.style.display =
                    "none";

                customerSection.style.display =
                    "block";
            }
        );

    /* PLACE ORDER */

    document
        .getElementById(
            "shivanoPlaceOrder"
        )
        .addEventListener(
            "click",
            function() {
                loadCart();

                if (cart.length === 0) {
                    return;
                }

                const orderId =
                    "SHV" +
                    Date.now()
                        .toString()
                        .slice(-7);

                document.getElementById(
                    "shivanoOrderId"
                ).textContent =
                    orderId;

                const orderData = {
                    orderId: orderId,

                    customer: {
                        name:
                            document
                                .getElementById(
                                    "shivanoName"
                                )
                                .value
                                .trim(),

                        mobile:
                            document
                                .getElementById(
                                    "shivanoMobile"
                                )
                                .value
                                .trim(),

                        address:
                            document
                                .getElementById(
                                    "shivanoAddress"
                                )
                                .value
                                .trim(),

                        city:
                            document
                                .getElementById(
                                    "shivanoCity"
                                )
                                .value
                                .trim(),

                        pin:
                            document
                                .getElementById(
                                    "shivanoPin"
                                )
                                .value
                                .trim()
                    },

                    items: cart,

                    total:
                        getCartTotal(),

                    date:
                        new Date().toISOString()
                };

                localStorage.setItem(
                    "shivanoLastOrder",
                    JSON.stringify(orderData)
                );

                cart = [];

                localStorage.removeItem(
                    CART_KEY
                );

                updateCartCount();
                renderCart();

                summarySection.style.display =
                    "none";

                successSection.style.display =
                    "block";
            }
        );

    /* FINISH ORDER */

    document
        .getElementById(
            "shivanoFinishOrder"
        )
        .addEventListener(
            "click",
            function() {
                closeCheckout();
                window.location.reload();
            }
        );

    /* INITIAL LOAD */

    updateCartCount();
    renderCart();
    addCartButtonsToCards();
    addDetailCartButton();

    /* WATCH FOR NEW PRODUCT CARDS */

   const observerTarget =
    document.getElementById(
        "productContainer"
    );
    if (observerTarget) {
        const observer =
            new MutationObserver(
                function() {
                    addCartButtonsToCards();
                }
            );

        observer.observe(
            observerTarget,
            {
                childList: true,
                subtree: true
            }
        );
    }
})();