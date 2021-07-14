import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class AgeConfirmView {
  init(){
    document.title = 'AgeConfirm'    
    this.render()    
    Utils.pageIntroAnim()
  }

  confirmAge()
  {
    localStorage.setItem('over18', true)
    gotoRoute('/game')
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <div class="age-confirm">   
        <div class="img-cont">
          <img class='orchard-img' src="images/age-check.png">
          <img class='logo' src='images/logo-black.png'>
        </div>   
        <h1> Rooted in Somerset</h1>
        <p>You must be over 18 to enter this site</p>
        <div class='center-btn'>
          <button @click=${this.confirmAge.bind(this)}>I am 18 or over</button>
        </div>
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new AgeConfirmView()