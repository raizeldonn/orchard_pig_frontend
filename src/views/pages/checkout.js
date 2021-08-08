import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class CheckoutView {
  init(){
    document.title = 'Checkout'    
    this.render()    
    Utils.pageIntroAnim()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class='checkout-header'>
        <h1>Checkout</h1>
        <img class='nav-logo' src='/images/logo-black.png'>
      </div>

      <div class="page-content checkout">        
        <h2>Shipping Details</h2>
        
        <sl-form class="form-shipping" @sl-submit=${this.shippingSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="phoneNumber" type="text" placeholder="Phone Number" required></sl-input>
            </div>    
            <div class="input-group">
              <sl-input name="address" type="text" placeholder="Address" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="address" type="text" placeholder="Address Line 2 (optional)" required></sl-input>
            </div>       
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
          </sl-form>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new CheckoutView()