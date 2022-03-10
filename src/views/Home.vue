<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <uplaod action="/api/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded">
          <h2>点击上传</h2>
          <template #uploaded= "dataProps">
           <img :src="dataProps.uploadedData.data.url" width="500">
          
          </template>
          </uplaod>
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted,ref,reactive } from 'vue'
import {testData} from '../testData'
import {useStore} from 'vuex'
import {GlobalDataProps,ResponseType,ImageProps} from '../store'
import ColumnList from "../components/ColumnList.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import uplaod from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    uplaod
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() =>{
      store.dispatch('fetchColumns')
    })
  const list = computed(() => store.state.columns)
  const beforeUpload = (file:File)=>{
    const isJPG = file.type === 'image/jpeg'
    if(!isJPG){
      createMessage('上传图片只能是jpg格式','error')
    }
    return isJPG
  }
  const onFileUploaded =(rawData:ResponseType<ImageProps>)=>{
    createMessage(`上传图片id ${rawData.data._id}`,'success')
  }
    return {
      list,
      beforeUpload,
      onFileUploaded
    };
  },
})
</script>
