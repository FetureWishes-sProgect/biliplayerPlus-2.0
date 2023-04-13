<template>
	<el-space>
		{{ setting.name }}
		<el-select
			v-model="setting.value"
			:disabled="disabled"
			@change="changefunction(path)"
			@visibleChange="visiblechange"
			ref="select"
		>
			<el-option
				v-for="(item,index) in setting.list"
				:key="item.key"
				:label="item.content"
				:value="index"
				:disabled="item.disabled"
			/>
		</el-select>
	</el-space>
</template>
  
<script>
import {useConfigStore} from 'store/config-store'
export default {
	props:["disabled","setting","path"],
	methods:{
		changefunction(path){
			useConfigStore().saveConfig(path);
		},
		visiblechange(show){
			if(show)return;
			this.$nextTick(()=>{
				this.$refs.select.blur();
			})
		}
	}
}
</script>

<style>

</style>