import App from './App'

class CartAPI {

    cartProducts = []

    async addProduct(item, name, quantity, packSize, containerVolume, price){
        let product = {
            item: item,
            name: name,
            quantity: quantity,
            packSize: packSize,
            containerVolume: containerVolume,
            price: price
        }

        if(localStorage.getItem('cartProducts')){
            this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        }
        this.cartProducts.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

        console.log("cart: " + JSON.stringify(localStorage.getItem('cartProducts')))
    }

    async getProducts()
    {
        return JSON.stringify(localStorage.getItem('cartProducts'))
        // if(localStorage.getItem('cartProducts')){
        //     this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        //     return this.cartProducts
        // }
    }

    getTotal()
    {
        let total = 0

        if(localStorage.getItem('cartProducts')){
            this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        }

        this.cartProducts.forEach( product => {
            total += parseInt(product.price.$numberDecimal)
        })

        return total
    }
}

export default new CartAPI()