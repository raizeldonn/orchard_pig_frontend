import App from './App'
import Toast from './Toast'
import CartAPI from './CartAPI'


class OrderAPI {


  constructor(){
    this.customerId = null
    this.orderId = null
    this.userData = {}
    this.shipping = {}
    this.payment = {}
  }

  async createGuest(firstName, lastName, email, phoneNumber){
     this.userData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber
    }
    const response = await fetch(`${App.apiBase}/user/guest`, {
      method: 'POST',
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
    this.guestUser = this.userData
    console.log("Guest user: ",this.guestUser)
  }

  shippingInfo(address, address2, shipping){
    this.shipping = {
      "address": address,
      "addressLine2": address2,
      "shippingOption": shipping
    }
    console.log("shipping: " + JSON.stringify(this.shipping))
  }

  async makePayment(lastFourDigits, expMonth, expYear, cvvVerified){
    this.payment = {
        "lastFourDigits": lastFourDigits,
        "expMonth": expMonth,
        "expYear": expYear,
        "cvvVerified": cvvVerified
    }
    let paymentData = {
      "customerId": customerId,
      "orderId": orderId,
      "status": "unverified",
      "gateway": "stripe",
      "paymentType": "credit",
      "amount": CartAPI.getTotal(),
      "card": {
          "brand": "visa",
          "lastFourDigits": lastFourDigits,
          "expMonth": expMonth,
          "expYear": expYear,
          "cvvVerified": cvvVerified
      }

    }
    const response = await fetch(`${App.apiBase}/payment`, {
      method: 'POST',  
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json" },  //  , "Access-Control-Allow-Origin":"*" 
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
    this.guestUser = userData
    console.log(guestUser)
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