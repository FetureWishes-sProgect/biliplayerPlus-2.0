<template>
	<div class="settingpanel" v-show="settingpanelVisible">
		<div class="settingheader">
			{{data.settingName}}
		</div>
		<div class="btnlist">
			<!-- <svg-icon type="mdi" :path="mdiSort" @click="switchDraggable()"></svg-icon>
			<svg-icon type="mdi" :path="mdiRefresh" @click="resetSetting()"></svg-icon>
			<svg-icon type="mdi" :path="mdiClose" @click="closesettingpanel()"></svg-icon> -->
			<div class="closebtn" @click="switchDraggable()">
				<el-icon><i-ep-grid /></el-icon>
			</div>
			<div class="closebtn" @click="resetSetting()">
				<el-icon><i-ep-refresh-right /></el-icon>
			</div>
			<div class="closebtn" @click="closesettingpanel()">
				<el-icon><i-ep-close-bold /></el-icon>
			</div>
		</div>
		<el-scrollbar style="padding-bottom: 24px;">
			<draggable
				class="gridbox"
				:list="configIndexList"
				group="configIndexList"
				:disabled="disableDrag"
				:animation="100"
				:scroll="true"
				itemKey="name"
				ghostClass="ghostGridbox"
				chosenClass="chosenGridbox"
				@end="saveSettingOrder"
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
							:show-after="800"
						>
							<!-- switch -->
							<Switch
								v-if="config[element].type=='bool'"
								:setting="config[element]"
								:disabled="!disableDrag"
								@end="saveconfig"
							/>
							<!-- 下拉框 -->
							<SelectBox
								v-if="config[element].type=='select'"
								:setting="config[element]"
								:disabled="!disableDrag"
								@end="saveconfig"
							/>
							<!-- 数字 -->
							<NumberBox
								v-else-if="config[element].type=='range'"
								:setting="config[element]"
								:disabled="!disableDrag"
								@end="saveconfig"
							/>
							<!-- 快捷键 -->
							<Keyboard
								v-else-if="config[element].type=='keyboard'"
								:setting="config[element]"
								:keyname="element"
								:disabled="!disableDrag"
								@end="saveconfig"
							/>
							<!-- 其他 -->
							<div v-else>{{ config[element] }} {{ index }}</div>
						</el-tooltip>
					</el-card>
				</template>
			</draggable>
		</el-scrollbar>
	</div>
</template>

<script>
//第三方库
import draggable from "vuedraggable";
import SvgIcon from '@jamescoyle/vue-icon'
// import { mdiSort,mdiRefresh, mdiClose } from '@mdi/js'

//设置导入
import {useConfigStore} from 'store/config-store'
import {useHotkeysStore} from 'store/hotkeys-store'
import data from 'setting/data'
import defaultconfig from 'setting/defaultconfig'
import hotkeysHandler from '^/src/handler/hotkeysHandler'

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
		Keyboard,
	},
	data() {
		return {
			// mdiSort,
			// mdiRefresh,
			// mdiClose,
			defaultconfig,
			settingpanelVisible:false,
			data,
			disableDrag:true,
			hotkeymanager:useHotkeysStore(),
			hotkeysHandler
		}
	},
	mounted(){
		document.addEventListener("keydown",(e)=>{
			let valueText="",
				codeText="";
			if(e.ctrlKey){
				valueText+=`Control`;
				codeText+=`Control`;
			}
			if(e.altKey){
				if(valueText)valueText+=` + `;
				if(codeText)codeText+=` + `;
				valueText+=`Alt`;
				codeText+=`Alt`;
			}
			if(e.shiftKey){
				if(valueText)valueText+=` + `;
				if(codeText)codeText+=` + `;
				valueText+=`Shift`;
				codeText+=`Shift`;
			}
			if(e.key!=="Control"&&e.key!=="Alt"&&e.key!=="Shift"){
				if(valueText)valueText+=` + `;
				if(codeText)codeText+=` + `;
				valueText+=e.key;
				codeText+=e.code;
				let result=this.hotkeymanager.keyBindOne2One?codeText:valueText;
				let keyboard=this.hotkeymanager.findFunc(result);
				if (keyboard) {
					//触发对应的函数
					this.hotkeysHandler[keyboard].call(this);
				}
			}
			e.stopPropagation();
			e.preventDefault();
		},)
	},
	computed:{
		config(){
			return useConfigStore().config;
		},
		configIndexList(){
			return useConfigStore().configIndexList;
		},
	},
	methods:{
		switchDraggable(){
			this.disableDrag=!this.disableDrag
		},
		resetSetting(){
			useConfigStore().reset();
		},
		switchSettingpanelVisible(){
			this.settingpanelVisible=!this.settingpanelVisible;
		},
		closesettingpanel(){
			this.settingpanelVisible=false;
		},
		saveSettingOrder(){
			useConfigStore().saveSettingOrder();
		},
		saveconfig(){
			useConfigStore().saveConfig();
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
		background:#e5e9ef;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
		box-sizing: border-box;
		z-index:999;
		color:#303133;
	}
	.settingheader{
		position: relative;
		padding: 10px 20px;
		width: calc(100% - 40px) ;
		text-align: center;
		font-size: 16px;
		line-height: 40px;
		color: #606266;
		word-break: break-all;
	}
	.btnlist{
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 0;
		width: 100px;
		background: transparent;
		border: none;
		outline: none;
		cursor: pointer;
		font-size: 16px;
	}
	.closebtn{
		width: 22px;
		height: 20px;
		background-color: #d5d5e3;
		display: inline-block;
		padding: 4px;
	}
	.gridbox{
		display: grid;
		padding: 10px 20px;
		width: calc(100% - 40px) ;
		grid-gap: 10px;
		grid-template-columns: repeat(2,1fr);
		grid-auto-flow: row dense;
		color: #606266;
		font-size: 14px;
		word-break: break-all;
	}
	.ghostGridbox{
		background: #fff;
	}
</style>