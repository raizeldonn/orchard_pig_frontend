import App from './App'


class TeamAPI {


  constructor(){
    this.firstName = {}
    this.lastName = {}
    this.role = {}
  }

  async getTeam(){
    // validate
    //if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/team`)

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting team')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    console.log(data)
   
    var dataArray = []
    //loops through data 
    for (var i=0; i<data.length; i++){
      dataArray[i] = data[i];
        console.log(dataArray[i].first_name);
        console.log(dataArray[i].last_name);
        console.log(dataArray[i].role);
    }

    for (var i=0; i<data.length; i++){
        console.log(dataArray[i].first_name);
        console.log(dataArray[i].last_name);
        console.log(dataArray[i].role);
    }




    // data.forEach(function(obj) { 
    //   console.log(obj.first_name);
    //   console.log(obj.last_name);
    //   console.log(obj.role);
    // });
    // return data
    return dataArray
  }
}

export default new TeamAPI()