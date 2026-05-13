import { products } from "./items.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const field = document.querySelector(".list");

for(let i=0; i<products.length; i++)
{
    field.innerHTML += 
    `
        <div class="card">
        
            <img src="${products[i].image}" 
            alt="${products[i].name}" 
            class="for_img">
        
            <div class="details">

                <h3>${products[i].name}</h3>

                <h4 style="color:red">
                    Price : ${products[i].price} rupees
                </h4>

                <p>
                    Quantity : ${products[i].quantity}
                </p>

                <button class="btn" data-id="${i}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Add to cart
                </button>

            </div>

        </div>
    `;
}

const cartField = document.querySelector(".cart_items");

const buttons = document.querySelectorAll(".btn");

const emptyCart = document.querySelector(".empty_cart");

const checkoutBtn = document.querySelector(".checkout_btn");

localStorage.setItem("cart", JSON.stringify(cart));

function displayCart()
{
    localStorage.setItem("cart", JSON.stringify(cart));

    if(cart.length === 0)
    {
        emptyCart.style.display = "flex";
        cartField.style.display = "none";
        checkoutBtn.style.display = "none";
        return;
    }

    emptyCart.style.display = "none";
    cartField.style.display = "flex";
    checkoutBtn.style.display = "block";

    cartField.innerHTML = "";

    let cart_value = 0;

    for(let j=0; j<cart.length; j++)
    {
        cart_value += cart[j].price;

        cartField.innerHTML +=
        `
            <div class="cart_card">

                <h3 class="name">
                    ${cart[j].name}
                </h3>

                <p class="item_price">
                    ${cart[j].price}
                </p>

                <button class="cross" data-id="${j}">
                    X
                </button>

            </div>
        `;
    }

    cartField.innerHTML +=
    `
        <h2 class="total">
            Total : ${cart_value}
        </h2>
    `;

    const removeBtns = document.querySelectorAll(".cross");

    for(let k=0; k<removeBtns.length; k++)
    {
        removeBtns[k].addEventListener("click", function(){

            let idx = removeBtns[k].dataset.id;

            cart.splice(idx,1);

            displayCart();
        });
    }
}

displayCart();

for(let i=0; i<buttons.length; i++)
{
    buttons[i].addEventListener("click", function(){

        let index = buttons[i].dataset.id;

        cart.push(products[index]);

        displayCart();
    });
}