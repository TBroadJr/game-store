import { consoleArray } from "./data/menu.js";

const menuContainer = document.getElementById("menu-container");
let cart = []

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    handleMenuItemSelected(Number(e.target.dataset.id));
  }
  if (e.target.dataset.remove) {
    removeCartItem(e.target.dataset.remove)
  }

  if (e.target.id === "complete-order") {
    document.getElementById("checkout").classList.toggle("hidden")
  }

  if (e.target.dataset.rate) {
    document.getElementById("rate").classList.toggle("hidden")
    document.getElementById("thanks-text").classList.toggle("hidden")
  }
})

document.addEventListener("submit", (e) => {
  e.preventDefault()
  document.getElementById("form").reset()
  document.getElementById("rate").classList.toggle("hidden")
  document.getElementById("cart").classList.toggle("hidden")
  document.getElementById("checkout").classList.toggle("hidden")
  reset()
})

function reset() {
  cart = []
}

function removeCartItem(item) {
  cart.splice(item, 1)
  refreshCart();
}

function handleMenuItemSelected(item) {
  if(cart.length === 0) {
    document.getElementById("thanks-text").classList.add("hidden")
  }
  cart.push(consoleArray[item])
  refreshCart();
}

function refreshCart() {
  if (cart.length > 0) {
    document.getElementById("cart").classList.remove("hidden")
    let price = 0
    cart.forEach(item => price += item.price)
    document.getElementById("price-text").innerHTML =
      cart.length > 1 ? `( Discount: 50% off! ) $${price / 2}` : `$${price}`
  } else {
    document.getElementById("cart").classList.add("hidden")
  }
  document.getElementById("cart-order").innerHTML = cart.map((cartItem, index) => {
    return `
      <div class="cart-item">
        <p class="cart-item-name">${cartItem.name}</p>
        <button class="cart-remove-btn" data-remove="${index}">remove</button>
        <p class="cart-item-price">$${cartItem.price}</p>
      </div>
    `
  }).join("")
}

function render() {
  menuContainer.innerHTML = consoleArray.map((menuItem) => {
    const {name, games, id, price, emoji} = menuItem;
    const gamesString = games.join(", ");
    return `
      <div class="menu-item-container">
        <p class="menu-emoji">${emoji}</p>
        <div class="menu-text-container">
          <p class="menu-name">${name}</p>
          <p class="menu-ingredients">${gamesString}</p>
          <p class="menu-price">$${price}</p>
        </div>
        <button class="add-btn">
          <img class="add-img" src="./assets/add-btn.png" data-id="${id}">
      </div>
    `
  }).join("");
}

render();

