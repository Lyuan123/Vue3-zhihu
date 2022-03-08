import { createStore } from "vuex";
import {testData ,testPosts ,ColumnProps } from './testData'
export interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: string;
    columnId?: number;
  }
  export interface GlobalDataProps {
      columns :ColumnProps[];
      posts : PostProps[];
      user :UserProps;
  }
  export interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    columnId: number;
  }
const store = createStore<GlobalDataProps>({
    state:{
        columns :testData,
        posts :testPosts,
        user : { isLogin : false }
    },
    mutations:{
        login(state) {
            state.user = {...state.user,isLogin:true,name:'vbiking',columnId:1}
        },
        createPost(state,newPost){
            state.posts.push(newPost)
        }
    },
    getters: {
        biggerColumnsLen(state){
            return state.columns.filter(c => c.id >2).length
        },
        getColumnById: (state) => (id:number) =>{
            return state.columns.find(c => c.id === id)
        },
        getPostsByCid:(state)=>(cid :number) =>{
            return state.posts.filter(post => post.columnId ==cid)
        }
    }

})
export default store