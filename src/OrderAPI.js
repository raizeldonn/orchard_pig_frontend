import App from './App'
import Toast from './Toast'


class OrderAPI {


  constructor(){
    this.guestUser = {}
    this.shipping = {}
    this.payment = {}
  }

  async createGuest(firstName, lastName, email){
    let userData = {
      "firstName": "raizel",
        "lastName": "donnebaum",
        "email": "raizeld@gmail.com",
        "phoneNumber": "95324392"
    }
    const response = await fetch(`${App.apiBase}/user/guest`, {
      method: 'POST',  
      headers: {"Content-Type" : "application/json"   }, 
      body: userData
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

  shippingInfo(formData, fail = false){
    this.shipping = formData
    console.log("shipping: " + JSON.stringify(this.shipping))
  }

  paymentInfo(formData){
    this.payment = formData
    console.log("payment: " + this.payment)
  }
}

export default new OrderAPI()