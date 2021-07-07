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
      <va-app-header title="Contact" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Contact Us</h1>
        <p>google maps integration</p>
        <p>social media links</p>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ContactView()