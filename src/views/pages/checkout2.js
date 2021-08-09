import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'

class Checkout2View {
  init(){
    document.title = 'Checkout2'    
    this.render()    
    Utils.pageIntroAnim()
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

      <div class="page-content checkout2">        
        <h2>Payment Details</h2>
        
        <sl-form class="form-shipping" @sl-submit=${this.paymentSubmitHandler}>
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
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Review Order</sl-button>
          </sl-form>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new Checkout2View()