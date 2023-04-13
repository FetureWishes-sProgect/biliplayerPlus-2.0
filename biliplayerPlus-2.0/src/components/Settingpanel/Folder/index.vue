<template>
	<div
		class="header"
	>
		{{setting.name}}
		{{ path }}
	</div>
	<div class="gridbox">
		<Sortable
			:disabled="!disabled"
			:list="setting.children"
		>
			<template #item="{ element, index }">
				<!-- 分类栏 -->
				<Folder
					v-if="setting[element].type=='folder'"
					:setting="setting[element]"
					:path="path+'.'+element"
					:disabled="disabled"
				/>
				<el-card
					v-else
					shadow="hover"
				>
					<el-tooltip
						class="box-item"
						effect="light"
						:disabled="disabled||!setting[element].title"
						:content="setting[element].title"
						placement="top-start"
						:show-after="800"
					>
						<!-- switch -->
						<Switch
							v-if="setting[element].type=='bool'"
							:setting="setting[element]"
							:disabled="disabled"
							:path="path+'.'+element"
						/>
						<!-- 下拉框 -->
						<SelectBox
							v-if="setting[element].type=='select'"
							:setting="setting[element]"
							:path="path+'.'+element"
							:disabled="disabled"
						/>
						<!-- 数字 -->
						<NumberBox
							v-else-if="setting[element].type=='range'"
							:setting="setting[element]"
							:disabled="disabled"
							:path="path+'.'+element"
						/>
						<!-- 快捷键 -->
						<Keyboard
							v-else-if="setting[element].type=='keyboard'"
							:setting="setting[element]"
							:keyname="element"
							:path="path+'.'+element"
							:disabled="disabled"
						/>
						<!-- 其他 -->
						<div v-else>{{ setting[element] }} {{ index }}</div>
					</el-tooltip>
				</el-card>
			</template>
		</Sortable>
	</div>
</template>
  
<script>

// 组件导入
import Switch from '../Switch/index.vue'
import SelectBox from '../SelectBox/index.vue'
import NumberBox from '../NumberBox/index.vue'
import Keyboard from '../Keyboard/index.vue'
import Folder from '../Folder/index.vue'
import Sortable from '../../Tools/Sortable/index.vue'



export default {
	name:"Folder",
	props:["disabled","setting","path"],
	emits:["end"]
}
</script>

<style scoped>
	.header{
		font-size: 16px;
		line-height: 30px;
		color: #606266;
		word-break: break-all;
	}
	.gridbox{
		display: grid;
		margin-left: 10px;
		padding-left: 10px;
		border-left: 2px solid #409eff;
		grid-gap: 10px;
		grid-auto-flow: row dense;
		color: #606266;
		font-size: 14px;
		word-break: break-all;
	}
</style>