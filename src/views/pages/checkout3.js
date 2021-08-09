import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'
import Toast from '../../Toast'

class Checkout3View {
  init(){
    document.title = 'Checkout3'    
    this.render()    
    Utils.pageIntroAnim()
  }

  placeOrderSubmitHandler(e){
    e.preventDefault()    
    const formData = e.detail.formData
    
    //OrderAPI.placeOrder()
    gotoRoute('/')
    Toast.show('Thank you for your order')
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class='checkout-header'>
        <h1>Checkout</h1>
        <img class='nav-logo' src='/images/logo-black.png'>
      </div>

      <div class="page-content checkout3">        
        <h2>Review Order</h2>
        
        <sl-form class="form-shipping" @sl-submit=${this.placeOrderSubmitHandler}>
            <div class="input-group">
              <sl-input name="cardName" type="text" placeholder="Name On Card" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardNumber" type="text" placeholder="Card Number" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardExpiry" type="text" placeholder="Expiry Date" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="cardCvv" type="text" placeholder="CVV" required></sl-input>
            </div>      
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Place Order</sl-button>
          </sl-form>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new Checkout3View()