// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'
import { anchorRoute, gotoRoute } from './../Router'
import Auth from './../Auth'
import App from './../App'
import CartAPI from './../CartAPI';
import { refresh } from 'aos';
import Toast from '../Toast';

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
      },
      title: {
        type: String
      }
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.navActiveLinks()
    this.updateQty()
  }

  navActiveLinks() {
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a')
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
    gotoRoute(pathname)
  }

  updateQty(){
    const qtyInputs = this.shadowRoot.querySelectorAll('sl-input.qty-input');
    qtyInputs.forEach(qty =>{
      qty.addEventListener('sl-blur', event => {
        // console.log("qty updated")
        let product = CartAPI.updateQty(event.target.name, event.target.value)
        let totalCosts = this.shadowRoot.querySelectorAll('.total-cost')
        totalCosts.forEach( totalCost => {
          if (totalCost.id == event.target.name)
          {
            totalCost.innerHTML = '&pound;' + product.totalCost
          }
        })
        this.shadowRoot.querySelector('.total').innerHTML = "Subtotal: &pound;" + CartAPI.getTotal() + ".00"
      });
    })
  }

  emptyCart() {
    CartAPI.emptyCart()
    this.products = null;
    gotoRoute('/products');
    Toast.show("Your Cart has been emptied")
  }

  remove(name, sku){
    CartAPI.removeItem(name)
    var productDiv = this.shadowRoot.querySelector("#" + sku);
    // console.log(productDiv)
    productDiv.remove();
    this.shadowRoot.querySelector('.total').innerHTML = "Subtotal: &pound;" + CartAPI.getTotal() + ".00"
    Toast.show(name + " has been removed from your cart")
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
        left: 42%;
        cursor: pointer;
        display: block;
      }

      .nav-logo:hover{
        animation-name: spin;
        animation-duration: 2s;
        animation-iteration-count: infinite;
      }
      @keyframes spin {
        from {transform: rotate(0deg);}
        to {transform : rotate(360deg);}
      }
      
      .nav-logo2{
        width: 9%;
        min-width: 70px;
        position: absolute;
        left: 42%;
        cursor: pointer;
        display: block;
      }
      .app-top-nav{
        width: 40%;
        display: flex;
      }
      
      .app-top-nav a {
        display: inline-block;
        padding: .6em;
        padding-bottom: .8em;
        padding-top: 0;
        text-decoration: none;
        color: black;
        font-family: var(--heading-font-family);
        text-transform: uppercase;
        cursor: pointer;
      }
      .app-top-nav li:hover {
        background-image: url('/images/navbar-pigstep.png');
        color: black;
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 30px;
      }
      .app-top-nav li a:visited{
        color: black;
        background-image: url('/images/navbar-pigstep.png');
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 30px;
      }
      .app-top-nav li{
        text-align: center;
      }

      .header-title {
        color: var(--med-blue);
        /* color: #AACOCF; */
        font-family: Rockwell, serif;
        position: absolute;
        right: 20%;
      }

      .app-menu {
        display: none;
        position: absolute;
        font-family: var(--heading-font-family);
        margin-top: 14px;
        border: none;
        width: 100%;
        z-index: 1000;
        
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
      .app-menu li:hover {
        background-image: url('/images/navbar-pigstep.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50px;
      }
   

      .app-menu li {
        list-style-type: none;
        border: 0px;
        min-height: 70px;
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
      .header-cart-qty{
        color: var(--med-blue);
        position: absolute;
        right: 1%;
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
        background-image: url('/images/navbar-pigstep.png');
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 30px;
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
        .header-title {
          display: none;
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

      <nav class="app-top-nav">
        <ul>
          <li class="nav-trotter" ><a href="/" @click="${this.menuClick}">Home</a></li>
          <li class="nav-trotter" ><a href="/products" @click="${this.menuClick}">Shop</a></li>
          <li class="nav-trotter" ><a href="/about" @click="${this.menuClick}">About</a></li> 
          <li class="nav-trotter" ><a href="/contact" @click="${this.menuClick}">Contact</a></li>  
        </ul>
      </nav>
      
      <video allow="autoplay" muted @click="${() => gotoRoute('/')}" class='nav-logo2' width="70" height="50" autoplay playsinline onmouseover="this.play()" onmouseout="this.pause();">
        <source src="/images/logo-run.mp4" type="video/mp4">
        <img @click="${() => gotoRoute('/')}" class='nav-logo' src='/images/logo-black.png'>
      </video>
      <!-- <div class="header-title">
        ${this.title ? html`
          <h2>${this.title}</h2>
        `: html``}
        <slot></slot>
      </div> -->
    
      <nav class="basket right">
        <!-- change to apples2 or apples to see other options -->
        <img @click="${this.hamburgerClick}" class='cart-logo' src='/images/apples3.png' alt='apple-basket'>
        <div class="header-cart-qty">
        ${this.products ? html`
          <h5>${this.products.length}</h5>
        `: html`<h5>0</h5>`}
        <slot></slot>
      </div>
     
      
      </nav>
      

      <!-- dropdown menu -->
      
      <!-- Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> -->
      <img @click="${this.toggle}" id="hamburger" alt="menu" width="28px" height="28px" src='/images/menu.png'>
      <!-- Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> -->
      <img @click="${this.toggle}" id="close" alt="close" width="28px" height="28px" src='/images/close.png'>
      
      <div id="drop-menu" class="app-menu">
      <ul>
        <li><a href="/" @click="${() => gotoRoute('/')}">Home</a></li>
        <li><a href="/products" @click="${() => gotoRoute('/products')}">Shop</a></li>
        <li><a href="/about" @click="${() => gotoRoute('/about')}">About</a></li>
        <li><a href="/contact" @click="${() => gotoRoute('/contact')}">Contact</a></li>
        <li><a href="/game" @click="${() => gotoRoute('/game')}" style="color: red;">Play - Find the Pig!</a></li>
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
          margin-bottom: 6%;
      }
      .cart-img{
        height: 20vh;
        margin-bottom: 30px;
        margin-right: 10px;
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
      .qty{
        display: flex;
      }
      .input-group{
          width: 30%;
          margin-left: 5%;
      }

      .empty-cart-btn {
        position: relative;
        float: right;
        margin-bottom: 20px;
        color: white;
        background-color: #F4372D;
        text-transform: uppercase;
        border: none;
        font-family: var(--base-font-family);
        cursor: pointer;
        padding: 2% 4%;
        border-radius: 8px;
        font-size: 10px;
        width: 30%;
      }

      .remove-btn{
        cursor: pointer;
        color: grey;
        display: inline;
        font-size: 14px;
        padding-top: 6%;
      }
      .remove-btn:hover{
        color: red;
      }
      p{
        margin: 3% 0;
      }


    </style>

    <!--CART----------------------->
    <sl-drawer class="app-side-menu">
    ${this.products == null ? html `

      <p>your basket is empty</p>

    ` : html `

    <h1>Your Basket</h1>
      ${this.products.map(product => html`
        <div class='cart-product' id="${product.sku}">
          <img class='cart-img' src='/images/${product.item}.png' alt='${product.name}'>
          <div class='cart-product-info'>
            <p class='product-name'>${product.name}</p> 

            <div class='qty'> 
              <p>Quantity:</p>
              <div class="input-group">
                <sl-input class='qty-input' name='${product.name}' min='1' size='small' type='number' value='${product.quantity}'></sl-input>
              </div>
            </div>

            <p class='total-cost' id='${product.name}'>&pound;${product.totalCost}</p>
            <p class='remove-btn' @click="${() => this.remove(product.name, product.sku)}">remove item</p>
          </div>
        </div>
      `)}

      <h3 class='total'>Subtotal: &pound;${CartAPI.getTotal()}.00</h3>
      <button class='empty-cart-btn' @click="${this.emptyCart}">Empty Cart</button>
      <button class='checkout-btn' @click="${this.checkoutClick}">Checkout</button>
    `}
    
    </sl-drawer>
    `
  }


})