<template>
	<el-space>
		{{ setting.name }}
		<el-select
			v-model="setting.value"
			:disabled="disabled"
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
	  props:["disabled","setting"]
  }
  </script>
  
  <style>
  
  </style>