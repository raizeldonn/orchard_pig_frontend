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
      <va-app-header title="AgeConfirm" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <!-- background image -->
        <!-- logo -->
        <h1> Rooted in Somerset</h1>
        <p>You must be over 18 to enter this site</p>
        <sl-button @click=${this.confirmAge.bind(this)}>I am 18 or over</sl-button>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new AgeConfirmView()