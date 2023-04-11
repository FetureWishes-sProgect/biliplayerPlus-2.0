<template>
  <el-switch
		v-if="setting.type=='bool'"
		v-model="setting.value"
		:active-text="setting.name"
		:disabled="disabled"
		@click="click"
		@change="changefunction(path)"
	/>
</template>

<script>

import {useConfigStore} from 'store/config-store'
import {useHotkeysStore} from 'store/hotkeys-store';
export default {
	props:["disabled","setting","path"],
	methods:{
		changefunction(path){
			useConfigStore().saveConfig(path);
		},
		click(){
			let a=useConfigStore();
			let b=useHotkeysStore();
			console.log(JSON.parse(JSON.stringify(a.config)));
			console.log(JSON.parse(JSON.stringify(b.key2bind)));
		}
	}
}
</script>

<style>

</style>