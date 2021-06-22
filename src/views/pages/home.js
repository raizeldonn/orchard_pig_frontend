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
    this.team = null 
    this.getTeam()
    //this.render()  
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
  // to render html from within js to a container //Token: ${Auth.currentJWT}
  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
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
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()