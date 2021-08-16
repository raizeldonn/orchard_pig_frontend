import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ContactView {
  init(){
    document.title = 'Contact'    
    this.render()    
    Utils.pageIntroAnim()
  }


  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header products=${localStorage.getItem('cartProducts')}></va-app-header>

      <div class="page-content contact-page">   

        <img class='pigsteps' src='/images/pigsteps.png'>
        <h1>Get In Touch</h1> 

        <div class='flex'>

          <div class='contact-us-form'>
            <sl-form class="contact-shipping" @sl-submit=${this.contactSubmitHandler}>
              <div class='name-input'>
                <div class="input-group">
                  <sl-input name="firstName" type="text" label="First Name" required></sl-input>
                </div>
                <div class="input-group">
                  <sl-input name="lastName" type="text" label="Last Name" required></sl-input>
                </div>
              </div>
              <div class='name-input'>
                <div class="input-group">
                  <sl-input name="email" type="email" label="Email" required></sl-input>
                </div>
                <div class="input-group">
                  <sl-input name="phoneNumber" type="text" label="Phone" required></sl-input>
                </div> 
              </div>
              <div class="input-group">
                <sl-select name='Subject' label='Subject' required>
                  <sl-menu-item value='order'>My Order</sl-menu-item>
                  <sl-menu-item value='shipping'>Shipping</sl-menu-item>
                  <sl-menu-item value='returns'>Returns</sl-menu-item>
                  <sl-menu-item value='drinks'>Drinks</sl-menu-item>
                  <sl-menu-item value='corp'>Corporate Events</sl-menu-item>
                </sl-select>
              </div>
              <div class='input-group'>
                <sl-textarea label="Message" placeholder="Type your message here"></sl-textarea>
              </div>
              <button class="submit-btn" submit>Submit</button>     
            </sl-form>
          </div>

          <div class='flex-column'>

            <div class='right'>
              <div class='contact-info-grid'> 
                <img src='/images/pin-white.png'>
                <p>275 Burnfield Road, Thornliebank</p>
                <img src='/images/phone-white.png'>
                <p>01632 960493</p>
                <img src='/images/email-white.png'>
                <p>oink@orchardpig.co.uk</p>
              </div>
              <!-- <div class='sm-icons'> 
              <a href='https://www.facebook.com/OrchardPig'><img src='/images/facebook-white.png'></a>
              <a href='https://www.instagram.com/theorchardpig/'><img src='/images/instagram-white.png'></a>
              <a href='https://twitter.com/Orchardpig'><img src='/images/twitter-white.png'></a>
              </div> -->
            </div>
            
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe style="height:115%;width:100%;" id="gmap_canvas" src="https://maps.google.com/maps?q=275%20Burnfield%20Road,%20Thornliebank&t=&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
              </div>
            </div>

          </div>
        </div>
        
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ContactView()