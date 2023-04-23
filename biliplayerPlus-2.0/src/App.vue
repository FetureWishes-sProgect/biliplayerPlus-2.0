<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Settingpanel from './components/Settingpanel/index.vue';
import {hook} from "ajax-hook"
hook({
  //拦截回调
  onreadystatechange:function(xhr,event){
	if(xhr.readyState ==XMLHttpRequest.DONE){
		console.log(`请求完成 , 网址为：${xhr.responseURL}\n请求类型为：${xhr.getResponseHeader("content-type")}`)
	}
    //返回false表示不阻断，拦截函数执行完后会接着执行真正的xhr.onreadystatechange回调.
    //返回true则表示阻断，拦截函数执行完后将不会执行xhr.onreadystatechange. 
    return false
  },
  onload:function(xhr,event){
    console.log("onload called")
    return false
  },
  //拦截方法
  open:function(args,xhr){
	try {
		console.log(`请求方式为：${args[0]}\n网址为：${ new URL( args[1] , window.location.href ) }`)
	} catch (error) {
		console.log(`${args[0]}请求出错\n网址为：${args[1]}`)
	}finally{
		//拦截方法的返回值含义同拦截回调的返回值
		return false
	}
  }
})
</script>

<template>
  <Settingpanel/>
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
