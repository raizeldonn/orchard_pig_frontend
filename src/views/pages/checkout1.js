import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import OrderAPI from '../../OrderAPI'

class Checkout1View {
  init(){
    document.title = 'Checkout1'    
    this.render()    
    Utils.pageIntroAnim()
  }

  shippingSubmitHandler(e){
    e.preventDefault()    
    const formData = e.detail.formData
    
    OrderAPI.shippingInfo(formData)
    gotoRoute('/checkout2')
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
              <sl-input name="address" type="text" placeholder="Address Line 2 (optional)"></sl-input>
            </div> 
            <div class="input-group">
              <sl-select name='shipping' placeholder='Select a shipping option' required>
                <sl-menu-item value='1'>Standard Shipping $6</sl-menu-item>
                <sl-menu-item value='2'>Express Shipping $12</sl-menu-item>\
              </sl-select>
            </div>       
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Payment Details</sl-button>
          </sl-form>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new Checkout1View()