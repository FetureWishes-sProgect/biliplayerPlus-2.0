<template>
	<div class="settingpanel" v-show="settingpanelVisible">
		<!-- v-drag="'.settingheader'" -->
		<div class="settingheader" @mousedown="mousedown" >
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
			<div class="gridbox">
				<Sortable
					:disabled="disableDrag"
					:list="configIndexList"
				>
					<template #item="{ element, index }">
						
						<!-- 分类栏 -->
						<Folder
							v-if="config[element].type=='folder'"
							:setting="config[element]"
							:path="element"
							:disabled="!disableDrag"
						/>
						<el-card
							v-else
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
									:path="element"
									:disabled="!disableDrag"
								/>
								<!-- 下拉框 -->
								<SelectBox
									v-if="config[element].type=='select'"
									:setting="config[element]"
									:path="element"
									:disabled="!disableDrag"
								/>
								<!-- 数字 -->
								<NumberBox
									v-else-if="config[element].type=='range'"
									:setting="config[element]"
									:path="element"
									:disabled="!disableDrag"
								/>
								<!-- 快捷键 -->
								<Keyboard
									v-else-if="config[element].type=='keyboard'"
									:setting="config[element]"
									:keyname="element"
									:path="element"
									:disabled="!disableDrag"
								/>
								<!-- 其他 -->
								<div v-else>{{ config[element] }} {{ index }}</div>
							</el-tooltip>
						</el-card>
					</template>
				</Sortable>
			</div>
		</el-scrollbar>
	</div>
	<hotkeysHandler ref="hotkeysHandler"></hotkeysHandler>
</template>

<script>
//第三方库
import draggable from "vuedraggable";
import SvgIcon from '@jamescoyle/vue-icon'
// import { mdiSort,mdiRefresh, mdiClose } from '@mdi/js'

//设置导入
import {useConfigStore} from 'store/config-store'
import {useRuntimeStore} from 'store/runtime-store'
import data from 'setting/data'

// 组件导入
import Switch from './Switch/index.vue'
import SelectBox from './SelectBox/index.vue'
import NumberBox from './NumberBox/index.vue'
import Keyboard from './Keyboard/index.vue'
import Folder from './Folder/index.vue'
import hotkeysHandler from '^/src/handler/hotkeysHandler/index.vue'
import Sortable from '../Tools/Sortable/index.vue'


export default {
	components: {
		SvgIcon,
		draggable,
		Switch,
		SelectBox,
		NumberBox,
		Keyboard,
		Folder,
		hotkeysHandler,
		Sortable
	},
	data() {
		return {
			// mdiSort,
			// mdiRefresh,
			// mdiClose,
			data,
			disableDrag:true,
			dragData:{
				x:null,
				y:null
			},
			moveData:{
				x:null,
				y:null
			},
			lastDragData:{
				x:0,
				y:0
			},
			mousemovetime:0,
		}
	},
	mounted(){
		let iswideScreen=()=>{//是否是宽屏
			let flag=false;
			let element=document.querySelector(this.data.elementMapper.showElement).parentElement;
			if(element.classList.contains("mode-widescreen")||element.dataset.screen=="wide"){
				flag=true;
			}
			return flag;
		}
		let isfullScreen=()=>{//是否是全屏
			let flag=false;
			let element=document.querySelector(this.data.elementMapper.showElement).parentElement;
			if(element.classList.contains("mode-fullscreen")||element.dataset.screen=="full"){
				flag=true;
			}
			return flag;
		}
		switch (this.config.defaultScreenSize.list[this.config.defaultScreenSize.value].key) {
			case "webFullScreen":
				isfullScreen()?null:this.$refs.hotkeysHandler.switchWebFullScreen();
				break;
			case "widewide":
				iswideScreen()?null:this.$refs.hotkeysHandler.switchWide();
				break;
			case "default":
				if(isfullScreen()){
					this.$refs.hotkeysHandler.switchWebFullScreen();
				}else if(iswideScreen()){
					this.$refs.hotkeysHandler.switchWide();
				}
				break;
			default:
				break;
		}
	},
	computed:{
		config(){
			return useConfigStore().config;
		},
		configIndexList(){
			return useConfigStore().configIndexList;
		},
		runtimeStore(){
			return useRuntimeStore();
		},
		settingpanelVisible(){
			return this.runtimeStore.settingpanelVisible;
		}
	},
	methods:{
		switchDraggable(){
			this.disableDrag=!this.disableDrag;
			if(this.disableDrag)this.saveSettingOrder();
		},
		resetSetting(){
			useConfigStore().reset();
		},
		switchSettingpanelVisible(){
			this.runtimeStore.switchSettingpanelVisible();
		},
		closesettingpanel(){
			this.runtimeStore.closesettingpanel();
		},
		saveSettingOrder(){
			useConfigStore().saveSettingOrder();
		},
		saveconfig(){
			useConfigStore().saveConfig();
		},

		
		mousemove(e){
			let fun=()=>{
				let nowDate = new Date();
				let pasttime=nowDate-this.mousemovetime;
				console.log(pasttime);
				if(pasttime>=30){
					let movex=this.lastDragData.x+e.pageX-this.dragData.x,
						movey=this.lastDragData.y+e.pageY-this.dragData.y;
					let node=document.querySelector(".settingpanel");
					node.style.transform=`translate(${movex}px, ${movey}px)`;
					node.style.transition=`unset`;
					this.mousemovetime=nowDate;
				}
			}
			fun();
			return fun;
		},
		mousedown(e){
			if(e.button!=0)return;
			this.dragData={
				x:e.pageX,
				y:e.pageY
			}
			document.addEventListener("mousemove", this.mousemove);
			document.addEventListener("mouseup", this.mouseup);
			e.preventDefault();
			e.stopPropagation();
		},
		mouseup(e){
			document.removeEventListener("mousemove", this.mousemove);
			document.removeEventListener("mouseup", this.mouseup);
			let movex=this.lastDragData.x+e.pageX-this.dragData.x,
				movey=this.lastDragData.y+e.pageY-this.dragData.y;
			this.lastDragData = {x:movex,y:movey};
		},
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
		user-select:none;
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
		cursor: move;
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
		display: inline-block;
		width: 22px;
		height: 20px;
		background-color: #d5d5e3;
		padding: 4px;
	}
	.gridbox{
		display: grid;
		padding: 10px 20px;
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
	.flip-list-move {
		transition: transform 0.5s;
	}
	.no-move {
		transition: transform 0s;
	}
</style>