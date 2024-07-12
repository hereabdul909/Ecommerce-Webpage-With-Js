const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");
cartIcon.addEventListener("click", () => {
    cart.classList.add("active")
})
closeCart.addEventListener("click", () => {
    cart.classList.remove("active")
})
// ----------------------------------------------------------- //

if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

function start() {
    addEvents();
}
function update() {
    addEvents();
    updateTotal();
}
function addEvents() {
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    cartRemove_btns.forEach(btn => btn.addEventListener("click", Handle_removeCartItem));
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => { input.addEventListener("change", Handle_changeItemQuantity) });
    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach(btn => { btn.addEventListener('click', Handle_cartItems) })
    const buy_btn =  document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', handleBuy_btn )
}
function Handle_removeCartItem() {
    this.parentElement.remove();
    update();
}
function Handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}
function Handle_cartItems() {
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;
    let NewToAdd = {
        title,
        price,
        imgSrc
    };

    if (itemsAdded.find((ele) => ele.title == NewToAdd.title)) {
        alert('This Item Is already Exist!');
        return;
    } else {
        itemsAdded.push(NewToAdd)
    }

    let cartBoxElement = cartBoxComponent(title, price, imgSrc)
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode)
    update();
}
let itemsAdded = []
function handleBuy_btn(){
    if(itemsAdded.length <= 0){
        alert("There is no Order to place Yet ! \n Make and Order First")
        return
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML="";
    alert('Your Order Is Placed Successfully :)');
    itemsAdded = []
    update();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    }))
    total = total.toFixed(2);
    totalElement.innerHTML = '$' + total
}
function cartBoxComponent(title, price, imgSrc) {
    return ` <div class="cart-box">
<img src=${imgSrc} class="cart-img" alt="">
<div class="detail-box">
    <div class="cart-product-title">
        ${title}
    </div>
    <div class="cart-price">
        ${price}
    </div>
    <input type="number" value="1" class="cart-quantity">
</div>
<i class="bx bx-trash-alt cart-remove"></i>
</div>`
}
