import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.interceptors.request.use(config =>{
    store.commit('setLoading',true)
    store.commit('setError',{status: false,message:''})
    return config
})
axios.interceptors.response.use(config =>{
    setTimeout(() =>{
        store.commit('setLoading',false)
    },1000)
    
    return config
},e =>{
   console.log(e.response);
   const { error } =e.response.data
   store.commit('setError',{status: true,message:error})
   store.commit('setLoading',false)
    return Promise.reject(error)
})
createApp(App).use(router).use(store).mount('#app')
