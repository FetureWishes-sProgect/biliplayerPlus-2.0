<template>
	<div
		direction="vertical"
	>
		{{ setting.name }}
		<el-slider
			v-model="setting.value"
			:min="setting.start"
			:max="setting.end"
			:step="setting.step"
			:disabled="disabled"
			show-input
			@change="changefunction(path)"
		/>
	</div>
</template>

<script>
import {useConfigStore} from 'store/config-store'
export default {
	props:["disabled","setting","path"],
	methods:{
		changefunction(path){
			useConfigStore().saveConfig(path);
		},
	}
}
</script>

<style>

</style>