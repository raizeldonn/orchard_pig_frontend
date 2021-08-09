import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'
import CartAPI from '../../CartAPI'
import Toast from '../../Toast'

class Checkout2View {
  init(){
    document.title = 'Checkout2'   
    this.products = null 
    this.render()    
    this.getProducts()  
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

  paymentSubmitHandler(e){
    e.preventDefault()    
    const formData = e.detail.formData
    
    OrderAPI.paymentInfo(formData)
    gotoRoute('/checkout3')
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class='checkout-header'>
        <h1>Checkout</h1>
        <img class='nav-logo' src='/images/logo-black.png'>
      </div>

      <div class="page-content checkout checkout2">        
      
      <div class='left'>
        <h2>Payment Details</h2>
        
        <sl-form class="form-shipping" @sl-submit=${this.paymentSubmitHandler}>
            <div class="input-group">
              <sl-input name="cardName" type="text" label="Name On Card" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardNumber" type="text" label="Card Number" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardExpiry" type="text" label="Expiry Date" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardCvv" type="text" label="CVV" required></sl-input>
            </div>      
            <button class="checkout-btn" submit >Review Order</button>
          </sl-form>
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
                  <p>&pound;${product.price.$numberDecimal}</p>
                </div>
              </div>
          `)}
        `}
          

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


export default new Checkout2View()