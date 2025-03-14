`<div class="order-container">
    <div class="order-header">
        <div class="order-header-left-section">
        <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>August 12</div>
        </div>
        <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$35.06</div>
        </div>
        </div>

        <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
        </div>
    </div>

    <div class="order-details-grid">
        <div class="product-image-container">
        <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
        </div>

        <div class="product-details">
        <div class="product-name">
            Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>
        <div class="product-delivery-date">
            Arriving on: August 15
        </div>
        <div class="product-quantity">
            Quantity: 1
        </div>
        <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
        </button>
        </div>
    </div>

        <div class="product-actions">
        <a href="tracking.html">
            <button class="track-package-button button-secondary">
            Track package
            </button>
        </a>
        </div>

        <div class="product-image-container">
        <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
        </div>

        <div class="product-details">
        <div class="product-name">
            Adults Plain Cotton T-Shirt - 2 Pack
        </div>
        <div class="product-delivery-date">
            Arriving on: August 19
        </div>
        <div class="product-quantity">
            Quantity: 2
        </div>
        <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
        </button>
        </div>

        <div class="product-actions">
        <a href="tracking.html">
            <button class="track-package-button button-secondary">
            Track package
            </button>
        </a>
        </div>
    </div>
</div>`

let ordersGrid=document.querySelector(".orders-grid");
let ordersArray=JSON.parse(localStorage.getItem("savedOrders"));

let productsList;

function updateCartItemsDisplay(){
    let remoteCart=JSON.parse(localStorage.getItem("savedCart"))
    let totalCartItems=0;
    let cartQuantity=document.querySelector(".cart-quantity");
    if(remoteCart.length!=0){
        for(let a=0;a<remoteCart.length;a++){
            totalCartItems+=remoteCart[a].quantity;
        }
    }else{
        totalCartItems=0;
    }
    cartQuantity.innerHTML=totalCartItems;
}

async function fetchProducts(){
    await fetch("https://supersimplebackend.dev/products").then((response)=>{
        return response.json();
    }).then((fetchedContent)=>{
        productsList=fetchedContent;

        ordersGrid.innerHTML="";

        ordersArray.forEach((order)=>{
            let foundProducts=[];

            order.products.forEach((product)=>{
                productsList.forEach((comparedProduct)=>{
                    if(product.productId==comparedProduct.id){
                        foundProducts.push({
                            image:comparedProduct.image,
                            name:comparedProduct.name,
                            estimatedDeliveryTime:dayjs().add(28, "day").format("dddd, MMMM DD"),
                            id:product.productId,
                            quantity:product.quantity,
                            priceCents:comparedProduct.priceCents,
                            deliveryOptionId:"1",
                            deliveryCostz:0
                        });
                        console.log(foundProducts);
                    }
                })
            })

            let randId=Math.random(0,10);
            let randId2=Math.random(0,69);
            let orderContainer=document.createElement("div");
            orderContainer.className="order-container";
            orderContainer.setAttribute("data-uniqueId", randId);
            orderContainer.innerHTML+=`
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${dayjs(order.orderTime).format("dddd D")}</div>
                        </div>
                    </div>    
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${(order.totalCostCents/100).toFixed(2)}</div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>`;
            ordersGrid.appendChild(orderContainer);

            foundProducts.forEach((product)=>{
                let orderContainer=ordersGrid.querySelector(`[data-uniqueId='${randId}']`);
                let orderDetailsGrid=document.createElement("div");
                orderDetailsGrid.className="order-details-grid";
                orderContainer.appendChild(orderDetailsGrid);
                
                orderDetailsGrid.innerHTML+=`
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>
                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dayjs(product.estimatedDeliveryTime).format("dddd D")}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>

                </div>

                <div class="product-actions">
                    <a href="tracking.html?productId=${product.id}&estimatedDeliveryTime=${product.estimatedDeliveryTime}&quantity=${product.quantity}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                </div>
                `;

                let randId3=Math.random(0,56);

                
                
                let buyAgainButton=document.createElement("button");
                buyAgainButton.classList="buy-again-button button-primary";
                buyAgainButton.setAttribute("data-uniqueId2", randId3);
                buyAgainButton.innerHTML=`
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>`;
                buyAgainButton.addEventListener("click", ()=>{
                    let remoteCart=JSON.parse(localStorage.getItem("savedCart"));

                    let productExists=remoteCart.some(obj=>obj.id===product.id);
                    if(!productExists){
                        console.log("product does not exist");
                        remoteCart.push(product);
                        localStorage.setItem("savedCart", JSON.stringify(remoteCart));
                    }else{
                        console.log("product already exists");
                        let productToEdit=remoteCart.find(obj=>obj.name==product.name);
                        productToEdit.quantity+=1;
                        localStorage.setItem("savedCart", JSON.stringify(remoteCart));
                    }
                    updateCartItemsDisplay();
                })
                orderDetailsGrid.querySelector(".product-details").appendChild(buyAgainButton);
                
                /*
                for(let i=0; i<buyAgainButtons.length; i++){
                    buyAgainButtons[i].addEventListener("click", ()=>{
                        let remoteCart=JSON.parse(localStorage.getItem("savedCart"));
                        let productExists=remoteCart.some(obj=>obj.id===product.productId);
                        if(!productExists){
                            console.log(productExists);
                        }
                    })
                }
                */


                orderContainer.appendChild(orderDetailsGrid);
            })
        })
    })
} 

fetchProducts();

updateCartItemsDisplay();