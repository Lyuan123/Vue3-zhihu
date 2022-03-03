<template>
  <div class="container" id="app">
    <column-list :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList , { ColumnProps } from './components/ColumnList.vue'
const testData: ColumnProps[] =[
  {
    id:1,
    title:'asdas1的专栏',
    description:'这是test1的专栏,是一个恒有与i四的简介',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
  },
    {
    id:1,
    title:'asdas2的专栏',
    description:'这是test1的专栏,是一个恒有与i四的简介'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
  },
   {
    id:1,
    title:'asdas1的专栏',
    description:'这是test1的专栏,是一个恒有与i四的简介',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
  },
    {
    id:1,
    title:'asdas2的专栏',
    description:'这是test1的专栏,是一个恒有与i四的简介',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
  },
]

export default defineComponent({
  name: 'App',
  components:{
    ColumnList
  },
  setup() {
    return {
      list: testData
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
