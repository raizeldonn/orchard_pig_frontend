import {
  html,
  render
} from 'lit-html'

import App from '../../App'
import {
  gotoRoute,
  anchorRoute
} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class AboutView {
  init() {
    document.title = 'About'
    this.render()
    this.swiperInit()
    Utils.pageIntroAnim()
  }

  swiperInit(){
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      slidesPerView: 1,
      autoplay: { delay: 3000 },
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
    });
    this.render()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render() {
    const template = html `
      <va-app-header title="About Us" products=${localStorage.getItem('cartProducts')}></va-app-header>
      <div class="page-content about-page">  
        
        <!-- Swiper -->
        <div class="swiper-container mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide1"><img src='/images/carousel1.jpg'></div>
            <div class="swiper-slide slide2"><img src='/images/carousel2.jpg'></div>
            <div class="swiper-slide slide3"><img src='/images/carousel3.jpg'></div>
            <div class="swiper-slide slide4"><img src='/images/carousel4.jpg'></div>
            <div class="swiper-slide slide5"><img src='/images/carousel5.jpg'></div>
            <div class="swiper-slide slide5"><img src='/images/carousel6.jpg'></div>
          </div>
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>
          <!-- navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>

        <img class='pigsteps ps1' src='/images/pigsteps.png'>
        <img class='pigsteps ps2' src='/images/pigsteps.png'>
        <img class='pigsteps ps3' src='/images/pigsteps.png'>

        <h4>Crack a cold one n' let us tell you a story</h4>

        <div class='about-us-flex'>
          <div class='info info-left thebeg'>
            <h2>The Beginning</h2>
            <p>It all started just outside Glastonbury when Andrew and Neil were enjoying their home-made cider and hog roast with friends...<br><br>
            Orchard Pig was born out of a shared passion for great food and Old Spots, <br>
            the original orchard pigs, and an accidental discovery that West Country apples make the best tasting cider...  </p>
          </div>
          <img  class='img-right' src='/images/op-founder.png'> 
        </div>
        
        <div class='about-us-flex'>
          <img class='img-left' src='/images/op-sail.png'> 
          <div class='info info-right'>
            <h2>Our Beliefs</h2>
            <p>‘Stay rooted’ is what we say to the modern world. <br><br>
            Appreciating simplicity (and cider), <br><br>
            We like to poke fun at the world and ourselves… and each other. 
            </p>
          </div>
        </div>
        <div class='about-us-flex'>
          <div class='info info-left ourhome'>
            <h2>Our Home</h2>
            <p>Orchard Pig's home in West Bradley Orchards is well and truly rooted in Somerset’s cider-making history, dating back to the 1850s and W.T. Allen’s, award winning Somerset cider.</p>
          </div>
          <img class='img-right' src='/images/op-pub.png'> 
        </div>
        
        <va-app-footer margin="true"></va-app-footer>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new AboutView()