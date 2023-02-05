import BigNumber from 'bignumber.js';
import data from "setting/data";

import { message } from 'ant-design-vue';
import 'ant-design-vue/lib/message/style/css'
//调用时需要绑定this才可调用vue组件
export default{
	openSettingShortcut:function(){
		this.switchSettingpanelVisible();
	},
	switchSpeedChange:function () {
		
	},
	speedUp:function(){
		let defaultChangeSpeed=this.config.defaultChangeSpeed.value;
		let videoTag=document.querySelector(data.elementMapper.videoTag);
		let speed=videoTag.playbackRate;
		let nextSpeed=new BigNumber(speed).plus(defaultChangeSpeed);
		if(nextSpeed>=0.1&&nextSpeed<=16){
			videoTag.playbackRate=nextSpeed;
			message.open({
				content:`播放速度增加至 ${videoTag.playbackRate}`,
				key:"0",
			});
		}
	},
	speedDown:function(){
		let defaultChangeSpeed=this.config.defaultChangeSpeed.value;
		let videoTag=document.querySelector(data.elementMapper.videoTag);
		let speed=videoTag.playbackRate;
		let nextSpeed=new BigNumber(speed).minus(defaultChangeSpeed);
		if(nextSpeed>=0.1&&nextSpeed<=16){
			videoTag.playbackRate=nextSpeed;
			message.open({
				content:`播放速度增加至 ${videoTag.playbackRate}`,
				key:"0",
			});
		}
	},
	switchWide:function () {
		let wideIcon=document.querySelector(data.elementMapper.wideIcon);
		wideIcon.click();
	},
	switchWebFullScreen:function () {
		let webFullScreenIcon=document.querySelector(data.elementMapper.webFullScreenIcon);
		webFullScreenIcon.click();
	},
	switchFullScreen:function () {
		let fullScreenIcon=document.querySelector(data.elementMapper.fullScreenIcon);
		fullScreenIcon.click();
	},

}