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

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'  
    //this.team = null 
    //this.getTeam()
    this.render()  
    Utils.pageIntroAnim()    
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
  
  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`

      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>

      <div class="page-content">
      
        <section class='home-section rooted'>
        <!--<img class="splash" src="images/home-splash-2.png">-->
          <h1>Rooted In Somerset</h1>
        </section>

        <section class='home-section hog' >
          <h1>The cider you won't be able to help but hog</h1>
          <div id="social">
            <a href='https://www.facebook.com/OrchardPig'><i class="fab fa-facebook-square" ></i></a>
            <a href='https://www.instagram.com/theorchardpig/'><i class="fab fa-instagram"></i></a>
            <a href='https://twitter.com/Orchardpig'><i class="fab fa-twitter-square"></i></a>
          </div>
          
          <!-- <sl-icon name='facebook'></sl-icon>
          <sl-icon name='instagram'></sl-icon>
          <sl-icon name='twitter'></sl-icon> -->
        </section>

        <section class='home-section craft-cider'>
          <div class='split-heading'><h1>Craft Cider</h1><h1>Like no Other</h1></div>
          <p>
            West Country bitter cider apples are impossible to beat. 
            We don't hide behind bubbles.
            our gently sparkling cider is like no other.
          </p>
          <img class='pink-tilted' src='/images/pink-tilted.png'>
          <button class='shop-now' @click=${() => gotoRoute('/products')} >Shop Now</button>
        </section>

        <section class='home-section pig-deal'>
          <div class='left'>
          <img src='/images/pig-deal.png'>
          </div>
          <div class='right'>
            <div>
            <h1>So, Whats the Pig deal?</h1>
            <p>
              It all began with a discovery.
            West Country apples make the best cider.
            Ever since we worked that out we have been developing our one of a kind craft cider.
            Vegan friendly, lightly sparkling and downright delicious, your taste buds will thank you.
            </p> </div>
          </div>
        </section>

        <footer>
          <div>
              <h3>Contact</h3>
              <p>275 Burnfield Road, Thornliebank</p>
              <p>01632 960493</p>
              <p>oink@orchardpig.co.uk</p>
          </div>
          <div>
            <img @click="${() => gotoRoute('/')}" class='footer-logo' src='/images/logo-white-cut.png'></a>  
          </div>
          <div>
            <div id="social">
              <a href='https://www.facebook.com/OrchardPig'><i class="fab fa-facebook-square" ></i></a>
              <a href='https://www.instagram.com/theorchardpig/'><i class="fab fa-instagram"></i></a>
              <a href='https://twitter.com/Orchardpig'><i class="fab fa-twitter-square"></i></a>
            </div>
          </div>
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