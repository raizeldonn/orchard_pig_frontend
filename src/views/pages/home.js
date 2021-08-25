// lit-html is part of the lit library which helps
// us to build template app elements/html pages in js.
// https://lit-element.polymer-project.org/guide/templates
// https://lit-html.polymer-project.org/guide/styling-templates
import {html, render } from 'lit-html'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import App from './../../App'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import TeamAPI from './../../TeamAPI'
import Utils from './../../Utils'
import Toast from '../../Toast'
import ProductsAPI from './../../ProductsAPI';

class HomeView {
  init(){    
    // console.log('HomeView.init');
    // console.log(localStorage);
    document.title = 'Home'  
    //this.team = null 
    //this.getTeam()
    this.render()
    Utils.pageIntroAnim()
    this.homePageAnim()
    this.animateButton()
    this.products = null;
    //localStorage.removeItem('cartProducts');
    this.getProducts();   

  }

  homePageAnim(){
    // gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})

    const homeTl = gsap.timeline({scrollTrigger: {trigger: ".page-content", start: "top center"}})
    .from('.rooted h1', {y:50, opacity: 0, duration: 1})
    .from('.rooted p', {y:50, opacity: 0, duration: 1},"-=0.5")
    .from('.rooted button', {x:50, opacity: 0,  ease:"Back.easeOut", duration: 0.5}, "+=0.5");

    gsap.timeline({scrollTrigger: {trigger: '.page-content .new-pig h1', start: "center center", scroller: '.page-content'}})
    .from('.new-pig .pink-tilted', {x:-200, transform: "rotate(50deg)", ease:"Back.easeOut", opacity: 0, duration: 1})
    .from('.new-pig .homepg-btn', {y:50, opacity: 0, duration: 1},"-=0.5");

    gsap.timeline({scrollTrigger: {trigger: '.hog', start: "center bottom", scroller: '.page-content'}})
    .from('.pignbottles', {x:200, ease:"Back.easeOut", opacity: 0, duration: 1})
    .from('.hog .homepg-btn', {y:50, opacity: 0, duration: 1},"-=0.5");
  }

 
  async getTeam(){
    try {
      this.team = await TeamAPI.getTeam()
      //***** */
      // console.log(this.team)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  // preload products data on static home page
  async getProducts(){
    try{
      this.products = await ProductsAPI.getProducts()
      // console.log("AllProducts: ",this.products)
      localStorage.setItem('allProducts', JSON.stringify(this.products));
      
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  //bubbly button animation
  //code from https://codepen.io/nourabusoud/pen/ypZzMM
  animateButton = (e) => {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
      gotoRoute('/game')
    },700);

  };


  
  // method from lit library which allows us 
  // to render html from within js to a container //@click=${() => gotoRoute('/game')
  render(){
    const template = html`

      <va-app-header  title="Home" products=${localStorage.getItem('cartProducts')}></va-app-header>

      <div class="page-content" >
      
        <section id="top" class='home-section rooted'>
        <!--<img class="splash" src="images/home-splash-2.png">-->
          <h1>Rooted In Somerset</h1>
          <p>Want to win something pig?</p>
          <button  @click=${this.animateButton}>Spin the wheel to win!</button> 
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
        <img class='pigsteps' src='/images/pigsteps.png'>
          <div class='left'>
            <p>It all started in the noughties, just outside Glastonbury.</p>
            <p>When our founder started dabbling with cider making in his garden shed.</p>
            <button class='homepg-btn' @click=${() => gotoRoute('/about')}>Learn More</button>
          </div>
          <img class='pignbottles' src='/images/pig_n_bottles.png'>
          

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
