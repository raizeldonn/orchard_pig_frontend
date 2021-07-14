import App from './App'

class CartAPI {

    cartProducts = []

    async addProduct(sku, name, price, quantity){
        let product = {
            sku: sku,
            name: name,
            price: price,
            quantity: quantity
        }
        console.log("product:"+ JSON.stringify(product))
        this.cartProducts.push(product)
        console.log("cart: " + JSON.stringify(this.cartProducts))
    }

    async getProducts()
    {
        return this.cartProducts
    }
}

export default new CartAPI()