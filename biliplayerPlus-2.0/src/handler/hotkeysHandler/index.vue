<template>
	<div>
		<div v-show="showFlag" class="settingpanel">{{ message }}</div>
	</div>
</template>

<script>
import { useConfigStore } from "store/config-store";
import BigNumber from "bignumber.js";
import data from "setting/data";
import { useHotkeysStore } from 'store/hotkeys-store'
import { useRuntimeStore } from 'store/runtime-store'

export default {
	components: {},
	data() {
		return {
			showFlag: false,
			message: null,
			start: undefined
		};
	},
	mounted() {
		document.addEventListener("keydown", (e) => {
			//表单输入时不触发
			if (e.target.tagName == "INPUT") return;

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
					e.stopPropagation();
					e.preventDefault();
				}
			}
		});
	},
	computed: {
		config() {
			return useConfigStore().config;
		},
		hotkeymanager() {
			return useHotkeysStore();
		},
		runtimeStore() {
			return useRuntimeStore();
		}
	},
	methods: {
		step(timestamp) {
			if (this.start === undefined) {
				this.start = timestamp;
			}
			const elapsed = timestamp - this.start;
			if (elapsed < 2000) {
				window.requestAnimationFrame(this.step);
			} else {
				this.showFlag = false;
			}
		},
		openSettingShortcut() {
			this.runtimeStore.switchSettingpanelVisible();
		},
		switchSpeedChange() {
			let defaultSpeed = this.config.defaultSpeed.value;
			let videoTag = document.querySelector(data.elementMapper.videoTag);
			let nowSpeed = videoTag.playbackRate;
			let nextSpeed = 1;
			//切换到倍速模式
			if (nowSpeed == 1) {
				if (this.runtimeStore.bufferSpeed) {
					nextSpeed = this.runtimeStore.bufferSpeed;
					delete this.runtimeStore.bufferSpeed;
				} else {
					nextSpeed = defaultSpeed;
				}
			} else {
				//切换回1倍速
				nextSpeed = 1; s
				//保存当前速度
				this.runtimeStore.bufferSpeed = nowSpeed;
			}

			if (nowSpeed == nextSpeed) return;

			if (nextSpeed >= 0.1 && nextSpeed <= 16) {
				//改变速度
				videoTag.playbackRate = nextSpeed;
				this.message = `播放速度切换至 ${videoTag.playbackRate}`
				this.start = performance.now();
				window.requestAnimationFrame(this.step);
				this.showFlag = true;
			}
		},
		speedUp() {
			let defaultChangeSpeed = this.config.defaultChangeSpeed.value;
			let videoTag = document.querySelector(data.elementMapper.videoTag);
			let speed = videoTag.playbackRate;
			let nextSpeed = new BigNumber(speed).plus(defaultChangeSpeed);
			if (nextSpeed >= 0.1 && nextSpeed <= 16) {
				videoTag.playbackRate = nextSpeed;
				this.message = `播放速度增加至 ${videoTag.playbackRate}`
				this.start = performance.now();
				window.requestAnimationFrame(this.step);
				this.showFlag = true;
			}
		},
		speedDown() {
			let defaultChangeSpeed = this.config.defaultChangeSpeed.value;
			let videoTag = document.querySelector(data.elementMapper.videoTag);
			let speed = videoTag.playbackRate;
			let nextSpeed = new BigNumber(speed).minus(defaultChangeSpeed);
			if (nextSpeed >= 0.1 && nextSpeed <= 16) {
				videoTag.playbackRate = nextSpeed;
				this.message = `播放速度减少至 ${videoTag.playbackRate}`
				this.start = performance.now();
				window.requestAnimationFrame(this.step);
				this.showFlag = true;
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
.settingpanel {
	position: fixed;
	padding-left: 20px;
	width: 180px;
	height: 50px;
	top: calc(50% - 25px);
	left: calc(50% - 90px);
	line-height: 50px;
	background: rgba(33, 33, 33, .8);
	border-radius: 2px;
	box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
	box-sizing: border-box;
	z-index: 99999;
	color: #ffffff;
	user-select: none;
}
</style>