<template>
	<div></div>
</template>

<script>
import { useConfigStore } from "store/config-store";
import BigNumber from "bignumber.js";
import data from "setting/data";
import {useHotkeysStore} from 'store/hotkeys-store'
import {useRuntimeStore} from 'store/runtime-store'

import { message } from "ant-design-vue";
import "ant-design-vue/lib/message/style/css";

export default {
	components: {},
	data() {
		return {};
	},
	mounted() {
		document.addEventListener("keydown", (e) => {
			let valueText = "",
				codeText = "";
			if (e.ctrlKey) {
				valueText += `Control`;
				codeText += `Control`;
			}
			if (e.altKey) {
				if (valueText) valueText += ` + `;
				if (codeText) codeText += ` + `;
				valueText += `Alt`;
				codeText += `Alt`;
			}
			if (e.shiftKey) {
				if (valueText) valueText += ` + `;
				if (codeText) codeText += ` + `;
				valueText += `Shift`;
				codeText += `Shift`;
			}
			if (e.key !== "Control" && e.key !== "Alt" && e.key !== "Shift") {
				if (valueText) valueText += ` + `;
				if (codeText) codeText += ` + `;
				valueText += e.key;
				codeText += e.code;
				let result = this.hotkeymanager.keyBindOne2One ? codeText : valueText;
				let keyboard = this.hotkeymanager.findFunc(result);
				if (keyboard) {
					//触发对应的函数
					//   this.hotkeysHandler[keyboard].call(this);
					this[keyboard]();
				}
			}
			e.stopPropagation();
			e.preventDefault();
		});
	},
	computed: {
		config() {
			return useConfigStore().config;
		},
		hotkeymanager(){
			return useHotkeysStore();
		},
		runtimeStore(){
			return useRuntimeStore();
		}
	},
	methods: {
		openSettingShortcut() {
			this.runtimeStore.switchSettingpanelVisible();
		},
		switchSpeedChange() {

		},
		speedUp() {
			let defaultChangeSpeed = this.config.defaultChangeSpeed.value;
			let videoTag = document.querySelector(data.elementMapper.videoTag);
			let speed = videoTag.playbackRate;
			let nextSpeed = new BigNumber(speed).plus(defaultChangeSpeed);
			if (nextSpeed >= 0.1 && nextSpeed <= 16) {
				videoTag.playbackRate = nextSpeed;
					message.open({
					content: `播放速度增加至 ${videoTag.playbackRate}`,
					key: "0",
				});
			}
		},
		speedDown() {
			let defaultChangeSpeed = this.config.defaultChangeSpeed.value;
			let videoTag = document.querySelector(data.elementMapper.videoTag);
			let speed = videoTag.playbackRate;
			let nextSpeed = new BigNumber(speed).minus(defaultChangeSpeed);
			if (nextSpeed >= 0.1 && nextSpeed <= 16) {
				videoTag.playbackRate = nextSpeed;
				message.open({
					content: `播放速度增加至 ${videoTag.playbackRate}`,
					key: "0",
				});
			}
		},
		switchWide() {
			let wideIcon = document.querySelector(data.elementMapper.wideIcon);
			wideIcon.click();
		},
		switchWebFullScreen() {
			let webFullScreenIcon = document.querySelector(
				data.elementMapper.webFullScreenIcon
			);
			webFullScreenIcon.click();
		},
		switchFullScreen() {
			let fullScreenIcon = document.querySelector(
				data.elementMapper.fullScreenIcon
			);
			fullScreenIcon.click();
		},
	},
};
</script>

<style scoped>
</style>