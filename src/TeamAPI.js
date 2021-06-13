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
    this.teamString = JSON.stringify(data)

    // this.firstName = data.first_name
    // this.lastName = data.last_name
    // this.role = data.role

    // return data
    return data
  }
}

export default new TeamAPI()