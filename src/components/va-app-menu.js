// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'

import {anchorRoute, gotoRoute} from './../Router'

customElements.define('va-app-menu', class AppMenu extends LitElement {
    constructor(){
      super()    
    }

  
    static get properties(){
      return {
        visible: {
          type: Boolean
        }
      }
    }

    firstUpdated(){
        super.firstUpdated()
        this.navActiveLinks()    
      }


    render(){    
    return html`
    
    
    <ul>
      <li><a @click="${() => gotoRoute('/')}">Home</a></li>
      <li><a @click="${() => gotoRoute('/products')}">Shop</a></li>
      <li id="menu" ><a @click="${() => gotoRoute('/about')}">About Us</a></li> 
      <li><a @click="${() => gotoRoute('/contact')}">Contact</a></li>  
    </ul>
  
    
    `
    }

})