<template>
  <div class="container" id="app">
    <global-header :user="currentUser"></global-header>
    <!-- <column-list :list="list"/> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label"> 邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" ref="inputRef"></validate-input>
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label class="form-label"> 密码</label>
        <validate-input :rules="emailRules" v-model="passwordVal" placeholder="请输入密码" type="password"></validate-input>
        {{passwordVal}}
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: "asdm",
};
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "asdas1的专栏",
    description: "这是test1的专栏,是一个恒有与i四的简介",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg",
  },
  {
    id: 1,
    title: "asdas2的专栏",
    description: "这是test1的专栏,是一个恒有与i四的简介",
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
  },
  {
    id: 1,
    title: "asdas1的专栏",
    description: "这是test1的专栏,是一个恒有与i四的简介",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg",
  },
  {
    id: 1,
    title: "asdas2的专栏",
    description: "这是test1的专栏,是一个恒有与i四的简介",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg",
  },
];

export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const inputRef = ref<any>()
    const emailVal = ref('123@1test.com')
    const passwordVal = ref('123')
    const emailRules:RulesProp = [
      {type:'required',message:'电子邮箱地址不能为空'},
      {type:'email',message:'请输入正确的电子邮箱格式'}
    ]
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    })
    const validateEmail = () =>{
      if(emailRef.val.trim() === ''){
        emailRef.error = true
        emailRef.message = 'can no be emeu'
      }
    }
    const onFormSubmit = (result:boolean) =>{
      console.log('result', inputRef.value.validateInput());
      
    }
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordVal,
      onFormSubmit,
      inputRef
    };
  },
});
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
