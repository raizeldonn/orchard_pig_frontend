import App from './App'
import Toast from './Toast'
import CartAPI from './CartAPI'


class OrderAPI {

  constructor(){
    this.customerId = "60bf7279e6993317c2477940" //placeholder customer id
    this.orderId = "60e97bea3bc70632dca552e0" //placeholder order id
    this.userData = {}
    this.orderData = {}
    this.shipping = {}
    this.payment = {}
  }

  // create a guest user
  async createGuest(firstName, lastName, email, phoneNumber){
     this.userData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber
    }

    const response = await fetch(`${App.apiBase}/user/guest`, {
      method: 'POST',
      // headers: { "Content-Type" : "application/json" },
      body: this.userData
    })

    // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      Toast.show(`Problem getting user: ${response.status}`)   
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
    console.log("response: "+ JSON.stringify(response.json()))
    //get the customerID via the response and save to use for the order and payment
  }

  // place an order
  async placeOrder(){

    let products = localStorage.getItem('cartProducts')
    products = JSON.parse(products)

    // place the order
    this.orderData = {
      "currency": "BPS",
      "customerId": this.customerId,
      "paymentStatus": "unpaid",
      "status": "awaitingShipment",
      "totalCost": CartAPI.getTotal(),
      "products": products,
      "shipping": this.shipping
    }

    console.log(this.orderData)

    const response = await fetch(`${App.apiBase}/order`, {
      method: 'POST', 
      headers: { "Content-Type" : "application/json" },
      body: this.orderData
    })

    // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      Toast.show(`Problem getting user: ${response.status}`)   
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }

    //get hold of the order ID in order to make a payment

    // await this.makePayment()
  }

  // post a payment
  async makePayment(){
    
    let paymentData = {
      "customerId": this.customerId, 
      "orderId": this.orderId,
      "status": "unverified",
      "gateway": "stripe",
      "paymentType": "credit",
      "amount": CartAPI.getTotal(),
      "card": this.payment

    }
    const response = await fetch(`${App.apiBase}/payment`, {
      method: 'POST',  
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},  //  , "Access-Control-Allow-Origin":"*" , "Content-Type" : "application/json" 
      body: paymentData
    })

    // if response not ok
    if(!response.ok){      
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // show error      
      Toast.show(`Problem getting user: ${response.status}`)   
      // run fail() functon if set
      if(typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
  }

  // save shipping info to object for further use
  shippingInfo(address, address2, shipping){
    this.shipping = {
      "address": address,
      "addressLine2": address2,
      "shippingOption": shipping
    }
    console.log("shipping: " + JSON.stringify(this.shipping))
  }

  // save payment info to object for further use
  paymentInfo(lastFourDigits, expMonth, expYear, cvvVerified){
      this.payment = {
        "brand": "visa",
        "lastFourDigits": lastFourDigits,
        "expMonth": expMonth,
        "expYear": expYear,
        "cvvVerified": cvvVerified
    }
    console.log("payment: " + JSON.stringify(this.payment))
  }

  getUserData(){
    return this.userData
  }

  getShipping(){
    return this.shipping
  }

  getPayment(){
    return this.payment
  }

}

export default new OrderAPI()