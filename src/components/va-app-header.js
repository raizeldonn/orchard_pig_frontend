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



  render() {
    return html `

    <script>
    container = document.querySelector('.app-header');
    dropdown = container.querySelector('sl-dropdown');
  
    dropdown.addEventListener('sl-select', event => {
      selectedItem = event.detail.item;
      console.log(selectedItem.value);
    });
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

      .app-menu {
        font-family: var(--heading-font-family);
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
        border: 1px solid black;
        padding-left: 40%;
        background-color: rgba(255,255,255,0.8);
        opca
        
      }
      .menu-items {
        font-family: serif;
        text-transform: uppercase;
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
        
        .app-header {
          display: block;
          height: var(--app-header-height-mobile);
        }
        .app-top-nav {
          display: none;
          width: 100%;
        }
        .app-menu {
          display: block;
          margin-top: 5px;
          border: none;
          width: 100%;
        }
        .app-mobile-nav ul {
          padding: 0px;
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
          padding none;
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
      <sl-dropdown style="display:none" class="hamburger" placement="top-start">
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
        <sl-button slot="trigger"><img alt="menu" width="30px" height="30px" src='/images/menu.png'></sl-button>
        <sl-menu>
          <sl-menu-item value="/" class="menu-items">Home</sl-menu-item>
          <sl-menu-item value="/products" class="menu-items">Shop</sl-menu-item>
          <sl-menu-item value="/about" class="menu-items">About</sl-menu-item>
          <sl-menu-divider value="/contact" class="menu-items"></sl-menu-divider>
          <sl-menu-item class="menu-items">Contact</sl-menu-item>
        </sl-menu>
      </sl-dropdown>
      

      <div class="app-menu"> 
      <button onclick="myFunction()" class="app-menu"><img alt="menu" width="30px" height="30px" src='/images/menu.png'</button>
      <div id="myDropdown" class="app-menu">
      <ul>
        <li><a @click="${() => gotoRoute('/')}">Home</a></li>
        <li><a @click="${() => gotoRoute('/products')}">Shop</a></li>
        <li><a @click="${() => gotoRoute('/about')}">About</a></li>
        <li><a @click="${() => gotoRoute('/contact')}">Contact</a></li>
      </ul>
      </div>
    </div>
      <nav class="app-top-nav right">
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