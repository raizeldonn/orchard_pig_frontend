import App from './App'

class CartAPI {

    cartProducts = []
    orderProducts = []
    shippingFee = 0

    async addProduct(item, name, quantity, sku, price){

        let qty = quantity.toFixed(2)
        let totalCost = price.$numberDecimal * qty 
        totalCost = parseFloat(totalCost.toFixed(2))
        
        let product = {
            item: item,
            name: name,
            sku: sku,
            quantity: quantity,
            price: price,
            totalCost: totalCost
        }

        let orderProduct = {
            item: item,
            sku: sku,
            quantity: quantity,
            price: price,
            totalCost: totalCost
        }

        if(localStorage.getItem('cartProducts')){
            this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        }
        this.cartProducts.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

        //second array for order products to match the data types for order
        if(localStorage.getItem('orderProducts')){
            this.orderProducts = JSON.parse(localStorage.getItem('orderProducts'));
        }
        this.orderProducts.push(orderProduct);
        localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts));

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

        if(localStorage.getItem('shippingFee')){
            total += parseInt(localStorage.getItem('shippingFee'));
        }

        return total
    }

    getShipping(){
        return this.shippingFee
    }

    setShipping(shippingMethod){

        if (shippingMethod == "standard")
        {
            this.shippingFee = 6
        }
        if (shippingMethod == "express")
        {
            this.shippingFee = 12
        }

        localStorage.setItem('shippingFee', this.shippingFee);
    }
}

export default new CartAPI()