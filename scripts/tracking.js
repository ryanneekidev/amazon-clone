let url=new URL(window.location.href);
let productId=url.searchParams.get("productId");
let estimatedDeliveryTime=url.searchParams.get("estimatedDeliveryTime");
let quantity=url.searchParams.get("quantity");
let productsList;

async function fetchProductsAndRender(){
    await fetch("https://supersimplebackend.dev/products").then((response)=>{
        return response.json();
    }).then((fetchedContent)=>{
        productsList=fetchedContent;
        let foundProduct;

        productsList.forEach((product)=>{
            if(product.id==productId){
                foundProduct=product;
            }
        })
        
        let main=document.querySelector(".main")
        main.innerHTML=`
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${dayjs(estimatedDeliveryTime).format("dddd, MMMM D")}
            </div>

            <div class="product-info">
                ${foundProduct.name}
            </div>

            <div class="product-info">
                Quantity: ${quantity}
            </div>

            <img class="product-image" src="${foundProduct.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;
    })
}

fetchProductsAndRender();