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
			@change="$emit('end')"
		/>
	</div>
</template>

<script>
export default {
	props:["disabled","setting"],
	emits:["end"],
}
</script>

<style>

</style>