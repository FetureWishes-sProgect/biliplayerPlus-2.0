<template>
	<el-space>
		{{ setting.name }}
		<el-select
			v-model="setting.value"
			:disabled="disabled"
			@change="$emit('end')"
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
export default {
	props:["disabled","setting"],
	emits:["end"],
}
</script>

<style>

</style>