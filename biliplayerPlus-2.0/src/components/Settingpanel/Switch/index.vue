<template>
  <el-switch
		v-if="setting.type=='bool'"
		v-model="setting.value"
		:active-text="setting.name"
		:disabled="disabled"
	/>
</template>

<script>
export default {
	props:["disabled","setting"]
}
</script>

<style>

</style>