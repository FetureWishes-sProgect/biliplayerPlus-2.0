<template>
	<div class="settingpanel">
		<div style="position:relative;width:100%;text-align:center;font-size:16px;line-height:40px;">
			settingpanelName
		</div>
		<div class="btnlist">
			<svg-icon type="mdi" :path="mdiRefresh"></svg-icon>
			<svg-icon type="mdi" :path="mdiClose"></svg-icon>
		</div>
	</div>
</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiRefresh, mdiClose } from '@mdi/js'

export default {
	components: {
		SvgIcon
	},
	data() {
		return {
			mdiRefresh,
			mdiClose
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
</style>