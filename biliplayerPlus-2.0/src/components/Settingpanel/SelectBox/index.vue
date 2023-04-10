<template>
	<el-space>
		{{ setting.name }}
		<el-select
			v-model="setting.value"
			:disabled="disabled"
			@change="changefunction"
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
import {toRefs} from 'vue'
export default {
	props:["disabled","setting"],
	emits:["end"],
	methods:{
		changefunction(){
			this.$emit('end');
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