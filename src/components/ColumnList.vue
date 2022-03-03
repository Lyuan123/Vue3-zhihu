<template>
  <div class="row">
    <div v-for="column in list" :key="column.id" class="col-4 mb-4">
       <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar " :alt="column.title" class="rounded-circle border border-light w-25 my-3" >
          <h6 class="card-title">{{column.title}}</h6>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue'
export interface ColumnProps {
  id:number;
  title:String;
  avatar?: String;
  description: String;
}
export default defineComponent({
  name:'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props){
    const columnList = computed(() =>{
      return props.list.map(column =>{
        if(!column.avatar){
          column.avatar = require('../assets/column.jpg')
        }
        return column
      })
    })
  }
})
</script>

<style>

</style>