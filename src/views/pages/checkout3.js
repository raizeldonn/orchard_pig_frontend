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
      console.log("shipping: " + JSON.stringify(this.shipping))
      console.log("payment: " + JSON.stringify(this.payment))
      this.render()
    }
    catch(err){
      Toast.show(err, 'error')
    }
  }
  
  async placeOrder(){
    await OrderAPI.placeOrder()
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
      
      <div class='left'>
        <h1>Review Order</h1>
        <div class='shipping-details'>
          	<h2>Shipping Details</h2>
            ${this.userData == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p>${this.userData.firstName}</p>
              <p>${this.userData.lastName}</p>
              <p>${this.userData.phoneNumber}</p>`}
            
            ${this.shipping == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p>${this.shipping.address}</p>
              <p>${this.shipping.address2}</p>
              <p>${this.shipping.shippingOption}</p>`}  
            
            <a @click="${() => gotoRoute('/checkout1')}">Edit</a>
        </div>

        <div class='payment-details'>
          	<h2>Payment Details</h2>
            ${this.shipping == null ? 
              html`<sl-spinner></sl-spinner>` : 
              html`
              <p>**** **** **** ${this.payment.lastFourDigits}</p>
              <p>${this.payment.expMonth}</p>
              <p>20${this.payment.expYear}</p>`}

              <a @click="${() => gotoRoute('/checkout2')}">Edit</a>
        </div>

        <button class='checkout-btn' @click=${this.placeOrder}>Place Order</button>
        
      </div>
        
      <div class='right'>
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