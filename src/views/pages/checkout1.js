import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'
import CartAPI from '../../CartAPI'
import Toast from '../../Toast'

class Checkout1View {
  init(){
    document.title = 'Checkout1'   
    this.products = null
    this.render()  
    this.getProducts()  
    Utils.pageIntroAnim()
  }

  shippingSubmitHandler(e){
    e.preventDefault()    
    const formData = e.detail.formData
    
    OrderAPI.shippingInfo(formData)
    gotoRoute('/checkout2')
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

  continueShopping(){
    gotoRoute('/products')
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class='checkout-header'>
        <h1>Checkout</h1>
        <img class='nav-logo' src='/images/logo-black.png'>
      </div>

      <div class="page-content checkout checkout1"> 
        
      <div class='left'>
        <h2>Shipping Details</h2>
        <sl-form class="form-shipping" @sl-submit=${this.shippingSubmitHandler}>
            <div class='name-input'>
              <div class="input-group">
                <sl-input name="firstName" type="text" label="First Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input id="right" name="lastName" type="text" label="Last Name" required></sl-input>
              </div>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" label="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="phoneNumber" type="text" label="Phone Number" required></sl-input>
            </div>    
            <div class="input-group">
              <sl-input name="address" type="text" label="Address" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="address" type="text" label="Address Line 2 (optional)"></sl-input>
            </div> 
            <div class="input-group">
              <sl-select name='shipping' label='Select a shipping option' required>
                <sl-menu-item value='1'>Standard Shipping $6</sl-menu-item>
                <sl-menu-item value='2'>Express Shipping $12</sl-menu-item>\
              </sl-select>
            </div>       
            <button class="checkout-btn" submit">Payment Details</button>
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


export default new Checkout1View()