let objects=JSON.parse(localStorage.getItem("savedCart"))
let productsList;

async function fetchProductsList(){
    try{
        await fetch("https://supersimplebackend.dev/products").then((response)=>{
            return response.json();
        }).then((fetchedContent)=>{
            console.log("(SA) Products fetched successfully")
            productsList=fetchedContent;
        });
    }catch(error){
        console.log("Error: "+error.message);
    }
}

fetchProductsList();

`                    <div class="product-details">
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

                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                    </div>`
/*
function getObjectById(desiredObjectId){
    let foundObject;
    objects.forEach((object)=>{
        if(object.id==desiredObjectId){
            foundObject=object;
        }
    })
    return foundObject;
}

let foundObject=getObjectById("15b6fc6f-327a-4ec4-896f-486349e85a3d");
console.log(foundObject.name);

let object2=getObjectById("2");
console.log(object2);
*/