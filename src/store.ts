import { createStore ,Commit} from "vuex";
import axios,{AxiosRequestConfig}from 'axios'
export interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P;
  }
  export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    avatar?: ImageProps;
    description?: string;
  }
  export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
    fitUrl?: string;
  }
  export interface ColumnProps{
      _id:string;
      title:string;
      avatar?: ImageProps;
      description:string;
  }
  export interface GlobalErrorProps {
      status: boolean;
      message?: string;
  }
  export interface GlobalDataProps {
      error:GlobalErrorProps
      token:string;
      loading:boolean;
      columns :ColumnProps[];
      posts : PostProps[];
      user :UserProps;
  }
  export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string | UserProps;
    isHTML?: boolean;
  }
  const getAndCommit = async(url: string, mutationName: string,commit:Commit ) => {
    const { data } = await axios.get(url)
    commit(mutationName,data)
    return data
  }
  const postAndCommit = async(url: string, mutationName: string,commit:Commit,payload:any) => {
    const { data } = await axios.post(url,payload)
    commit(mutationName,data)
    return data
  }
  const asyncAndCommit =async(url: string, mutationName: string,commit:Commit,config:AxiosRequestConfig = {method:'get'}) =>{
    const { data } = await axios(url,config)
    commit(mutationName,data)
    return data
  }
const store = createStore<GlobalDataProps>({
    state:{
        error:{status:false},
        token:localStorage.getItem('token') || '',
        loading:false,
        columns :[],
        posts :[],
        user : { isLogin : false }
    },
    mutations:{
        // login(state) {
        //     state.user = {...state.user,isLogin:true,nickName:'vbiking'}
        // },
        createPost(state,newPost){
            state.posts.push(newPost)
        },
        fetchColumns(state,rawData){
            state.columns = rawData.data.list
        },
        fetchColumn(state,rawData){
            state.columns = [rawData.data]
        },
        fetchPosts(state,rawData){
            state.posts = rawData.data.list
        },
        fetchPost(state,rawData){
            state.posts = rawData.data
            console.log(state.posts);
            
        },
        setLoading(state,status){
            state.loading = status
        },
        setError(state, e: GlobalErrorProps) {
            state.error = e
        },
        fetchCurrentUser(state,rawData){
            state.user = {isLogin:true,...rawData.data}
        },
        // updatePost(state,{data}){
        //     // state.posts = state.posts.map(post => {
        //     //     // if(post._id === data._id){
        //     //     //     return data
        //     //     // }else{
        //     //     //     return post
        //     //     // }
        //     // })
        // },
        login(state,rawData){
            const { token } = rawData.data
            state.token = token
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        logout(state) {
            state.token = ''
            state.user = { isLogin: false }
            localStorage.remove('token')
            delete axios.defaults.headers.common.Authorization
          }
    },
    actions:{
        fetchColumns({commit}) {
            return  getAndCommit('/api/columns','fetchColumns',commit)
            
        },
        fetchColumn({commit},cid){
            return  getAndCommit(`/api/columns/${cid}`,'fetchColumn',commit)  
        },
        fetchPosts({commit},cid){
            return getAndCommit(`/api/columns/${cid}/posts`,'fetchPosts',commit)
        },
        fetchPost({commit},cid){
            return getAndCommit(`/api/posts/${cid}`,'fetchPost',commit)
        },
        fetchCurrentUser({commit}){
            return  getAndCommit('/api/user/current','fetchCurrentUser',commit)
        },
        login({commit},payload){
           return postAndCommit('/api/user/login','login',commit,payload)
        },
        createPost({commit},payload){
            return postAndCommit('/api/posts','createPost',commit,payload)
         },
         updatePost({commit},{id,payload}){
             return asyncAndCommit(`/api/posts/${id}`,'updatePost',commit,{
                 method:'patch',
                 data:payload
             })
         },
         deletePost({ commit }, id) {
            return asyncAndCommit(`/api/posts/${id}`, 'deletePost', commit, { method: 'delete' })
          },
        loginAndFetch({ dispatch },loginData){
            return dispatch('login',loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    },
    getters: {
        getColumnById: (state) => (id:string) =>{
            return state.columns.find(c => c._id === id)
        },
        getPostsByCid:(state)=>(cid :string) =>{
            console.log(state.posts);
            
            return state.posts.filter(post => post.column ==cid)
        },
    //      getCurrentPost: (state) => (id: string) => {
    //   return state.posts.filter(post => post.column == id)
    // }
    }

})
export default store