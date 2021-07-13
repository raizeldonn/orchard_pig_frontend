import App from './App'


class ProductsAPI {


  constructor(){
    this.firstName = {}
    this.lastName = {}
    this.role = {}
  }

  async getProducts(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/products`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting products')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new ProductsAPI()