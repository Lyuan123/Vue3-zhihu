<template>
  <div class="post-detail-page">
    <modal title="删除文章" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="state.hhh">
      <img :src="currentImageUrl" alt="state.hhh.title" class="rounded-lg img-fluid my-4" v-if="state.hhh">
      <h2 class="mb-4">{{state.hhh.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="state.hhh.author" v-if="typeof state.hhh.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{state.hhh.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{name: 'create', query: { id: state.hhh._id}}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref ,reactive} from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../store'
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import createMessage from '../components/createMessage'
import axios from 'axios'

export default defineComponent({
  name: 'post-detail',
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()
     const state = reactive({
      hhh: {} as PostProps
    })
    const currentPoasdst=axios.get(`/api/posts/${currentId}`).then((Res) =>{
      // state.hhh=
      state.hhh=   Res.data.data
    })
   const currentPost = state.hhh
   console.log(currentPost,"currentPost");
   
     
    
    const currentHTML = computed(() => {
      const  { content, isHTML }  = state.hhh
     if (content) {
        return isHTML ? content : md.render(content)
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (state.hhh && state.hhh.author && isLogin) {
        const postAuthor = state.hhh.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    const currentImageUrl = computed(() => {
        const { image } = state.hhh
        return (image as ImageProps).url 
     
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'column', params: { id: rawData.data.column } })
        }, 2000)
      })
    }
    return {
      currentPoasdst,
      state,
      currentImageUrl,
      currentHTML,
      showEditArea,
      modalIsVisible,
      hideAndDelete,
    }
  }
})
</script>
