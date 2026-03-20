// LOAD CART
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("cartItems");
    const empty = document.getElementById("emptyCart");
    const count = document.getElementById("cartCount");

    container.innerHTML = "";
    count.innerText = cart.length;

    if (cart.length === 0) {
        empty.style.display = "block";
        document.getElementById("subtotal").innerText = "$0.00";
        document.getElementById("total").innerText = "$0.00";
        return;
    } else {
        empty.style.display = "none";
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;

        container.innerHTML += `
        <div class="cart-item">

            <div class="cart-left-section">
                <img src="${item.image}" class="product-img">

                <div class="cart-details">
                    <h4>${item.name}</h4>

                    <p class="meta">
                        Size: medium, Color: blue, Material: Plastic <br>
                        Seller: Artel Market
                    </p>

                    <div class="cart-actions">
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                        <button class="save-btn">Save for later</button>
                    </div>
                </div>
            </div>

            <div class="cart-right-section">
                <h3>$${item.price.toFixed(2)}</h3>

                <select onchange="changeQty(${index}, this.value)">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => `
                        <option value="${q}" ${item.qty == q ? "selected" : ""}>
                            Qty: ${q}
                        </option>
                    `).join("")}
                </select>
            </div>

        </div>
        `;
    });

    // CALCULATIONS
    let discount = 60;
    let tax = 14;

    document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("total").innerText =
        "$" + (subtotal - discount + tax).toFixed(2);
}


// REMOVE SINGLE ITEM
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


// CLEAR ENTIRE CART
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}


// CHANGE QUANTITY
function changeQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty = parseInt(qty);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


// MOVE TO CART (FROM SAVED ITEMS)
function moveToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Make each product unique using name + image
    let existing = cart.find(item =>
        item.name === name && item.image === image
    );

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


// INITIAL LOAD
loadCart();

function goBack() {
    window.location.href = "main.html";
}