import BigNumber from 'bignumber.js';
import data from "setting/data";
import { h } from 'vue'
import { ElMessage } from 'element-plus'

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
				message: h('p', null, [
				  h('span', null, 'Message can be '),
				  h('i', { style: 'color: teal' }, 'VNode'),
				]),
			  })
		}
	},
	speedDown:function(){
		let defaultChangeSpeed=this.config.defaultChangeSpeed.value;
		let videoTag=document.querySelector(data.elementMapper.videoTag);
		let speed=videoTag.playbackRate;
		let nextSpeed=new BigNumber(speed).minus(defaultChangeSpeed);
		if(nextSpeed>=0.1&&nextSpeed<=16){
			videoTag.playbackRate=nextSpeed;
			ElMessage({
				message: h('p', null, [
				  h('span', null, 'Message can be '),
				  h('i', { style: 'color: teal' }, 'VNode'),
				]),
			  })
		}
	},
}