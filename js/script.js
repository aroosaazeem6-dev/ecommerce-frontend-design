// ===============================
// DROPDOWN
// ===============================
function toggleDropdown(id) {
    const menu = document.getElementById(id);

    if (!menu) return;

    menu.style.display =
        menu.style.display === "block" ? "none" : "block";
}


// ===============================
// GRID / LIST BUTTON (SAFE)
// ===============================
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}


// ===============================
// FILTER TOGGLE
// ===============================
function toggleFilter(header) {
    const box = header.parentElement;

    box.classList.toggle("collapsed");
    box.classList.toggle("active");
}


// ===============================
// REMOVE BUTTON
// ===============================
document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", function () {
        this.parentElement.remove();
    });
});


// ===============================
// OPEN PRODUCT (MAIN PAGE)
// ===============================
function openProduct(name, price, image) {

    const product = {
        name: name,
        price: price,
        image: image
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));

    window.location.href = "products-details.html";
}


// ===============================
// LOAD PRODUCT (DETAIL PAGE)
// ===============================
function loadProduct() {

    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) return;

    // NAME
    const nameEl = document.getElementById("productName");
    if (nameEl) nameEl.innerText = product.name;

    // PRICE
    const priceEl = document.getElementById("productPrice");
    if (priceEl) priceEl.innerText = product.price;

    // IMAGE
    const mainImg = document.getElementById("productImage");
    if (mainImg) mainImg.src = product.image;

    // THUMBNAILS
    const thumbs = document.querySelectorAll(".thumb");

    thumbs.forEach(t => {
        t.src = product.image;

        t.addEventListener("click", () => {
            mainImg.src = t.src;
        });
    });
}


// ===============================
// ADD TO CART
// ===============================
function addToCart() {

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item =>
        item.name === product.name && item.image === product.image
    );

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: product.name,
            price: Number(product.price),
            image: product.image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}


// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    // LOAD PRODUCT PAGE
    if (document.getElementById("productImage")) {
        loadProduct();
    }

    // ADD TO CART BUTTON
    const btn = document.querySelector(".add-cart");
    if (btn) {
        btn.addEventListener("click", addToCart);
    }

});
function goToProducts() {
    window.location.href = "products-grid.html";
}



// ===============================
// CHANGE PRODUCT (SAME PAGE)
// ===============================
function changeProduct(name, price, image) {

    // UPDATE NAME
    const nameEl = document.getElementById("productName");
    if (nameEl) nameEl.innerText = name;

    // UPDATE PRICE
    const priceEl = document.getElementById("productPrice");
    if (priceEl) priceEl.innerText = price;

    // UPDATE MAIN IMAGE
    const mainImg = document.getElementById("productImage");
    if (mainImg) mainImg.src = image;

    // UPDATE THUMBNAILS
    const thumbs = document.querySelectorAll(".thumb");

    thumbs.forEach(t => {
        t.src = image;

        t.onclick = () => {
            mainImg.src = t.src;
        };
    });

    // ALSO UPDATE LOCAL STORAGE (optional but smart)
    const product = { name, price, image };
    localStorage.setItem("selectedProduct", JSON.stringify(product));
}