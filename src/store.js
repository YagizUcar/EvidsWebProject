import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"

Vue.use(Vuex)

const store= new Vuex.Store({

state :{

    token:"",
    fireBase :  "AIzaSyAWfEGvLfG9ei4blvWXnwWPVSzgfYA5a9k"
},
mutations :{

    setToken(state,token){
        state.token=token 
    },

    clearToken(state){
       state.token=""
    }
},
actions : {
    initAuth({commit, dispatch}){
    let token = localStorage.getItem("token")
      
    if(token){
        
        commit("setToken",token)
        router.push("/")

    }

    else{

        router.push("/auth")
        return false
    }

    },

    login({commit,dispatch,state},authData){

        let authlink ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
        if(authData.isUser){

          authlink="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        }
        return axios.post
      
        (authlink + "AIzaSyAWfEGvLfG9ei4blvWXnwWPVSzgfYA5a9k",
        {email : authData.email , password : authData.password , returnSecureToken : true}
        
        ).then(response =>{
            commit("setToken",response.data.idToken)
            localStorage.setItem("token",response.data.idToken)
        })
        .catch(e => {
            alert(e.response.data.error.message)
            })

    },
    logout({commit,dispatch,state}){

        commit("clearToken")
        localStorage.removeItem("token")

    }

},
getters :{

    isAuthenticated(state){

        return state.token !== ""
    }


},

})

export default store