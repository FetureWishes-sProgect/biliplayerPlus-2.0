import BigNumber from 'bignumber.js';
import data from "setting/data";

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
//调用时需要绑定this才可调用vue组件
export default{
	openSettingShortcut:function(){
		this.switchSettingpanelVisible();
	},
	speedUp:function(){
		let defaultChangeSpeed=this.config.defaultChangeSpeed.value;
		let videoTag=document.querySelector(data.elementMapper.videoTag);
		let speed=videoTag.playbackRate;
		let nextSpeed=new BigNumber(speed).plus(defaultChangeSpeed);
		if(nextSpeed>=0.1&&nextSpeed<=16){
			videoTag.playbackRate=nextSpeed;
			ElMessage({
				message:`播放速度增加至 ${videoTag.playbackRate}`,
				type:"success",
				icon:null,
				center:true
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
			let a=ElMessage({
				message:`播放速度减少至 ${videoTag.playbackRate}`,
				type:"success",
				icon:null,
				center:true
			});
		}
	},
}