var listOfProducts; 

function loadProducts() {
    fetch("../products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductToWebPage(); 
    });
}

function initSite() {
    loadProducts(); 
}

function addProductToWebPage() {

    let main = document.getElementsByTagName("main")[0];
    let isGrey = false 

    for (let i = 0; i < listOfProducts.length; i++) {
        const productContainer = createProductContainer(listOfProducts[i], isGrey);
        
        main.appendChild(productContainer)
        isGrey = !isGrey
    }; 
}

function createProductContainer(product, isGrey) {

    let productContainer = document.createElement("div")
    productContainer.classList.add("productContainer")
    if(isGrey) {
        productContainer.style.backgroundColor = ("#f5f5f5")
    }

    let textContainer = document.createElement("div")
    textContainer.classList.add("textContainer")

    let titleText = document.createElement("h1")
    titleText.classList.add("titleText")
    titleText.innerText = product.title

    let descriptionText = document.createElement("h3")
    descriptionText.classList.add("descriptionText")
    descriptionText.innerText = product.description

    textContainer.append(titleText, descriptionText)


    let imageContainer = document.createElement("div")
    imageContainer.classList.add("imageContainer")
    
    let phoneImg = document.createElement("img")
    phoneImg.classList.add("phoneImg")
    phoneImg.src = "../assets/" + product.image

    imageContainer.append(phoneImg)


    let priceContainer = document.createElement("div")
    priceContainer.classList.add("priceContainer")

    let priceText = document.createElement("h2")
    priceText.classList.add("priceText")
    priceText.innerText = product.price + " kr"

    priceContainer.append(priceText)


    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    buttonContainer.addEventListener("click", () => {
        console.log("Bonjour")
    })

    let icon = document.createElement("i")
    icon.className = "fas fa-cart-arrow-down"
    icon.classList.add("cartIcon")

    let buttonTextContainer = document.createElement("div")
    buttonTextContainer.innerText = "Add to cart"

    buttonContainer.append(icon, buttonTextContainer)


    productContainer.append(textContainer, imageContainer, priceContainer, buttonContainer)


    return productContainer


}

window.addEventListener("load", () => {
    initSite(); 
    
})