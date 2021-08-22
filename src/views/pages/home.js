// lit-html is part of the lit library which helps
// us to build template app elements/html pages in js.
// https://lit-element.polymer-project.org/guide/templates
// https://lit-html.polymer-project.org/guide/styling-templates
import {html, render } from 'lit-html'

import App from './../../App'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import TeamAPI from './../../TeamAPI'
import Utils from './../../Utils'
import Toast from '../../Toast'
import ProductsAPI from './../../ProductsAPI';

class HomeView {
  init(){    
    console.log('HomeView.init');
    console.log(localStorage);
    document.title = 'Home'  
    //this.team = null 
    //this.getTeam()
    this.render()
    Utils.pageIntroAnim()
    this.products = null;
    //localStorage.removeItem('cartProducts');
    this.getProducts();   

  }
 
  async getTeam(){
    try {
      this.team = await TeamAPI.getTeam()
      //***** */
      console.log(this.team)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  // preload products data on static home page
  async getProducts(){
    try{
      this.products = await ProductsAPI.getProducts()
      console.log("AllProducts: ",this.products)
      localStorage.setItem('allProducts', JSON.stringify(this.products));
      
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`

      <va-app-header  title="Home" products=${localStorage.getItem('cartProducts')}></va-app-header>

      <div class="page-content" >
      
        <section id="top" class='home-section rooted'>
        <!--<img class="splash" src="images/home-splash-2.png">-->
          <h1>Rooted In Somerset</h1>
          <p>Want to earn a discount for your next order?</p>
          <button  @click=${() => gotoRoute('/game')}>Find the pig to win!</button>
        </section>

        <section class='home-section new-pig'>
          <img class='pink-tilted' src='/images/home-pinks.png'>
          <div>
            <h1>There's a new pig in town</h1>
            <h3>and its....delicious!</h3>
            <p>Wanna try it?</p>
            <button class='homepg-btn' @click=${() => gotoRoute('/products')}>Click Here</button>
          </div>
          <img class='pigsteps' src='/images/pigsteps.png'>
          
        </section>

        <section class='home-section hog' >
          <div class='left'>
            <p>It all started in the noughties, just outside Glastonbury.</p>
            <p>When our founder started dabbling with cider making in his garden shed.</p>
            <button class='homepg-btn' @click=${() => gotoRoute('/about')}>Learn More</button>
          </div>
          <img class='pignbottles' src='/images/pig_n_bottles.png'>
          <img class='pigsteps' src='/images/pigsteps.png'>

        </section>

    	  <va-app-footer margin="false"></va-app-footer>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()


/*  
          <div class="linktop" style="width:80px; height:80px; z-index:200; position:absolute; right: 10px; bottom: 50px;">
          <!-- this anchor brings the user back to the top of page -->
          <a href="#top" title="Return to Top" target="_top"><img src="/images/arrow.png" width="70px" height="70px"/></a>
          </div>

*/
