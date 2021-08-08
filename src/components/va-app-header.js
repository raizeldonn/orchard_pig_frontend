// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import {
  LitElement,
  html,
  css
} from '@polymer/lit-element'

import {
  anchorRoute,
  gotoRoute
} from './../Router'
import Auth from './../Auth'
import App from './../App'


customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor() {
    super()
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.navActiveLinks()
  }

  navActiveLinks() {
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if (navLink.href.slice(-1) == '#') return
      if (navLink.pathname === currentPath) {
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick() {
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }

  checkoutClick() {
    //initialise all the vars needed for a checkout
    gotoRoute('/checkout')
  }
  toggle() {
    const dropdownMenu = this.shadowRoot.querySelector('.app-menu')
    if (dropdownMenu.style.display == "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  }



  render() {
    return html `

    <script>
    
    
    </script>
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
        /*box-shadow: 4px 0px 10px rgba(0,0,0,0.2);*/
        align-items: center;
      }

      .nav-logo{
        width: 9%;
        min-width: 70px;
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

      .app-menu {
        display: none;
        font-family: var(--heading-font-family);
        margin-top: 11px;
        border: none;
        width: 100%;
      }
      
      .app-menu a {
        display: block;
        width: 100%;
        padding: .8em;
        text-decoration: none;
        color: black;
        font-family: var(--heading-font-family);
        text-transform: uppercase;
        cursor: pointer;
      }
      .app-menu li {
        list-style-type: none;
        border: 0px;
        margin-bottom: 0px;
        text-align: center;
        padding-left: 0px;
        background-color: rgba(255,255,255,1.0);
      }

      .app-menu ul {
        margin: 0px;
        padding: 0px;
        
      }

      .cart-logo{
        width: 3%;
        min-width: 30px;
        min-height: 30px;
        cursor: pointer;
        position: absolute;
        right: 2%;
        top: 6px;
      }
      #hamburger {
        margin: 8px 5px 0px 10px;
      }
      button {
        background-color: white;
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
        
        .app-header {
          display: block;
          height: var(--app-header-height-mobile);
        }
        .app-top-nav {
          display: none;
          width: 100%;
        }
       
        .app-top-nav li {
          display: block;
          width: 100%;
        }
      }

      @media all and (min-width: 769px){       
        
        .app-top-nav {
          display: block;
        }
        .app-top-nav ul {
          list-style-type : none;
        }
        .app-top-nav li {
          float: left;
          width: 20%;
        }
        .app-menu {
          display: none;
          padding: none;
        }
        #hamburger {
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
        <ul>
          <li><a @click="${() => gotoRoute('/')}">Home</a></li>
          <li><a @click="${() => gotoRoute('/products')}">Shop</a></li>
          <li><a @click="${() => gotoRoute('/about')}">About Us</a></li> 
          <li><a @click="${() => gotoRoute('/contact')}">Contact</a></li>  
        </ul>
      </nav>
      
      <img @click="${() => gotoRoute('/')}" class='nav-logo' src='/images/logo-black.png'>
      

      <!-- dropdown menu -->
      <!-- Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> -->
      <img @click="${this.toggle}" id="hamburger" alt="menu" width="28px" height="28px" src='/images/menu.png'>
      
      <div id="drop-menu" class="app-menu">
      <ul>
        <li><a @click="${() => gotoRoute('/')}">Home</a></li>
        <li><a @click="${() => gotoRoute('/products')}">Shop</a></li>
        <li><a @click="${() => gotoRoute('/about')}">About</a></li>
        <li><a @click="${() => gotoRoute('/contact')}">Contact</a></li>
      </ul>
      </div>
    
      <nav class="basket right">
        <!-- change to apples2 or apples to see other options -->
        <img @click="${this.hamburgerClick}" class='cart-logo' src='/images/apples3.png' alt='apple-basket'>
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