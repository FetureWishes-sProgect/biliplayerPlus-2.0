<template>
	<div class="settingpanel" v-show="settingpanelVisible">
		<div style="position:relative;width:100%;text-align:center;font-size:16px;line-height:40px;">
			{{data.settingName}}
		</div>
		<div class="btnlist">
			<svg-icon type="mdi" :path="mdiSort" @click="switchDraggable()"></svg-icon>
			<svg-icon type="mdi" :path="mdiRefresh"></svg-icon>
			<svg-icon type="mdi" :path="mdiClose" @click="closesettingpanel()"></svg-icon>
		</div>
		<el-scrollbar>
			<draggable
				class="gridbox"
				:list="configIndexList"
				group="configIndexList"
				:disabled="disableDrag"
				animation="100"
				:scroll="true"
				itemKey="name"
				ghostClass="ghostGridbox"
				chosenClass="chosenGridbox"
			>
				<template #item="{ element, index }">
					<el-card
						shadow="hover"
					>
						<el-tooltip
							class="box-item"
							effect="light"
							:disabled="!disableDrag||!config[element].title"
							:content="config[element].title"
							placement="top-start"
							show-after="800"
						>
							<!-- switch -->
							<Switch
								v-if="config[element].type=='bool'"
								:setting="config[element]"
								:disabled="!disableDrag"
							/>
							<!-- 下拉框 -->
							<SelectBox
								v-if="config[element].type=='select'"
								:setting="config[element]"
								:disabled="!disableDrag"
							/>
							<!-- 数字 -->
							<NumberBox
								v-else-if="config[element].type=='range'"
								:setting="config[element]"
								:disabled="!disableDrag"
							/>
							<!-- 快捷键 -->
							<Keyboard
								v-else-if="config[element].type=='keyboard'"
								:setting="config[element]"
								:keyname="element"
								:disabled="!disableDrag"
							/>
							<!-- 其他 -->
							<div v-else>{{ config[element] }} {{ index }}</div>
						</el-tooltip>
					</el-card>
				</template>
			</draggable>
		</el-scrollbar>
		<!-- <div class="gridbox">
			<div v-for="configIndex in configIndexList">
				{{config[configIndex]}}
			</div>
		</div> -->
	</div>
</template>

<script>
//第三方库
import draggable from "vuedraggable";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSort,mdiRefresh, mdiClose } from '@mdi/js'

//设置导入
import {config,configIndexList} from '^/src/buffer'
import data from '^/src/setting/data'
import defaultconfig from '^/src/setting/defaultconfig'

// 组件导入
import Switch from './Switch/index.vue'
import SelectBox from './SelectBox/index.vue'
import NumberBox from './NumberBox/index.vue'
import Keyboard from './Keyboard/index.vue'


export default {
	components: {
		SvgIcon,
		draggable,
		Switch,
		SelectBox,
		NumberBox,
		Keyboard
	},
	data() {
		return {
			mdiSort,
			mdiRefresh,
			mdiClose,
			defaultconfig,
			settingpanelVisible:true,
			config,
			configIndexList,
			data,
			disableDrag:true,
		}
	},
	methods:{
		switchDraggable(){
			this.disableDrag=!this.disableDrag
		},
		closesettingpanel(){
			this.settingpanelVisible=false;
		}
	},
}
</script>

<style scoped>
	.settingpanel{
		position:fixed;
		display:flex;
		flex-direction:column;
		min-width:660px;
		min-height:380px;
		inset:20%;
		background:rgba(33,33,33,.9);
		border:1px solid hsla(0,0%,100%,.12);
		z-index:999;
		box-shadow:rgb(0 0 0 / 25%) 0px 0px 10px 0px;
		color:white;
	}
	.btnlist{
		position:absolute;
		font-size:16px;
		top:10px;
		right:10px;
	}
	.gridbox{
		display:grid;
		width:100%;
		grid-gap: 10px;
		grid-template-columns:repeat(2,1fr);
		grid-auto-flow:row dense;
	}
	.ghostGridbox{
		background: #fff;
	}
	/* .chosenGridbox{
		background: red;
	} */
</style>