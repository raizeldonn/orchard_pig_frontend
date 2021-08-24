import App from './App'
import Toast from './Toast'



class ContactAPI {

  constructor(){
    //this.contactData = {}
  }

 // create a guest user
 async postMessage(contactData){
//   this.contactData = {
//      firstName: firstName,
//      lastName: lastName,
//      email: email,
//      phoneNumber: phoneNumber,
//      subject : subject,
//      message : message
//  }
 console.log("Message data : ",contactData);

 const response = await fetch(`${App.apiBase}/message`, {
   method: 'POST',
   headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
   body: contactData
 })

 // if response not ok
 if(!response.ok){      
   // console log error
   const err = await response.json()
   if(err) console.log(err)
   // show error      
   Toast.show(`Problem Posting Message: ${response.status}`)   
   // run fail() functon if set
   if(typeof fail == 'function') fail()
 }
 /// sign up success - show toast and redirect to sign in page
 console.log("response: "+ JSON.stringify(response))
 //get the customerID via the response and save to use for the order and payment
}

getContactData(){
    return this.contactData
  }
}

export default new ContactAPI()

