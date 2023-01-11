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
		/>
	</div>
  </template>
  
  <script>
  export default {
	  props:["disabled","setting"]
  }
  </script>
  
  <style>
  
  </style>