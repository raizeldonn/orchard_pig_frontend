import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class AboutView {
  init(){
    document.title = 'About'    
    this.render()    
    Utils.pageIntroAnim()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header title="About" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content about-page">  
      <!-- <img class='prints' src='/images/steps-transparent.png'>   -->
        
        <div class='about-carousel'> 
          <img class='carousel-img' src='/images/image1.jpeg'>  
        </div>
        <h4>Crack a cold one n' let us tell you a story</h4>

        <div class='about-us-flex'>
          <div class='info info-left'>
            <h2>It all started</h2>
            <p>just outside Glastonbury when Andrew and Neil were enjoying their home-made cider and hog roast with friends...<br><br>
            Orchard Pig was born out of a shared passion for great food and Old Spots, <br>
            the original orchard pigs, and an accidental discovery that West Country apples make the best tasting cider...  </p>
          </div>
          <img  class='img-right' src='/images/op-founder.png'> 
        </div>
        <div class='about-us-flex'>
          <img class='img-left' src='/images/op-sail.png'> 
          <div class='info info-right'>
            <h2>'Stay rooted'</h2>
            <p>‘Stay rooted’ is what we say to the modern world. <br><br>
            Appreciating simplicity (and cider), <br><br>
            We like to poke fun at the world and ourselves… and each other. 
            </p>
          </div>
        </div>
        <div class='about-us-flex'>
          <div class='info info-left'>
            <h2>Orchard Pig's</h2>
            <p>home in West Bradley Orchards is well and truly rooted in Somerset’s cider-making history, dating back to the 1850s and W.T. Allen’s, award winning Somerset cider.</p>
          </div>
          <img class='img-right' src='/images/op-pub.png'> 
        </div>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new AboutView()