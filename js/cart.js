
function getProductsFromCart() {

    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }


    let section = document.getElementsByClassName("sectionCart")[0]
    section.innerHTML = ""

    for (let i = 0; i < cart.length; i++) {
        const itemContainer = createCartContainer(cart[i]);

        section.appendChild(itemContainer)
        
    }

    completePurchase(cart)

}

function createCartContainer(cartItem) {
    
    let itemContainer = document.createElement("div")
    itemContainer.classList.add("itemContainer")

    let cartImgContainer = document.createElement("div")
    cartImgContainer.classList.add("cartImgContainer")

    let itemImg = document.createElement("img")
    itemImg.classList.add("itemImg")
    itemImg.src = "../assets/" + cartItem.product.image

    cartImgContainer.append(itemImg)

    let itemTitleContainer = document.createElement("div")
    itemTitleContainer.classList.add("itemTitleContainer")

    let itemTitle = document.createElement("h1")
    itemTitle.classList.add("itemTitle")
    itemTitle.innerText = cartItem.product.title

    
    itemTitleContainer.append(itemTitle)
    
    let quantityBox = document.createElement("div")
    quantityBox.classList.add("quantityBox")

    let addQty = document.createElement("div")
    addQty.classList.add("addQty")
    addQty.innerText = "+"
    addQty.addEventListener("click", () =>{
        addProductQty(cartItem)
        getNrOfCartItems()
    })    

    let quantityOfProduct = document.createElement("h3")
    quantityOfProduct.classList.add("quantityOfProduct")
    quantityOfProduct.innerText = cartItem.quantity + " " + "pcs."

    let deleteQty = document.createElement("div")
    deleteQty.classList.add("deleteQty")
    deleteQty.innerText = "-"
    deleteQty.addEventListener("click", () => {
        deleteProductQty(cartItem)
        getNrOfCartItems()
    })

    
    let removeItemButtonContainer = document.createElement("div")
    removeItemButtonContainer.classList.add("removeItemButtonContainer")
    removeItemButtonContainer.addEventListener("click", () => {
        getNrOfCartItems()
        removeItemFromCart(cartItem)
        location.reload();
    })
    
    let icon = document.createElement("i")
    icon.className = "far fa-trash-alt"
    icon.classList.add("trashcanCart")
    
    removeItemButtonContainer.append(icon)
    
    quantityBox.append(addQty, quantityOfProduct, deleteQty, removeItemButtonContainer)


    let itemPriceContainer = document.createElement("div")
    itemPriceContainer.classList.add("itemPriceContainer")

    let itemPrice = document.createElement("h2")
    itemPrice.classList.add("itemPrice")
    itemPrice.innerText = cartItem.product.price + " kr"

    itemPriceContainer.append(itemPrice)
    
    itemContainer.append(cartImgContainer, itemTitleContainer, quantityBox, itemPriceContainer)

    return itemContainer
}

function addProductQty(cartItem) {

    let cart = JSON.parse(localStorage.getItem("cart"))

    for (let i = 0; i < cart.length; i++) {
        if (cartItem.product.title == cart[i].product.title) {
            cart[i].quantity++
        } 
        
    }

    cart = JSON.stringify(cart); 

    localStorage.setItem("cart", cart);

    getProductsFromCart()

}

function deleteProductQty(cartItem) {
    let cart = JSON.parse(localStorage.getItem("cart"))

    for (let i = 0; i < cart.length; i++) {
        if (cartItem.product.title == cart[i].product.title) {
            
           if(cart[i].quantity == 1) {
               cart.splice(i, 1); 

           } else {
            cart[i].quantity--
            } 
        }
    }

    cart = JSON.stringify(cart); 

    localStorage.setItem("cart", cart);

    getProductsFromCart()



}



function removeItemFromCart(cartItem) {
    let cart = JSON.parse(localStorage.getItem("cart"))

    for (let i = 0; i < cart.length; i++) {
        if (cartItem.product.title == cart[i].product.title) {
            cart.splice(i, 1); 
        }
        
    }

    cart = JSON.stringify(cart); 

    localStorage.setItem("cart", cart);

    getProductsFromCart()

}

function completePurchase(cart) {

    let totalPrice = 0
    
    cart.forEach((cartItem) => {
        totalPrice += cartItem.product.price * cartItem.quantity
    })

    let checkOutSection = document.getElementsByClassName("sectionPrice")[0]
    checkOutSection.innerHTML = ""

    let totalPriceContainer = document.createElement("div")
    totalPriceContainer.classList.add("totalPriceContainer")
    totalPriceContainer.innerText = "Total price: " + " " + totalPrice + " " + "kr"


    checkoutButton = document.createElement("div")
    checkoutButton.classList.add("endOfSaleButtonContainer")

    let checkIcon = document.createElement("i")
    checkIcon.className = "fas fa-check"
    checkIcon.classList.add("checkLogo")

    let endOfSaleButton = document.createElement("div")
    endOfSaleButton.classList.add("endOfSaleButton")
    endOfSaleButton.innerText = "Submit"
    endOfSaleButton.addEventListener("click", () => {
        alert("Thank you for your purchase")
        localStorage.removeItem("cart")
        window.location = "../index.html"
    })


    
    checkoutButton.append(checkIcon, endOfSaleButton)


    checkOutSection.append(totalPriceContainer, checkoutButton)


}






function getNrOfCartItems() {

    let savedProducts = document.getElementsByTagName("span")[0]

    let cart = localStorage.getItem("cart")

    let amount = 0

    if(!cart) {
        savedProducts.innerText = amount
        return

    }

    cart = JSON.parse(cart)
    cart.forEach(cartItem => {
        amount += cartItem.quantity
    });


    savedProducts.innerText = amount

}


window.addEventListener("load", () => {
    getNrOfCartItems()
    getProductsFromCart()
})