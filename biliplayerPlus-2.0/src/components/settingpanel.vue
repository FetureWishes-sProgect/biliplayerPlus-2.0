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
		<draggable
			class="gridbox"
			:list="configIndexList"
			group="configIndexList"
			:disabled="disableDrag"
			animation="100"
			itemKey="name"
			ghostClass="ghostGridbox"
			chosenClass="chosenGridbox"
		>
			<template #item="{ element, index }">
				<el-tooltip
					class="box-item"
					effect="light"
					:disabled="!config[element].title"
					:content="config[element].title"
					placement="top-start"
					show-after="800"
				>
					<el-switch
						v-if="config[element].type=='bool'"
						v-model="config[element].value"
						:active-text="config[element].name"
					/>
					<div v-else>{{ config[element] }} {{ index }}</div>
				</el-tooltip>
			</template>
		</draggable>
		<!-- <div class="gridbox">
			<div v-for="configIndex in configIndexList">
				{{config[configIndex]}}
			</div>
		</div> -->
	</div>
</template>

<script>

import draggable from "vuedraggable";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSort,mdiRefresh, mdiClose } from '@mdi/js'
import {config,configIndexList} from '../buffer'
import data from '../setting/data'
import defaultconfig from '../setting/defaultconfig'

export default {
	components: {
		SvgIcon,
		draggable
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
			disableDrag:false
		}
	},
	methods:{
		switchDraggable(){
			this.disableDrag=!this.disableDrag
		},
		closesettingpanel(){
			this.settingpanelVisible=false;
		}
	}
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
		overflow:auto;
		grid-template-columns:repeat(2,50%);
	}
	.ghostGridbox{
		background: #fff;
	}
	/* .chosenGridbox{
		background: red;
	} */
</style>