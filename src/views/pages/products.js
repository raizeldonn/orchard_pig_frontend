import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import ProductsAPI from './../../ProductsAPI';
import CartAPI from './../../CartAPI';

class ProductsView {
  init(){
    document.title = 'Products'    
    this.products = null;
    this.productDialog = null
    this.render()    
    Utils.pageIntroAnim()

    if (localStorage.getItem('allProducts')){
    this.products = JSON.parse(localStorage.getItem('allProducts'));
    } else {
      this.getProducts();
    }
    console.log("On Products Page:" , this.products);
    this.render()
    //localStorage.removeItem('allProducts');
    
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

  hoverImage(product){
    document.getElementById(product.name).src="/images/" + product.item  + "_steps.png"
  }

  unhoverImage(product){
    document.getElementById(product.name).src="/images/" + product.item  + ".png"
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
          --width: 80vw;
          
        }
        img.pp-img{
          height: 60vh;
        }
        .product-dialog::part(panel){
          background-color: var(--dark-blue);
          color:white;
        }
        .product-dialog::part(body){
          display: grid;
          padding: 50px;
          /*background-color: var(--dark-blue);*/
        }
        .product-dialog::part(close-button){
          color: white;
          font-size: 40px;
        }
        .pp-left h2{
          font-size: 36px;
          color: white;
        }
        .pp-left button {
          color: black;
          font-family: var(--base-font-family);
        }
        .pp-right h3{
          font-size: 32px;
          font-family :var(--base-font-family);
          font-weight: bold;
        }
        .pp-right{
          grid-column: 2/3;
          margin-left: 20%;
        }
        .pp-right-top{
          background-color: var(--light-blue);
          border-radius: 5px;
          color: black;
          padding: 15px;
        }
        .pp-boxes{
          display: flex;
          width: 80%;
          margin: auto;
          font-weight: bold;
        }
        .pp-boxes img{
          width: 40px;
          height: 40px;
          transform: translateY(50%);
        }
        .pp-boxes p{
          width: 50%;
          padding: 1em;
        }
        .pp-boxes button{
          background-color: var(--med-blue);
          box-shadow: none;
          transform: translateX(30%);
          width: 60%;
        }
        .pp-right-bottom{
          display: grid;
          grid-template-columns: repeat(2, auto);
          grid-row-gap: 10px;
        }
        .pp-right-bottom img{
          height: 50px;
        }
        #desc{
          font-weight: 300;
        }
      </style>

        <div class='pp-left'>
          <h2>${product.name}</h2>
          <!-- <img class='pp-img' src='${App.apiBase}/${product.image}' alt='${product.name}'> -->
          <!-- pull images from frontend  -->
          <img class='pp-img' src='/images/${product.item}.png' alt='${product.name}'>
        
        <div class='pp-button'>
          <button>Bottles</button>
          <button>Cans</button>
        </div>
        </div>

        <div class='pp-right'>
          <div class='pp-right-top'>
              <div class='pp-boxes'>
                <img src='/images/alcohol-black.png'>
                <p>${product.abv} ABV</p>
                <img src='/images/bottle-black.png'>
                <p>${product.packSize} X ${product.containerVolume}</p>
              </div>
              <div class='pp-boxes'>
                <h3>&pound;${product.price.$numberDecimal}</h3>
                <button>Add to Basket +</button>
              </div>
          </div>
          <p id='desc'>${product.description}</p>
          <div class='pp-right-bottom'> 
            <img src='/images/tongue-white.png'>
            <p>${product.flavour}</p>
            <img src='/images/vegan-white.png'>
            <p>${product.dietary}</p>
            <img src='/images/allergies-white.png'>
            <p>Contains Sulfur Dioxide/Sulphites</p>
          </div>
          ${product.allergen? html` <p>allergen: ${product.allergen}</p>` : html``}
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

  // if the user presses 'add to cart' from product page, then qty == 1
  // else grab the qty that the user has entered
  // as it will be easier than havign to update the quantity when it is already in the cart
  addToCart(product){
    console.log("added to cart: " + product.name);
    CartAPI.addProduct(product.item, product.name, 1, product.packSize, product.containerVolume, product.price);
    this.render()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header products=${localStorage.getItem('cartProducts')}></va-app-header>
      <div class="page-content products">      
        <h1>Meet Our Pigs</h1>  
        <img class='pigsteps pigsteps1' src='/images/pigsteps.png'>
        <img class='pigsteps pigsteps2' src='/images/pigsteps.png'>
        <img class='pigsteps pigsteps3' src='/images/pigsteps.png'>
        <img class='pigsteps pigsteps4' src='/images/pigsteps.png'>
        <img class='pigsteps pigsteps5' src='/images/pigsteps.png'>
        <div class='products-grid'>
            ${this.products == null ? html `
              <!-- <sl-spinner></sl-spinner> -->
              <va-bottle-spinner></bottle-spinner>
            ` : html `
            <!--map is very similar to for each-->
              ${this.products.map(product => html`
                ${product.containerType == "bottle" ? html`
                <div class='product-card'>  
                  <!-- <img @click=${() => this.moreInfoHandler(product)} src='${App.apiBase}/${product.image}' alt='${product.name}'> -->
                  <img id='${product.name}' @click=${() => this.moreInfoHandler(product)} @mouseover=${() => this.hoverImage(product)}  @mouseout=${() => this.unhoverImage(product)}
                      src='/images/${product.item}.png' alt='${product.name}'>
                  <h2>${product.shortName}</h2>
                  <button @click=${() => this.addToCart(product)}>Buy Now</button>
                </div>
                ` : html ``}
                
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