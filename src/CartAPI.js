import App from './App'

class CartAPI {

    cartProducts = []
    orderProducts = []
    shippingFee = 0

    async addProduct(item, name, quantity, sku, price){
        let productExists = false

        let qty = quantity.toFixed(2)
        // let totalCost = price.$numberDecimal * qty 
        let totalCost = price * qty 
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
        //second array for order products to match the data types for order
        if(localStorage.getItem('orderProducts')){
            this.orderProducts = JSON.parse(localStorage.getItem('orderProducts'));
        }

        //if the cart is empty simply add the product to the cart
        if (this.cartProducts.length == 0){
            this.cartProducts.push(product);
            this.orderProducts.push(orderProduct);
            localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
            localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts));
            console.log("cart: " + JSON.stringify(localStorage.getItem('cartProducts')))
            return;
        }

        console.log("out of function 1!")

        // if we already have products in the cart, we need to check if the product exists 
        // and if yes, update the quantity (instead of adding a new product)
        this.cartProducts.forEach(product => {
            if (product.name == name){
                console.log("product already in cart")
                productExists = true;
                product.quantity += quantity;
                product.totalCost = (product.price * quantity);
            }
        })

        if (productExists != true){
            console.log("product not in cart")
            this.cartProducts.push(product);
            this.orderProducts.push(orderProduct);
        }      
        
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
        localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts));
        console.log("cart: " + JSON.stringify(localStorage.getItem('cartProducts')))
    }

    updateQty(name, qty){
        let updatedProduct
        if(localStorage.getItem('cartProducts')){
            this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        }
        //second array for order products to match the data types for order
        if(localStorage.getItem('orderProducts')){
            this.orderProducts = JSON.parse(localStorage.getItem('orderProducts'));
        }

        this.cartProducts.forEach(product => {
            if (product.name == name){
                updatedProduct = product
                product.quantity = qty;
                product.totalCost = (product.price * qty);
                localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
                localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts));
                console.log("cart: " + JSON.stringify(localStorage.getItem('cartProducts')))
            }
        })
        return updatedProduct
    }

    emptyCart(){
        this.cartProducts.length = 0;
        this.orderProducts.length = 0;
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
        localStorage.setItem('orderProducts', JSON.stringify(this.orderProducts));
        console.log("cart emptied")
        console.log("cart: " + JSON.stringify(localStorage.getItem('cartProducts')))
    }

    removeFromCart(name){

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
            //total += parseInt(product.price.$numberDecimal)
            total += parseInt(product.totalCost)
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