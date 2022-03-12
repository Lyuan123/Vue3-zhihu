# vue3zhi-hu

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 问题
```
1.在编辑文章页面，展示默认的文字填充，发起请求，得到数据，然后去把数据传入图片组件中无法进行数据的更新
需要在子组件添加一个监听watch，由于第一个参数要是计算属性，所以更改为函数的方式即可
   watch(() => props.uploaded,(newValue)=>{
      if(newValue){
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })

2.在异步请求之后无法让内容标题和内容自动填充用v-model
这里继续使用watch监听虽然会有数据的渲染，但是会出现每次修改子组件Input框中数据时，watch会被触发两次
原因：子组件内input时间触发了updataValue更新内部的值，并且发送事件 => 父组件的属性modelValue被发送的事件更新，子组件的watch被触发，再次更新内部的值

原先标签上是利用
:value="inputRef.val" @input="updateValue"
// val:props.modelValue|| '',
      const updateValue = (e:KeyboardEvent) =>{
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val =targetValue
      context.emit('update:modelValue',targetValue)
    }
    
        来进行数据的绑定
现在可以直接使用v-model，然后再setup中的值利用get和set分别用来监听
 const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      // val:props.modelValue|| '',
      error: false,
      message: ''
    })
```
