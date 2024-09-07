products.forEach(function(product){
    const productsGrid=document.querySelector(".products-grid");
    //Create product container
    let productContainer=document.createElement('div');
    productContainer.className="product-container";
    productsGrid.appendChild(productContainer);
    //Create product image container
    let productImageContainer=document.createElement("div");
    productImageContainer.className="product-image-container";
    productContainer.appendChild(productImageContainer);
    //Create product image
    let productImage=document.createElement("img");
    productImage.className="product-image";
    productImage.setAttribute("src", product.image);
    productImageContainer.appendChild(productImage);
    //Create product name
    let productName=document.createElement("div");
    productName.classList="product-name limit-text-to-2-lines";
    productName.innerHTML=product.name;
    productContainer.appendChild(productName);
    //Create product rating container
    let productRatingContainer=document.createElement("div");
    productRatingContainer.className="product-rating-container";
    productContainer.appendChild(productRatingContainer);
    //Create product rating stars
    let productRatingStars=document.createElement("img");
    productRatingStars.className="product-rating-stars";
    productRatingStars.setAttribute("src", "images/ratings/rating-"+product.rating.stars*10+".png");
    productRatingContainer.appendChild(productRatingStars);
    //Create product rating count
    let productRatingCount=document.createElement("div");
    productRatingCount.classList="product-rating-count link-primary";
    productRatingCount.innerHTML=product.rating.count;
    productRatingContainer.appendChild(productRatingCount);
    //Create product price
    let productPrice=document.createElement("div");
    productPrice.className="product-price";
    productPrice.innerHTML="$"+product.priceCents/100;
    productContainer.appendChild(productPrice);
    //Create product quantity container
    let productQuantityContainer=document.createElement("div");
    productQuantityContainer.className=("product-quantity-container");
    productContainer.appendChild(productQuantityContainer);
    //Create product quantity chooser
    let productQuantityChooser=document.createElement("select");
    productQuantityContainer.appendChild(productQuantityChooser);
    for(let i=1;i<=6;i++){
        let optionElement=document.createElement("option");
        optionElement.value=i;
        optionElement.innerHTML=i;
        productQuantityChooser.appendChild(optionElement);
    }
    let addToCartButton=document.createElement("button");
    addToCartButton.classList="add-to-cart-button button-primary";
    addToCartButton.innerHTML="Add to Cart";
    addToCartButton.addEventListener("click", function(){
        let productToAdd={
            id:product.id,
            image:product.image,
            name:product.name,
            rating:product.rating,
            priceCents:product.priceCents,
            keywords:product.keywords
        }
        cart.push(productToAdd)
        console.log(cart);
    });
    productContainer.appendChild(addToCartButton);
})
