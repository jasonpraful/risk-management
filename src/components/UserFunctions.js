import axios from 'axios'


export const register = newUser => {
    return axios.post('/api/register',{
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
    }).then(res => {
        if(res.data.status === 200){
        console.log("Registered: "+res.data)
        return res.data
        }else{
            console.log("Unauthorised");
            return 403
        }
    }
        )
}

export const login = user =>{
    return axios.post('/api/login',{
        email: user.email,
        password: user.password
    }).then(res => {
        if(!res.data.status){
        console.log(res.data.error)
        localStorage.setItem("userToken", res.data)
        return res.data} else{
            return 403
        }
    }).catch(err => console.log("Error when logging in: "+err))
    
}

export const getProfile = user => {
  return axios
    .get('api/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const createProject = project =>{
    return axios.post('/api/createproject',{
        projectName: project.projectName,
        projectID: project.projectID,
        pmEmail: project.pmEmail,
        additionalInfo: project.additionalInfo,
        createdBy: project.createdBy,
    }).then(res => {
        if(res.data.status === 200){
            console.log("Project Created")
            return 200
        
        
        } else{
            console.log("Project Already Exists")
            return 409
        }
    }).catch(err => console.log("Error when logging in: "+err))
    
}

export const createRisk = risk =>{
    return axios.post('/api/createrisk',{
        riskName: risk.riskName,
        riskCategory: risk.riskCategory,
        riskEffect: risk.riskEffect,
        riskDefinition: risk.riskDefinition,
        createdBy: risk.createdBy,
    }).then(res => {
        if(res.data.status === 200){
            console.log("Risk Created")
            return 200
        
        
        } else{
            console.log("Risk Already Exists")
            return 409
        }
    }).catch(err => console.log("Error when logging in: "+err))
    
}