import App from './App'
import Toast from './Toast'
import CartAPI from './CartAPI'


class OrderAPI {

  constructor() {
    this.customerId = null //= "" //"611817197c96fc001680133c" //placeholder customer id
    this.orderId = "61183d1fff4dad9c013b2a9c" //placeholder order id
    this.userData = {}
    this.orderData = {}
    this.shipping = {}
    this.payment = {}
  }

  // create a guest user
  async createGuest(guest) {

    //need to convert 'guest' formData object to a JSON object
    var object = {}
    guest.forEach((value, key) => object[key] = value);
    this.usershippingData = object;
    console.log("formData convert to userData", this.usershippingData);

    //create user object
    this.userData = {
      "firstName": this.usershippingData.firstName,
      "lastName": this.usershippingData.lastName,
      "email": this.usershippingData.email,
      "phoneNumber": this.usershippingData.phoneNumber
    }
    console.log("GUEST USER : ", this.userData);

    //create shipping object
    this.shipping = {
      "address": this.usershippingData.address,
      "address2": this.usershippingData.address2,
      "shipping": this.usershippingData.shipping
    }
    console.log("SHIPPING : ", this.shipping);

    const response = await fetch(`${App.apiBase}/user/guest`, {
      method: 'POST',
      body: guest
    })

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json()
      if (err) console.log(err)
      // show error      
      Toast.show(`Problem getting user: ${response.status}`)
      // run fail() functon if set
      if (typeof fail == 'function') fail()
    }
    const data = await response.json();
    this.customerId = data._id;
    console.log("Response customerId: ", this.customerId);
    this.userEmail = guest.get('email');
    console.log("userEmail", this.userEmail);

    console.log("retreivedUserData: ", data);

  }

  // place an order
  async placeOrder() {

    let products = localStorage.getItem('cartProducts')
    products = JSON.parse(products)
    const totalCost = CartAPI.getTotal();

    var shippingFormData = new FormData();
    for (var key in this.shipping) {
      shippingFormData.append(key, this.shipping[key]);
    }

    var productsFormData = new FormData();
    for (var key in products) {
    productsFormData.append(key, products[key]);
    }
    
    // place the order
    this.orderData = {
      "currency": "BPS",
      "customerId": this.customerId,
      "paymentStatus": "unpaid",
      "status": "awaitingShipment",
      "totalCost": totalCost,
      // "products": products,
      // "shipping": this.shipping
      "products": productsFormData,
      "shipping": this.shipping
    }

    //convert to a FormData object

    var orderFormData = new FormData();
    for (var key in this.orderData) {
      orderFormData.append(key, this.orderData[key]);
    }
   


    console.log("Order DATA : ", this.orderData)

    const response = await fetch(`${App.apiBase}/order`, {
      method: 'POST',
      // body: this.orderData
      body: orderFormData
    })

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json()
      if (err) console.log(err)
      // show error      
      Toast.show(`Problem submitting Order: ${response.status}`)
      // run fail() functon if set
      if (typeof fail == 'function') fail()
    }

    //get hold of the order ID in order to make a payment
    const data = response.json();
    this.orderId = data._id;
    console.log("OrderId : ", this.orderId);

    // await this.makePayment()
  }

  // post a payment
  async makePayment() {

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
      //headers: { "Authorization": `Bearer ${localStorage.accessToken}`},  //  , "Access-Control-Allow-Origin":"*" , "Content-Type" : "application/json" 
      body: paymentData
    })

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json()
      if (err) console.log(err)
      // show error      
      Toast.show(`Problem getting user: ${response.status}`)
      // run fail() functon if set
      if (typeof fail == 'function') fail()
    }
    /// sign up success - show toast and redirect to sign in page
  }

  // save shipping info to object for further use
  shippingInfo(address, address2, shipping) {
    this.shipping = {
      "address": address,
      "addressLine2": address2,
      "shippingOption": shipping
    }
    console.log("shipping: " + JSON.stringify(this.shipping))
    console.log("shipping: " + this.shipping)
  }

  // save payment info to object for further use
  paymentInfo(paymentFormData) {

    //need to convert 'payment' formData object to a JSON object
    var object = {}
    paymentFormData.forEach((value, key) => object[key] = value);
    this.payment = object;

    //   this.payment = {
    //     "brand": "visa",
    //     "lastFourDigits": lastFourDigits,
    //     "expMonth": expMonth,
    //     "expYear": expYear,
    //     "cvvVerified": cvvVerified
    // }

    console.log("payment: " + this.payment)
  }

  getUserData() {
    return this.userData
  }

  getShipping() {
    return this.shipping
  }

  getPayment() {
    return this.payment
  }

}

export default new OrderAPI()