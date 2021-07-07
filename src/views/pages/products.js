import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ProductsView {
  init(){
    document.title = 'Products'    
    this.render()    
    Utils.pageIntroAnim()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header title="Products" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Page title</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ProductsView()