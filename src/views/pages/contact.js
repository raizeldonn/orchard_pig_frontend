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
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe width="450" height="420" id="gmap_canvas" src="https://maps.google.com/maps?q=Glastonbury,%20Somerset&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://123movies-to.org">123movies</a>
            <br>
            <style>.mapouter{position:relative;text-align:right;height:420px;width:450px;}</style>
            <a href="https://www.embedgooglemap.net"></a>
            <style>.gmap_canvas {overflow:hidden;background:none!important;height:420px;width:450px;}</style>
          </div>
        </div>
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