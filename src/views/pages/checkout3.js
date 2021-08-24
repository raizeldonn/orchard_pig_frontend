import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'
import CartAPI from '../../CartAPI'
import Toast from '../../Toast'

class Checkout3View {
  init(){
    document.title = 'Checkout3'   
    this.products = null 
    this.userData = null
    this.shipping = null
    this.payment = null
    this.render()    
    this.getProducts()  
    this.getOrderInfo()
    Utils.pageIntroAnim()
  }

  getProducts(){
    try{
      this.products = localStorage.getItem('cartProducts')
      this.products = JSON.parse(this.products)
      console.log(this.products)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  getOrderInfo(){
    try{
      this.userData = OrderAPI.getUserData()
      this.shipping = OrderAPI.getShipping()
      this.payment = OrderAPI.getPayment()
      console.log("userdata checkout: " + JSON.stringify(this.userData))
      console.log("shipping checkout: " + JSON.stringify(this.shipping))
      console.log("payment checkout: " + JSON.stringify(this.payment))
      this.render()
    }
    catch(err){
      Toast.show(err, 'error')
    }
  }
  
  async placeOrder(){
    try{
      await OrderAPI.placeOrder()
      Toast.show('Your order has been submitted. A receipt will be sent to you email')
    }
    catch(err){
      Toast.show(err, 'error')
  }
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class='checkout-header'>
        <h1>Checkout</h1>
        <img class='nav-logo' src='/images/logo-black.png'>
      </div>

      <div class="page-content checkout checkout3">        
      
      <div class='left-checkout'>
        <h1>Review Order</h1>
        <div class='shipping-details'>
          	<h2>Shipping Details</h2>
            ${this.userData == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p><b>First Name :</b> ${this.userData.firstName}</p>
              <p><b>Last Name :</b> ${this.userData.lastName}</p>
              <p><b>Phone : </b>${this.userData.phoneNumber}</p>`}
            
            ${this.shipping == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p><b>Address Line 1 :</b> ${this.shipping.address}</p>
              <p><b>Address Line 2 :</b> ${this.shipping.address2}</p>
              <p><b>Shipping Option :</b> ${this.shipping.shippingOption}</p>`}  
            
            <a style="color:red; cursor:pointer;" @click="${() => gotoRoute('/checkout1')}">Edit</a>
        </div>

        <div class='payment-details'>
          	<h2>Payment Details</h2>
            ${this.payment == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p><b>Credit Card :</b> **** **** **** ${this.payment.lastFourDigits}</p>
              <p><b>Expires :</b> ${this.payment.expMonth}/20${this.payment.expYear}</p>`}
      

              <a style="color:red; cursor:pointer;" @click="${() => gotoRoute('/checkout2')}">Edit</a>
        </div>

        <button class='checkout-btn' @click=${this.placeOrder}>Place Order</button>
        
      </div>
        
      <div class='right-checkout'>
        <h1>Your Basket</h1>
          ${this.products == null ? html`<p>no products</p>`: html `
            ${this.products.map(product => html`
              <div class='cart-product'>
                <img class='cart-img' src='/images/${product.item}.png' alt='${product.name}'>
                <div class='cart-product-info'>
                  <p class='product-name'>${product.name}</p> 
                  <p>Quantity: ${product.quantity}</p>
                  <!-- <p>&pound;${product.price.$numberDecimal}</p>-->
                  <p>&pound;${product.price}</p>
                </div>
              </div>
          `)}
        `}
          
        <p>Shipping: &pound;${CartAPI.getShipping()}.00</p>
        <h3>Subtotal: &pound;${CartAPI.getTotal()}.00</h3>
        <button class='checkout-btn' @click="${this.continueShopping}">Continue Shopping</button>
      </div>

      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new Checkout3View()