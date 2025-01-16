import {cart,addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

let generatedProductsHTML='';

products.forEach((products)=>{
  
    const productsHTML=`<div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${products.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
             ${products.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars" src="images/ratings/rating-${products.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
               ${products.rating.count}
              </div>
            </div>
  
            <div class="product-price">
             $ ${(products.priceCents/100).toFixed(2)}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-select">
                <option selected="" value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart ">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${products.id}">
              Add to Cart
            </button>
          </div>`;
          generatedProductsHTML+=productsHTML;  
});

function updateCartQuantity(){
  
    let cartQuantity=0;

    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

}

 document.querySelector('.js-product-grid').innerHTML=generatedProductsHTML;

 document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener(
        'click',()=>{
            const productId=button.dataset.productId;
            
            addToCart(productId);
             
        });
 });
 

//added message option display 
 document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener(
      'click',()=>{
          // Add class to the corresponding .added-to-cart div
            const productContainer = button.closest('.product-container');
            const addedToCartDiv = productContainer.querySelector('.added-to-cart');
            addedToCartDiv.classList.add('js-added-to-cart');
          
           
          // Use setTimeout to remove the class after 4 seconds (4000 ms)
          setTimeout(() => {
            addedToCartDiv.classList.remove('js-added-to-cart');
          }, 3000); // Delay is in milliseconds
        
      });
});



document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productContainer = button.closest('.product-container');
    const selectElement = productContainer.querySelector('.js-quantity-select');

    // Get the selected option's value and parse it as an integer
    const selectedValue = parseInt(selectElement.value);
    const productId = button.dataset.productId;

    let matchingItem;
    cart.forEach((item) => {
      if (productId == item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += (selectedValue-1);
    } else {
      cart.push({
        productId: productId,
        quantity: selectedValue-1
      });
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});


// document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
//   button.addEventListener(
//       'click',()=>{
//         const productContainer = button.closest('.product-container');
//           const selectElement = productContainer.querySelector('.js-quantity-select');

//           // Get the selected option's value
//           const selectedValue = parseInt(selectElement.value,10);
//           console.log('Selected value:', selectedValue);

//           const productId=button.dataset.productId;

//           let matchingItem;
//             cart.forEach((item)=>{
//               if(productId==item.productId)
//               {
//                 matchingItem=item;
//               }
//             });

//             if(matchingItem)
//             {
//                 matchingItem.quantity+=1;
//             }
//             else{
//                 cart.push({
//                     productId:productId,
//                     quantity:selectedValue
//                 });
//             }
           
//             let cartQuantity=0;

//             cart.forEach((item)=>{
//               cartQuantity+=item.quantity;
//             });

            
//             document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
           

//       });
// });

