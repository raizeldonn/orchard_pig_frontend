import { html, render} from 'lit-html'
import App from '../../App'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import ProductsAPI from './../../ProductsAPI';
import CartAPI from './../../CartAPI';

class ProductsView {
  init() {
    document.title = 'Products'
    this.products = null;
    this.productDialog = null;
    this.canInfoDisplay = false;
    this.cans = false;
    this.x;
    this.canImage = null;

    this.render()
    Utils.pageIntroAnim()

    if (localStorage.getItem('allProducts')) {
      this.products = JSON.parse(localStorage.getItem('allProducts'));
    } else {
      this.getProducts();
    }
    console.log("On Products Page:", this.products);
    this.render()
    //localStorage.removeItem('allProducts');

  }

  async getProducts() {
    try {
      this.products = await ProductsAPI.getProducts()
      console.log(this.products)
      this.render()
    } catch (err) {
      Toast.show(err, 'error')
    }
  }

  hoverImage(product) {
    document.getElementById(product.name).src = "/images/" + product.item + "_steps.png"
  }

  unhoverImage(product) {
    document.getElementById(product.name).src = "/images/" + product.item + ".png"
  }


  //when user selects 'more info' create & show a more info dialog
  moreInfoHandler(product) {
    //create cleaner dialog
    this.productDialog = document.createElement('sl-dialog')
    this.productDialog.className = 'product-dialog'
    // check if the product has cans
    this.cans = false;
    
    for (var i = 0; i < this.products.length; i++) {
      if ((this.products[i].shortName == product.shortName) && (this.products[i].packSize == "24")) {
        this.cans = true;
        this.canImage = this.products[i].image;
      }
    }
    
    //add content
    const dialogContent = html `

      <style>
        .product-dialog{
          --width: 80vw;
          
        }
        #image-bottle {
          position: absolute;
          left: 0px;
          top: 170px;
        }
        #image-can {
          position: absolute;
          right: 0px;
          top: 170px;
        }
        img.pp-img{
          //max-height: 60vh;
          width: 50%;
          max-width 100%;
          z-index: 99;
          transition: width 1s;
          
        }
        .pp-img:hover {
          cursor: pointer;
          transition: width 1s;
          max-height: 60vh;
          z-index: 100;
          width: 100%;
          
        }

        img.pp-img-single{
          max-height: 60vh;
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
        .pp-left button{
          color: white;
          background-color: var(--med-blue);
          font-family: var(--base-font-family);
        }
        .pp-left button:hover {
          color: black;
          background-color: var(--light-blue);
        }
        .pp-left button:active {
          color: black;
          background-color: var(--light-blue);

        }
        .pp-left{
          grid-column: 1/2;
          position: relative;
        }
        
        .pp-right h3{
          font-size: 32px;
          font-family :var(--base-font-family);
          font-weight: bold;
        }
        .pp-right{
          grid-column: 3/3;
          //margin-left: 20%;
          margin-left: 10%;
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
        .pp-boxes button:hover{
          color: black;
          background-color: var(--white);
          border: 1px solid var(--med-blue);
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
          ${this.cans ? html ` <div class='pp-button'>
          <button id="bottle-btn" @click=${() => this.moreInfoBottleHandler(product)}>Bottles</button>
          <button id="can-btn" @click=${() => this.moreInfoCanHandler(product)}>Cans</button>
          </div><p></p> ` : html ``}
          
          <h2 id="productName">${product.name}</h2>
          <!-- <img class='pp-img' src='${App.apiBase}/${product.image}' alt='${product.name}'> -->
          <!-- pull images from frontend  -->
          
          ${!this.canImage ? html `<img id="image-bottle" @click=${() => this.moreInfoBottleHandler(product)} class='pp-img-single' src='/images/${product.image}' alt='${product.name}'>`:html``}
          ${this.canImage ? html `<img id="image-bottle" @click=${() => this.moreInfoBottleHandler(product)} class='pp-img' src='/images/${product.image}' alt='${product.name}'>`:html``}
          ${this.canImage ? html `<img id="image-can" @click=${() => this.moreInfoCanHandler(product)} class='pp-img' src='/images/${this.canImage}' alt='${product.name}'>`:html`` }
          
          </div>

        <div class='pp-right'>
          <div class='pp-right-top'>
              <div class='pp-boxes'>
                <img src='/images/alcohol-black.png'>
                <p id="abv" >${product.abv} ABV</p>
                <img src='/images/bottle-black.png'>
                <p id="packSizeVolume">${product.packSize} X ${product.containerVolume}</p>
              </div>
              <div class='pp-boxes'>
                <!-- <h3>&pound;${product.price.$numberDecimal}</h3> -->
                <h3 id="price" >&pound;${product.price}</h3> 
                <button @click=${() => this.addToCart(product)}>Add to Basket +</button>
              </div>
          </div>
          <p id='desc'>${product.description}</p>
          <div class='pp-right-bottom'> 
            <img src='/images/tongue-white.png'>
            <p id="flavour" >${product.flavour}</p>
            <img src='/images/vegan-white.png'>
            <p id="dietary" >${product.dietary}</p>
            <img src='/images/allergies-white.png'>
            <p>Contains Sulfur Dioxide/Sulphites</p>
          </div>
          ${product.allergen? html` <p id="allergen" >allergen: ${product.allergen}</p>` : html``}
        </div>
    `

    render(dialogContent, this.productDialog)
    //append to document.body
    document.body.append(this.productDialog)
    //show the dialog
    this.productDialog.show()
    
    //on hide, delete the dialog
    this.productDialog.addEventListener('sl-after-hide', () => {
      this.canInfoDisplay = false;
      this.cans = false;
      this.canImage = null;
      this.productDialog.remove()
    })
  }

  //substitute can/bottle info
  changeCanBottleInfo(product){
    document.getElementById("productName").innerHTML = product.name;
    document.getElementById("abv").innerHTML = product.abv;
    document.getElementById("packSizeVolume").innerHTML = product.packSize +" X "+ product.containerVolume;
    document.getElementById("price").innerHTML = "&pound;"+product.price;
    document.getElementById("desc").innerHTML = product.description;
    document.getElementById("flavour").innerHTML = product.flavour;
    document.getElementById("dietary").innerHTML = product.dietary;
    document.getElementById("allergen") ? document.getElementById("allergen").innerHTML = product.allergen : this.x=1 ;
    //document.getElementById("image").src = product.image;
  }

  toggleImageSize(){

  }
  //select bottle info 
  moreInfoBottleHandler(product) {
    if (this.canInfoDisplay == true) {
      for (var i = 0; i < this.products.length; i++) {
        if ((this.products[i].shortName === product.shortName) && (this.products[i].packSize === "12")) {
          // this.productDialog.remove();
          product = this.products[i];
          this.canInfoDisplay = false;
          this.changeCanBottleInfo(product);
          //this.moreInfoHandler(product);
        }
      }
    }
  }

  //select can info
  moreInfoCanHandler(product) {
    if (this.canInfoDisplay == false) {
      for (var i = 0; i < this.products.length; i++) {
        if ((this.products[i].shortName === product.shortName) && (this.products[i].packSize === "24")) {
          // this.productDialog.remove();
          product = this.products[i];
          this.canInfoDisplay = true;
          this.changeCanBottleInfo(product);
          //this.moreInfoHandler(product);
          
        }
      }
    }
  }

  // if the user presses 'add to cart' from product page, then qty == 1
  // else grab the qty that the user has entered
  // as it will be easier than havign to update the quantity when it is already in the cart
  addToCart(product) {
    console.log("added to cart: " + product.name);
    CartAPI.addProduct(product.item, product.name, 1, product.sku, product.price);
    Toast.show(product.name + ' added to your Cart')
    this.render()
  }

  // method from lit library which allows us 
  // to render html from within js to a container
  render() {
    const template = html `
      <va-app-header title="Shop" products=${localStorage.getItem('cartProducts')}></va-app-header>
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
                  <!--<button @click=${() => this.addToCart(product)}>Buy Now</button>-->
                </div>
                ` : html ``}
                
              `)}
            `}
          </div>

          <va-app-footer margin="true"></va-app-footer> 
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ProductsView()