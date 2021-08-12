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
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  paymentSubmitHandler(e){
    e.preventDefault()    
    const formData = e.detail.formData

    let cardNum = formData.get('cardNumber')
    let lastFourDigits = (cardNum.slice(cardNum.length - 4))
    let expMonth = formData.get('expMonth')
    let expYear = formData.get('expYear')
    let cvvVerified = false
    if (formData.get('cvv')){
      cvvVerified = true
    }

    OrderAPI.makePayment(lastFourDigits, expMonth, expYear, cvvVerified)
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
              <sl-input name="cardNumber" type="text" label="Card Number" required></sl-input>
            </div>
            <div class="input-group">
              <sl-select name='expMonth' label='Select Expiry Month' required>
                <sl-menu-item value='01'>January</sl-menu-item>
                <sl-menu-item value='02'>February</sl-menu-item>
                <sl-menu-item value='03'>March</sl-menu-item>
                <sl-menu-item value='04'>April</sl-menu-item>
                <sl-menu-item value='05'>May</sl-menu-item>
                <sl-menu-item value='06'>June</sl-menu-item>
                <sl-menu-item value='07'>July</sl-menu-item>
                <sl-menu-item value='08'>August</sl-menu-item>
                <sl-menu-item value='09'>September</sl-menu-item>
                <sl-menu-item value='10'>October</sl-menu-item>
                <sl-menu-item value='11'>November</sl-menu-item>
                <sl-menu-item value='12'>December</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group">
              <sl-select name='expYear' label='Select Expiry Year' required>
                <sl-menu-item value='21'>2021</sl-menu-item>
                <sl-menu-item value='22'>2022</sl-menu-item>
                <sl-menu-item value='23'>2023</sl-menu-item>
                <sl-menu-item value='24'>2024</sl-menu-item>
                <sl-menu-item value='25'>2025</sl-menu-item>
                <sl-menu-item value='26'>2026</sl-menu-item>
                <sl-menu-item value='27'>2027</sl-menu-item>
                <sl-menu-item value='28'>2028</sl-menu-item>
                <sl-menu-item value='29'>2029</sl-menu-item>
                <sl-menu-item value='30'>2030</sl-menu-item>
                <sl-menu-item value='31'>2031</sl-menu-item>
              </sl-select>
            </div>
            <div class="input-group">
              <sl-input name="cvv" type="text" label="CVV" required></sl-input>
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