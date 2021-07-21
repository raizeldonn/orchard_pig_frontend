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
      
      .right{
          
        }

      .nav-logo{
        width: 9%;
        position: absolute;
        left: 45%;
        cursor: pointer;
        display: block;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: black;
        font-family: var(--heading-font-family);
        text-transform: uppercase;
        cursor: pointer;
      }

      .cart-logo{
        width: 3%;
        cursor: pointer;
        position: absolute;
        right: 2%;
        top: 6px;
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
      <!-- <div class="hover-footprints">
        <img class='nav-fp' src='/images/logo-black.png'>
        <img class='nav-fp' src='/images/logo-black.png'>
        <img class='nav-fp' src='/images/logo-black.png'>
        <img class='nav-fp' src='/images/logo-black.png'>
        <img class='nav-fp' src='/images/logo-black.png'>
      </div> -->
      <nav class="app-top-nav">
          <a @click="${() => gotoRoute('/')}">Home</a>
          <a @click="${() => gotoRoute('/products')}">Shop</a>  
          <a @click="${() => gotoRoute('/about')}">About Us</a>  
          <a @click="${() => gotoRoute('/contact')}">Contact</a> 
          <a @click="${() => gotoRoute('/game')}" style="color: Red; transform: scale(1.2);">Win</a>   
      </nav>
        <img @click="${() => gotoRoute('/')}" class='nav-logo' src='/images/logo-black.png'>
      <nav class="app-top-nav right">
        <img @click="${this.hamburgerClick}" class='cart-logo' src='/images/apples-black.png' alt='apple-basket'>
      </nav>
          
    </header>

    <!--CART----------------------->
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
