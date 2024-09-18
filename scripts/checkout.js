newCart=JSON.parse(localStorage.getItem("savedCart"))

let paymentSummaryMoneyShipping=document.querySelector(".payment-summary-money-shipping");
let totalPaymentSummaryMoney=document.querySelector(".total-payment-summary-money");
let taxPaymentSummaryMoney=document.querySelector(".tax-payment-summary-money");
let grandTotalPaymentSummaryMoney=document.querySelector(".grand-total-payment-summary-money");
let placeOrderButton=document.querySelector(".place-order-button");

let totalShippingCost=0;
let totalCartCost=0;
let totalBeforeTax=0;
let taxMoney=0;
let grandTotal=0
let initOrders=[];

if(localStorage.getItem("totalShippingCost")==null){
    localStorage.setItem("totalShippingCost", 0);
}

//Create new orders variable in localStorage if it doesn't exist
if(localStorage.getItem("savedOrders")==null){
    localStorage.setItem("savedOrders", JSON.stringify(initOrders));
}

if(JSON.parse(localStorage.getItem("savedCart")).length!=0){
    newCart.forEach(function(product){
        //Render cart summary
        let orderSummary=document.querySelector(".order-summary");
        //Create cart item container
        let cartItemContainer=document.createElement("div");
        cartItemContainer.className="cart-item-container";
        orderSummary.appendChild(cartItemContainer);
        //Create delivery date
        let deliveryDate=document.createElement("div");
        deliveryDate.className="delivery-date";
        deliveryDate.innerHTML="Delivery date: "+product.estimatedDeliveryTime;
        cartItemContainer.appendChild(deliveryDate);
        //Create item details grid
        let cartItemDetailsGrid=document.createElement("div");
        cartItemDetailsGrid.className="cart-item-details-grid";
        cartItemContainer.appendChild(cartItemDetailsGrid);
        //Create product image
        let productImage=document.createElement("img");
        productImage.className="product-image";
        productImage.setAttribute("src", product.image);
        cartItemDetailsGrid.appendChild(productImage);
        //Create cart item details
        let cartItemDetails=document.createElement("div");
        cartItemDetails.className="cart-item-details";
        cartItemDetailsGrid.appendChild(cartItemDetails);
        //Create product name
        let productName=document.createElement("div");
        productName.className="product-name";
        productName.innerHTML=product.name;
        cartItemDetails.appendChild(productName);
        //Create product price
        let productPrice=document.createElement("div");
        productPrice.className="product-price";
        productPrice.innerHTML="$"+(product.priceCents/100).toFixed(2);
        cartItemDetails.appendChild(productPrice);
        //Create product quantity
        let productQuantity=document.createElement("div");
        productQuantity.className="product-quantity";
        cartItemDetails.appendChild(productQuantity);
        //Create quantity label
        let quantityLabel=document.createElement("span");
        quantityLabel.className="quantity-label";
        quantityLabel.innerHTML="Quantity: "+product.quantity+" ";
        productQuantity.appendChild(quantityLabel);
        //Create update quantity link
        let updateQuantityLink=document.createElement("span");
        updateQuantityLink.classList="update-quantity-link link-primary";
        updateQuantityLink.innerHTML="Update ";
        updateQuantityLink.addEventListener("click", function(){
            let newQuantityInput=document.createElement("input");
            newQuantityInput.className="new-quantity-input";
            newQuantityInput.setAttribute("type", "number");
            newQuantityInput.setAttribute("value", "1");
            let saveQuantityLink=document.createElement("span");
            saveQuantityLink.classList="save-quantity-link link-primary";
            saveQuantityLink.innerHTML="Save";
            let updateAndSaveDiv=document.createElement("div");
            updateAndSaveDiv.appendChild(newQuantityInput);
            updateAndSaveDiv.appendChild(saveQuantityLink);
            saveQuantityLink.addEventListener("click", function(){
                let productToEdit=newCart.find(obj=>obj.name==product.name);
                productToEdit.quantity=parseInt(newQuantityInput.value);
                console.log(newCart);
                localStorage.setItem("savedCart", JSON.stringify(newCart));
                quantityLabel.innerHTML="Quantity: "+product.quantity+" ";
                productQuantity.replaceChild(updateQuantityLink, updateAndSaveDiv);
    
                let returnToHomeLink=document.querySelector(".return-to-home-link");
                let totalCartItems=0;
                if(newCart.length!=0){
                    for(let a=0;a<newCart.length;a++){
                        totalCartItems+=newCart[a].quantity;
                    }
                }
                returnToHomeLink.innerHTML=totalCartItems+" items";
    
                let paymentSummaryCounterNet=document.querySelector(".payment-summary-counter-net");
                paymentSummaryCounterNet.innerHTML="Items ("+totalCartItems+")";
    
                totalCartCost=0;
                if(newCart.length!=0){
                    for(let e=0;e<newCart.length;e++){
                        totalCartCost+=newCart[e].priceCents*newCart[e].quantity;
                    }
                }
    
                paymentSummaryMoneyNet.innerHTML="$"+(totalCartCost/100).toFixed(2);
                totalShippingCost=0;
                for(let t=0;t<newCart.length;t++){
                    totalShippingCost+=newCart[t].deliveryCostz;
                }
                localStorage.setItem("totalShippingCost", totalShippingCost);
                paymentSummaryMoneyShipping.innerHTML="$"+(localStorage.getItem("totalShippingCost")/100).toFixed(2);
    
                totalBeforeTax=0;
                totalBeforeTax=(totalCartCost+totalShippingCost).toFixed(2);
                totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100);
                
                taxMoney=((totalBeforeTax*0.10)/100).toFixed(2);
                taxPaymentSummaryMoney.innerHTML="$"+taxMoney;
                
                grandTotal=0;
                grandTotal=totalBeforeTax/100+parseInt(taxMoney);
                grandTotalPaymentSummaryMoney.innerHTML="$"+(grandTotal).toFixed(2);
            })
            productQuantity.replaceChild(updateAndSaveDiv, updateQuantityLink);
        })
        productQuantity.appendChild(updateQuantityLink);
        //Create delete quantity link
        let deleteQuantityLink=document.createElement("span");
        deleteQuantityLink.classList="delete-quantity-link link-primary";
        deleteQuantityLink.innerHTML="Delete";
        deleteQuantityLink.addEventListener("click", function(){
            newCart=newCart.filter(item=>item!==product);
            orderSummary.removeChild(event.target.parentElement.parentElement.parentElement.parentElement);
            localStorage.setItem("savedCart", JSON.stringify(newCart));
            totalCartCost=0;
            if(newCart.length!=0){
                for(let e=0;e<newCart.length;e++){
                    totalCartCost+=newCart[e].priceCents*newCart[e].quantity;
                }
            }
            paymentSummaryMoneyNet.innerHTML=("$"+(totalCartCost/100).toFixed(2));
            totalShippingCost=0;
            for(let t=0;t<newCart.length;t++){
                totalShippingCost+=newCart[t].deliveryCostz;
            }
            localStorage.setItem("totalShippingCost", totalShippingCost);
            totalBeforeTax=0;
            totalBeforeTax=totalCartCost+totalShippingCost;
            totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100).toFixed(2);
            paymentSummaryMoneyShipping.innerHTML="$"+(localStorage.getItem("totalShippingCost")/100).toFixed(2);
    
            totalBeforeTax=0;
            totalBeforeTax=(totalCartCost+totalShippingCost).toFixed(2);
            totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100).toFixed(2);
    
            taxMoney=((totalBeforeTax*0.10)/100).toFixed(2);
            taxPaymentSummaryMoney.innerHTML="$"+taxMoney;
    
            grandTotal=0;
            grandTotal=totalBeforeTax/100+parseInt(taxMoney);
            grandTotalPaymentSummaryMoney.innerHTML="$"+(grandTotal).toFixed(2);
    
            let totalCartItems=0;
            if(newCart.length!=0){
                for(let a=0;a<newCart.length;a++){
                    totalCartItems+=newCart[a].quantity;
                }
            }
            returnToHomeLink.innerHTML=totalCartItems+" items";
        })
        productQuantity.appendChild(deleteQuantityLink);
        //Create delivery options
        let uniqueRadioId=Math.random(1,9999);
        let deliveryOptions=document.createElement("div");
        deliveryOptions.className="delivery-options";
        cartItemDetailsGrid.appendChild(deliveryOptions);
        //Create delivery options title
        let deliveryOptionsTitle=document.createElement("div");
        deliveryOptionsTitle.className="delivery-options-title";
        deliveryOptionsTitle.innerHTML="Choose a delivery option:"
        deliveryOptions.appendChild(deliveryOptionsTitle);
    
    
        //Create delivery option 1
        let deliveryOption1=document.createElement("div");
        deliveryOption1.className="delivery-option";
        deliveryOptions.appendChild(deliveryOption1);
        //Create delivery option 1 input
        let deliveryOptionInput1=document.createElement("input");
        deliveryOptionInput1.className="delivery-option-input";
        deliveryOptionInput1.setAttribute("type", "radio");
        deliveryOptionInput1.setAttribute("checked", "");
        deliveryOptionInput1.setAttribute("name", "delivery-option-input"+uniqueRadioId);
        deliveryOptionInput1.addEventListener("click", function(){
            if(deliveryOptionInput1.checked==true){
                product.deliveryOptionId="1";
                product.deliveryCostz=0;
                product.estimatedDeliveryTime=dayjs().add(28, "day").format("dddd, MMMM DD");
                localStorage.setItem("savedCart", JSON.stringify(newCart));
                deliveryDate.innerHTML="Delivery date: "+product.estimatedDeliveryTime;
                deliveryOptionDate1.innerHTML=product.estimatedDeliveryTime;
            }
            console.log(newCart);
            totalShippingCost=0;
            localStorage.setItem("totalShippingCost", totalShippingCost);
            for(let t=0;t<newCart.length;t++){
                totalShippingCost+=newCart[t].deliveryCostz;
            }
            localStorage.setItem("totalShippingCost", totalShippingCost);
            totalBeforeTax=0;
            totalBeforeTax=totalCartCost+totalShippingCost;
            totalPaymentSummaryMoney.innerHTML="$"+totalBeforeTax/100;
            paymentSummaryMoneyShipping.innerHTML="$"+(localStorage.getItem("totalShippingCost")/100).toFixed(2);
    
            totalBeforeTax=0;
            totalBeforeTax=(totalCartCost+totalShippingCost).toFixed(2);
            totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100);
            
            taxMoney=((totalBeforeTax*0.10)/100).toFixed(2);
            taxPaymentSummaryMoney.innerHTML="$"+taxMoney;
            
            grandTotal=0;
            grandTotal=totalBeforeTax/100+parseInt(taxMoney);
            grandTotalPaymentSummaryMoney.innerHTML="$"+grandTotal;
        })
        if(product.deliveryOptionId=="1"){
            deliveryOptionInput1.setAttribute("checked", true);
        }
        deliveryOption1.appendChild(deliveryOptionInput1);
        //Create delivery option info
        let deliveryOptionInfo1=document.createElement("div");
        deliveryOption1.appendChild(deliveryOptionInfo1);
        //Create option delivery date
        let deliveryOptionDate1=document.createElement("div");
        deliveryOptionDate1.className="delivery-option-date";
        deliveryOptionDate1.innerHTML=product.estimatedDeliveryTime;
        deliveryOptionInfo1.appendChild(deliveryOptionDate1);
        //Create option delivery price
        let deliveryOptionPrice1=document.createElement("div");
        deliveryOptionPrice1.className="delivery-option-price";
        deliveryOptionPrice1.innerHTML="FREE Shipping";
        deliveryOptionInfo1.appendChild(deliveryOptionPrice1);
    
        //Create delivery option 2
        let deliveryOption2=document.createElement("div");
        deliveryOption2.className="delivery-option";
        deliveryOptions.appendChild(deliveryOption2);
        //Create delivery option 2 input
        let deliveryOptionInput2=document.createElement("input");
        deliveryOptionInput2.className="delivery-option-input";
        deliveryOptionInput2.setAttribute("type", "radio");
        deliveryOptionInput2.setAttribute("name", "delivery-option-input"+uniqueRadioId);
        deliveryOptionInput2.addEventListener("click", function(){
            if(deliveryOptionInput2.checked==true){
                product.deliveryOptionId="2";
                product.deliveryCostz=499;
                product.estimatedDeliveryTime=dayjs().add(14, "day").format("dddd, MMMM DD");
                localStorage.setItem("savedCart", JSON.stringify(newCart));
                deliveryDate.innerHTML="Delivery date: "+product.estimatedDeliveryTime;
                deliveryOptionDate2.innerHTML=product.estimatedDeliveryTime;
            }
            totalShippingCost=0;
            localStorage.setItem("totalShippingCost", totalShippingCost);
            console.log(newCart);
            for(let t=0;t<newCart.length;t++){
                totalShippingCost+=Math.round(newCart[t].deliveryCostz);
            }
            localStorage.setItem("totalShippingCost", totalShippingCost);
            totalBeforeTax=0;
            totalBeforeTax=totalCartCost+totalShippingCost;
            totalPaymentSummaryMoney.innerHTML="$"+totalBeforeTax/100;
            paymentSummaryMoneyShipping.innerHTML="$"+localStorage.getItem("totalShippingCost")/100;
    
            totalBeforeTax=0;
            totalBeforeTax=(totalCartCost+totalShippingCost).toFixed(2);
            totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100);
            
            taxMoney=((totalBeforeTax*0.10)/100).toFixed(2);
            taxPaymentSummaryMoney.innerHTML="$"+taxMoney;
            
            grandTotal=0;
            grandTotal=totalBeforeTax/100+parseInt(taxMoney);
            grandTotalPaymentSummaryMoney.innerHTML="$"+grandTotal;
        })
        if(product.deliveryOptionId=="2"){
            deliveryOptionInput2.setAttribute("checked", true);
        }
        deliveryOption2.appendChild(deliveryOptionInput2);
        //Create delivery option info
        let deliveryOptionInfo2=document.createElement("div");
        deliveryOption2.appendChild(deliveryOptionInfo2);
        //Create option delivery date
        let deliveryOptionDate2=document.createElement("div");
        deliveryOptionDate2.className="delivery-option-date";
        deliveryOptionDate2.innerHTML=dayjs().add(14, "day").format("dddd, MMMM DD");
        deliveryOptionInfo2.appendChild(deliveryOptionDate2);
        //Create option delivery price
        let deliveryOptionPrice2=document.createElement("div");
        deliveryOptionPrice2.className="delivery-option-price";
        deliveryOptionPrice2.innerHTML="$4.99 - Shipping";
        deliveryOptionInfo2.appendChild(deliveryOptionPrice2);
    
        //Create delivery option 3
    
        let deliveryOption3=document.createElement("div");
        deliveryOption3.className="delivery-option";
        deliveryOptions.appendChild(deliveryOption3);
        //Create delivery option 2 input
        let deliveryOptionInput3=document.createElement("input");
        deliveryOptionInput3.className="delivery-option-input";
        deliveryOptionInput3.setAttribute("type", "radio");
        deliveryOptionInput3.setAttribute("name", "delivery-option-input"+uniqueRadioId);
        deliveryOptionInput3.addEventListener("click", function(){
            if(deliveryOptionInput3.checked==true){
                product.deliveryOptionId="3";
                product.deliveryCostz=999;
                product.estimatedDeliveryTime=dayjs().add(7, "day").format("dddd, MMMM DD");
                localStorage.setItem("savedCart", JSON.stringify(newCart));
                deliveryDate.innerHTML="Delivery date: "+product.estimatedDeliveryTime;
                deliveryOptionDate3.innerHTML=product.estimatedDeliveryTime;
            }
            totalShippingCost=0;
            localStorage.setItem("totalShippingCost", totalShippingCost);
            console.log(newCart);
            for(let t=0;t<newCart.length;t++){
                totalShippingCost+=newCart[t].deliveryCostz;
            }
            localStorage.setItem("totalShippingCost", totalShippingCost);
            totalBeforeTax=0;
            totalBeforeTax=totalCartCost+totalShippingCost;
            totalPaymentSummaryMoney.innerHTML="$"+totalBeforeTax/100;
            paymentSummaryMoneyShipping.innerHTML="$"+localStorage.getItem("totalShippingCost")/100;
    
            totalBeforeTax=0;
            totalBeforeTax=(totalCartCost+totalShippingCost).toFixed(2);
            totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100);
            
            taxMoney=((totalBeforeTax*0.10)/100).toFixed(2);
            taxPaymentSummaryMoney.innerHTML="$"+taxMoney;
            
            grandTotal=0;
            grandTotal=totalBeforeTax/100+parseInt(taxMoney);
            grandTotalPaymentSummaryMoney.innerHTML="$"+grandTotal;
        })
        if(product.deliveryOptionId=="3"){
            deliveryOptionInput3.setAttribute("checked", true);
        }
        deliveryOption3.appendChild(deliveryOptionInput3);
        //Create delivery option info
        let deliveryOptionInfo3=document.createElement("div");
        deliveryOption3.appendChild(deliveryOptionInfo3);
        //Create option delivery date
        let deliveryOptionDate3=document.createElement("div");
        deliveryOptionDate3.className="delivery-option-date";
        deliveryOptionDate3.innerHTML=dayjs().add(7, "day").format("dddd, MMMM DD");
        deliveryOptionInfo3.appendChild(deliveryOptionDate3);
        //Create option delivery price
        let deliveryOptionPrice3=document.createElement("div");
        deliveryOptionPrice3.className="delivery-option-price";
        deliveryOptionPrice3.innerHTML="$9.99 - Shipping";
        deliveryOptionInfo3.appendChild(deliveryOptionPrice3);
    })
}

function todaysDate(){
    let today=new Date();
    let daysNames=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let todayIndex=today.getDay();
    let todayIndexInMonth=today.getDate();
    let todayName=daysNames[todayIndex];
    let currentMonth=today.getMonth();
    let currentMonthName=monthNames[currentMonth];
    let dateString=todayName+", "+currentMonthName+" "+todayIndexInMonth; 
    return dateString;
}

let returnToHomeLink=document.querySelector(".return-to-home-link");
let totalCartItems=0;
if(newCart.length!=0){
    for(let a=0;a<newCart.length;a++){
        totalCartItems+=newCart[a].quantity;
    }
}
returnToHomeLink.innerHTML=totalCartItems+" items";

let paymentSummaryCounterNet=document.querySelector(".payment-summary-counter-net");
paymentSummaryCounterNet.innerHTML="Items ("+totalCartItems+")";

let paymentSummaryMoneyNet=document.querySelector(".payment-summary-money-net");

if(newCart.length!=0){
    for(let e=0;e<newCart.length;e++){
        totalCartCost+=newCart[e].priceCents*newCart[e].quantity;
    }
}

totalShippingCost=0;
localStorage.setItem("totalShippingCost", totalShippingCost);
for(let t=0;t<newCart.length;t++){
    totalShippingCost+=newCart[t].deliveryCostz;
}
localStorage.setItem("totalShippingCost", totalShippingCost);

paymentSummaryMoneyNet.innerHTML="$"+(totalCartCost/100).toFixed(2);
paymentSummaryMoneyShipping.innerHTML="$"+(localStorage.getItem("totalShippingCost")/100).toFixed(2);
console.log(totalShippingCost);

totalBeforeTax=0;
totalBeforeTax=totalCartCost+totalShippingCost;
totalPaymentSummaryMoney.innerHTML="$"+(totalBeforeTax/100).toFixed(2);

taxMoney=Math.round(totalBeforeTax*0.10);
taxPaymentSummaryMoney.innerHTML="$"+(taxMoney/100).toFixed(2);

grandTotal=0;
grandTotal=totalBeforeTax+taxMoney;
grandTotalPaymentSummaryMoney.innerHTML="$"+(grandTotal/100).toFixed(2);

console.log("Grand total: "+(totalBeforeTax+taxMoney));

placeOrderButton.addEventListener("click", async ()=>{
    //console.log(JSON.parse(localStorage.getItem("savedCart")).length);
    try{
        if(JSON.parse(localStorage.getItem("savedCart")).length!=0){
            let response=await fetch("https://supersimplebackend.dev/orders", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    cart: JSON.parse(localStorage.getItem("savedCart"))
                })
            });
            let order =await response.json();
            console.log(order);
            let ordersArray=JSON.parse(localStorage.getItem("savedOrders"));
            ordersArray.unshift(order);
            localStorage.setItem("savedOrders", JSON.stringify(ordersArray));
            localStorage.setItem("savedCart", JSON.stringify([]));
            console.log("Cart uploaded successfully");
            window.location.href="orders.html";
        }else{
            console.log("The cart is empty");
        }
    }catch(error){
        console.log("There was a problem uploading the cart");
    }
})