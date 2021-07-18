import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import ProductsAPI from './../../ProductsAPI';
class ProductsView {
  init(){
    document.title = 'Products'    
    this.products = null;
    this.productDialog = null
    this.render()    
    Utils.pageIntroAnim()
    this.getProducts()
  }

  async getProducts(){
    try{
      this.products = await ProductsAPI.getProducts()
      console.log(this.products)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  //when user selects 'more info' create & show a more info dialog
  moreInfoHandler(product){
    //create cleaner dialog
    this.productDialog = document.createElement('sl-dialog')
    this.productDialog.className = 'product-dialog'
    //add content
    const dialogContent = html`

      <style>
        .product-dialog{
          --width: 90vw;
        }
        img.pp-img{
          height: 80vh;
        }
        .product-dialog::part(body){
          display: grid;
        }
        .pp-left h2{
          font-size: 36px;
          transform: translateY(-1000%) translateX(65%);
        }
        .pp-left h3{
          font-size: 32px;
          transform: translateY(-1200%) translateX(75%);
        }
        .pp-right{
          grid-column: 2/3;
          margin-left: 20%;
        }
        .pp-boxes{
          display: flex;
          width: 80%;
        }
        .pp-boxes p{
          border: 0.5px solid black;
          width: 50%;
          padding: 1em;
        }
        #desc{
          font-weight: 300;
        }
        #dietary{
          font-style: italic;
        }
        #share{
          font-weight: bold;
        }
      </style>

        <div class='pp-left'>
          <img class='pp-img' src='${App.apiBase}/${product.image}' alt='${product.name}'>
          <h2>${product.shortName}</h2>
          <h3>$${product.price.$numberDecimal}</h3>
        </div>
        <div class='pp-right'>
          <div class='pp-boxes'>
            <p>4.5% ABV</p>
            <p>${product.packSize}x${product.qty}ml</p>
          </div>
          <p>flavour: ${product.flavour}</p>
          <p id='desc'>${product.description}</p>
          <p id='dietary'>${product.dietary}</p>
          ${product.allergen? html` <p>allergen: ${product.allergen}</p>` : html``}
          <button>Add to cart</button>
          <p id='share'>Share this product</p>
        </div>
    `
    render(dialogContent, this.productDialog)
    //append to document.body
    document.body.append(this.productDialog)
    //show the dialog
    this.productDialog.show()
    //on hide, delete the dialog
    this.productDialog.addEventListener('sl-after-hide', ()=>{
      this.productDialog.remove()
    })
  }

  addToCart(product){
    console.log("added to cart: " + product.name);
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header title="Products" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content products">        
        <div class='products-grid'>
            ${this.products == null ? html `
              <sl-spinner></sl-spinner>
            ` : html `
            <!--map is very similar to for each-->
              ${this.products.map(product => html`
                <div class='product-card'>  
                  <img @click=${() => this.moreInfoHandler(product)} src='${App.apiBase}/${product.image}' alt='${product.name}'>
                  <h2>${product.shortName}</h2>
                  <h3>$${product.price.$numberDecimal}</h3>
                  <button @click=${() => this.addToCart(product)}>Add To Cart</button>
                </div>
              `)}
            `}
          </div>
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ProductsView()