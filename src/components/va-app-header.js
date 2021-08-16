// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'
import { anchorRoute, gotoRoute } from './../Router'
import Auth from './../Auth'
import App from './../App'
import CartAPI from './../CartAPI';

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor() {
    super()
  }

  static get properties() {
    return {
      products: {
        type: Object
      },
      allProducts: {
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
    gotoRoute('/checkout1')
  }
  toggle() {
    const dropdownMenu = this.shadowRoot.querySelector('.app-menu');
    const hamburger = this.shadowRoot.querySelector('#hamburger');
    const close = this.shadowRoot.querySelector('#close');

    if (dropdownMenu.style.display == "block") {
      dropdownMenu.style.display = "none";
      hamburger.style.display = "block";
      close.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
      hamburger.style.display = "none";
      close.style.display = "block";
    }
  }

  hamburgerMenuClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
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
        left: 40%;
        cursor: pointer;
        display: block;
      }

      .app-top-nav{
        width: 40%;
      }
      
      .app-top-nav a {
        display: inline-block;
        padding: .8em .6em;
        text-decoration: none;
        color: black;
        font-family: var(--heading-font-family);
        text-transform: uppercase;
        cursor: pointer;
      }

      .app-menu {
        display: none;
        position: absolute;
        font-family: var(--heading-font-family);
        margin-top: 14px;
        border: none;
        width: 100%;
<<<<<<< HEAD
<<<<<<< HEAD
        z-index: 110
=======
        z-index: 1000;
        
>>>>>>> assignment3
=======
        z-index: 1000;
        
>>>>>>> assignment3
        
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

      .app-menu .nav-fp {
        visibility: hidden;
        z-index: -100;
        margin-left: auto;
        margin-right: auto;
      }
      .app-menu a:hover .nav-fp  {
        visibility: visible;
      }
      

      .app-menu li {
        list-style-type: none;
        border: 0px;
        margin-bottom: 0px;
        text-align: center;
        padding-left: 0px;
        background-color: rgba(255,255,255,1.0);
        background-color: var(--light-blue);
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
      #close {
        display: none;
        margin: 8px 5px 0px 10px;
        
      }
      button {
        background-color: white;
      }


      /* active nav links */
      .app-top-nav a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-header {
          display: block;
          height: var(--app-header-height);
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
        
        #hamburger {
          visibility: hidden;
          position: absolute;
          left: 10px;
          top: 8px;
        }
        #close {
          visibility: hidden;
          position: absolute;
          left: 10px;
          top: 8px;
        }
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
          visibility: hidden;
          display: none;
          padding: none;
          
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

      <nav class="basket right">
        <!-- change to apples2 or apples to see other options -->
        <img @click="${this.hamburgerClick}" class='cart-logo' src='/images/apples3.png' alt='apple-basket'>
      </nav>
      

      <!-- dropdown menu -->
      
      <!-- Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> -->
      <img @click="${this.toggle}" id="hamburger" alt="menu" width="28px" height="28px" src='/images/menu.png'>
      <!-- Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> -->
      <img @click="${this.toggle}" id="close" alt="close" width="28px" height="28px" src='/images/close.png'>
      
      <div id="drop-menu" class="app-menu">
      <ul>
        <li><a @click="${() => gotoRoute('/')}">Home<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
        <li><a @click="${() => gotoRoute('/products')}">Shop<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
        <li><a @click="${() => gotoRoute('/about')}">About<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
        <li><a @click="${() => gotoRoute('/contact')}">Contact<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
        <li><a @click="${() => gotoRoute('/game')}" style="color: red;">Play - Find the Pig!<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
      </ul>
      </div>
    
      

    </header>





    <!--CART - styles----------------------->

    <style>
      .app-side-menu{
        font-family: var(--base-font-family);
      }
      h1{
        font-family: var(--heading-font-family);
        padding: 0;
        margin: 0;
        padding-bottom: 30px;
      }
      sl-drawer.app-side-menu::part(panel){
        background-color: var(--light-blue);
        --header-spacing: 0;
      }
      sl-drawer.app-side-menu::part(title){
        line-height: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
      .app-side-menu .cart-product{
          display: grid;
          width: 70%;
          grid-template-columns: repeat(2, auto);
      }
      .cart-img{
        height: 20vh;
        margin-bottom: 30px;
      }
      .product-name{
        font-weight: bold;
      }
      .checkout-btn {
        color: white;
        background-color: var(--dark-blue);
        text-transform: uppercase;
        border: none;
        font-family: var(--base-font-family);
        cursor: pointer;
        padding: 2% 4%;
        border-radius: 8px;
        font-size: 20px;
        width: 100%;
      }


    </style>

    <!--CART----------------------->
    <sl-drawer class="app-side-menu">
    ${this.products == null ? html `

      <p>your basket is empty</p>

    ` : html `

    <h1>Your Basket</h1>
      ${this.products.map(product => html`
        <div class='cart-product'>
          <img class='cart-img' src='/images/${product.item}.png' alt='${product.name}'>
          <div class='cart-product-info'>
            <p class='product-name'>${product.name}</p> 
            <p>Quantity: ${product.quantity}</p>
            <!-- <p>&pound;${product.price.$numberDecimal}</p> -->
            <p>&pound;${product.price}</p>
          </div>
        </div>
      `)}

      <h3>Subtotal: &pound;${CartAPI.getTotal()}.00</h3>
      <button class='checkout-btn' @click="${this.checkoutClick}">Checkout</button>
    `}
    
    </sl-drawer>
    `
  }

  // <div id="drop-menu" class="app-menu">
  // <ul>
  //   <li><a @click="${() => gotoRoute('/')}">Home<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
  //   <li><a @click="${() => gotoRoute('/products')}">Shop<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
  //   <li><a @click="${() => gotoRoute('/about')}">About<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
  //   <li><a @click="${() => gotoRoute('/contact')}">Contact<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
  //   <li><a @click="${() => gotoRoute('/game')}" style="color: red;">Play - Find the Pig!<img class='nav-fp' src='/images/navbar-pigstep.png'></a></li>
  // </ul>
  // </div>


})