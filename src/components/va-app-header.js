// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'

import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }

  checkoutClick(){
    //initialise all the vars needed for a checkout
    gotoRoute('/checkout')
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: var(--brand-color);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
      }

      /* .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #fff;
      } */

      /* .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      } */
      
      .hamburger-btn::part(base) {
        color: black;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }
      
      .right{
          position: absolute;
          right: 2%;
        }

      .nav-logo{
        width: 15%;
        transform: translateY(15%) translateX(70%);
        cursor: pointer;
        display: block;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: black;
      }
      
      /*items in the cart menu */
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>

    <header class="app-header">
      <nav class="app-top-nav">
          <a href="/" @click="${() => gotoRoute('/')}">Home</a>
          <a href="/products" @click="${() => gotoRoute('/products')}">Shop</a>  
          <a href="/game" @click="${() => gotoRoute('/game')}">Win</a>  
          <a href="/about" @click="${() => gotoRoute('/about')}">About Us</a>  
          <a href="/contact" @click="${() => gotoRoute('/contact')}">Contact Us</a>  
      </nav>
      <nav class="app-top-nav right">
        <a @click="${this.hamburgerClick}">Cart</a>
      </nav>
      <img @click="${() => gotoRoute('/')}" class='nav-logo' src='/images/logo-black.png'></a>     
    </header>

    <sl-drawer class="app-side-menu">
      <h1>Your Cart</h1>
      <p>Product Name</p> 
      <p>Product Amount</p>
      <p>$ Product Price</p>
      <h3>Total</h3>
      <sl-button @click="${this.checkoutClick}">Checkout</sl-button>
    </sl-drawer>
    `
  }
  
})
