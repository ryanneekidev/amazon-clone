//Get products array from products.js file

//import {products} from "/data/products.js";

let products;

class Product{
    id;
    image;
    name;
    rating;
    priceCents;
    keywords;
    quantity;
    deliveryOptionz;
    deliveryCostz;
    deliveryEstDate;

    constructor(productDetails){
        this.id=productDetails.id;
        this.image=productDetails.image;
        this.name=productDetails.name;
        this.rating=productDetails.rating;
        this.priceCents=productDetails.priceCents;
        this.keywords=productDetails.keywords;
        this.quantity=productDetails.quantity;
        this.deliveryOptionz=productDetails.deliveryOptionz;
        this.deliveryCostz=productDetails.deliveryCostz;
        this.deliveryEstDate=productDetails.deliveryEstDate;
    }
}

class Clothing extends Product{
    sizeChartLink;

    constructor(productDetails){
        super(productDetails);
        this.sizeChartLink=productDetails.sizeChartLink;
    }
}

function renderProductsGrid(){
    let initCart=[];

    //Create new cart in localStorage if it doesn't exist
    if(localStorage.getItem("savedCart")==null){
        localStorage.setItem("savedCart", JSON.stringify(initCart));
    }

    let cartQuantity=document.querySelector(".cart-quantity");

    let remoteCart=JSON.parse(localStorage.getItem("savedCart"));

    //Define product class

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
        productPrice.innerHTML="$"+(product.priceCents/100).toFixed(2);
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
        if(product.type=="clothing"){
            let sizeChartLinkButton=document.createElement("a");
            sizeChartLinkButton.innerHTML="Size chart";
            sizeChartLinkButton.setAttribute("href", product.sizeChartLink);
            productContainer.appendChild(sizeChartLinkButton);
        }
        let addToCartButton=document.createElement("button");
        addToCartButton.classList="add-to-cart-button button-primary";
        addToCartButton.innerHTML="Add to Cart";
        addToCartButton.addEventListener("click", function(){
            let productExists=remoteCart.some(obj=>obj.id===product.id);
            if(!productExists){
                if(product.type=="clothing"){
                    let productToAdd=new Clothing({
                        id:product.id,
                        image:product.image,
                        name:product.name,
                        rating:product.rating,
                        priceCents:product.priceCents,
                        keywords:product.keywords,
                        quantity:parseInt(addToCartButton.parentElement.querySelector("select").value),
                        deliveryOptionz:"1",
                        deliveryCostz:0,
                        deliveryEstDate:dayjs().add(28, "day").format("dddd, MMMM DD"),
                        sizeChartLink:product.sizeChartLink
                    });
                    remoteCart.push(productToAdd);
                    localStorage.setItem("savedCart", JSON.stringify(remoteCart));
                }else{
                    let productToAdd=new Product({
                        id:product.id,
                        image:product.image,
                        name:product.name,
                        rating:product.rating,
                        priceCents:product.priceCents,
                        keywords:product.keywords,
                        quantity:parseInt(addToCartButton.parentElement.querySelector("select").value),
                        deliveryOptionz:"1",
                        deliveryCostz:0,
                        deliveryEstDate:dayjs().add(28, "day").format("dddd, MMMM DD"),
                    });
                    remoteCart.push(productToAdd);
                    localStorage.setItem("savedCart", JSON.stringify(remoteCart));
                }
            }else{
                let productToEdit=remoteCart.find(obj=>obj.name==product.name);
                productToEdit.quantity=parseInt(productToEdit.quantity)+parseInt(addToCartButton.parentElement.querySelector("select").value);
                localStorage.setItem("savedCart", JSON.stringify(remoteCart));
                console.log(remoteCart);
            }
            //Update cart quantity label
            let totalCartItems=0;
            if(remoteCart.length!=0){
                for(let a=0;a<remoteCart.length;a++){
                    totalCartItems+=remoteCart[a].quantity;
                }
            }else{
                totalCartItems=0;
            }
            cartQuantity.innerHTML=totalCartItems;
        });
        productContainer.appendChild(addToCartButton);
    })

    //Update cart quantity label
    let totalCartItems=0;
    if(remoteCart.length!=0){
        for(let a=0;a<remoteCart.length;a++){
            totalCartItems+=remoteCart[a].quantity;
        }
    }else{
        totalCartItems=0;
    }
    cartQuantity.innerHTML=totalCartItems;
    console.log("Products rendered successfully");
};

new Promise((resolve)=>{
    let xhr=new XMLHttpRequest();
    xhr.open("GET", "https://supersimplebackend.dev/products");
    xhr.send();
    xhr.addEventListener("load", ()=>{
        products=JSON.parse(xhr.response);
        resolve();
    })
}).then(()=>{
    console.log("Products retrieved successfully");
    renderProductsGrid();
})