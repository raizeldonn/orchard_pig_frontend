import App from './App'


class OrderAPI {


  constructor(){
    this.shipping = {}
    this.payment = {}
  }

  shippingInfo(formData){
    this.shipping = formData
    console.log("shipping: " + this.shipping)
  }

  paymentInfo(formData){
    this.payment = formData
    console.log("payment: " + this.payment)
  }
}

export default new OrderAPI()