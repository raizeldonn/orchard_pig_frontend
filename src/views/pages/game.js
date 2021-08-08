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
      <va-app-header products=${localStorage.getItem('cartProducts')}></va-app-header>
      <div class="page-content">        
        <h1>Pig Game</h1>
        <p>Play to win</p>
        <p>find all 5 hidden pigs and get a surprise!</p>
        <h1>Ok!</h1>
        <a href="/" @click=${anchorRoute}>No thanks, I'm good</a>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ProductsView()