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
    localStorage.removeItem('cartProducts');
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

      <va-app-header products=${localStorage.getItem('cartProducts')}></va-app-header>

      <div class="page-content">
      
        <section class='home-section rooted'>
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

        <footer>
          <div class='footer-grid'>
            <div >
              <h2>Products</h2>
              <ul>
                <li>Reveller</li>
                <li>Truffler</li>
                <li>Hogfather</li>
                <li>Pink</li>
                <li>Charmer</li>
              </ul>
            </div>
            <div class='help'>
              <h2>Help</h2>
              <ul>
                <li>Delivery and Returns</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div class='contact-us'>
              <h2>Contact Us</h2>
              <ul>
                <li>275 Burnfield Road, Thornliebank</li>
                <li>01632 960493</li>
                <li>oink@orchardpig.co.uk</li>
              </ul>
            </div>
            <div class='follow-us'>
              <h2>Follow Us</h2>
              <div id="social">
              <a href='https://www.facebook.com/OrchardPig'><i class="fab fa-facebook-square" ></i></a>
              <a href='https://www.instagram.com/theorchardpig/'><i class="fab fa-instagram"></i></a>
              <a href='https://twitter.com/Orchardpig'><i class="fab fa-twitter-square"></i></a>
            </div>
            </div>
          </div>

          <img @click="${() => gotoRoute('/')}" class='footer-logo' src='/images/logo-white-cut.png'></a>  

          <hr/>
          <p id='disclaimer'>
            This website has been created as part of an assignment in an approved course of study for Curtin University 
            and contains copyright material not created by the author. 
            All copyright material used remains copyright of the respective owners 
            and has been used here pursuant to Section 40 of the Copyright Act 1968 (Commonwealth of Australia). 
            No part of this work may be reproduced without consent of the original copyright owners. 
            See code comments for references.
          </p>
        </footer>

      
      </div>

      
      
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()

/*<div class="page-content">
<h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>
<h1>Team-Linen:</h1>
<h2>${this.team[0].first_name}${this.team[0].last_name}${this.team[0].role}</h2>
<h2>${this.team[1].first_name}${this.team[1].last_name}${this.team[1].role}</h2>
<h2>${this.team[2].first_name}${this.team[2].last_name}${this.team[2].role}</h2>
<h2>${this.team[3].first_name}${this.team[3].last_name}${this.team[3].role}</h2>
<h2>${this.team[4].first_name}${this.team[4].last_name}${this.team[4].role}</h2>
<h3>Button example:</h3>
<sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
<p>&nbsp;</p>
<h3>Link example</h3>
<a href="/profile" @click=${anchorRoute}>View Profile</a>

</div>*/