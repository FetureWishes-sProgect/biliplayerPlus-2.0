<template>
	<el-space>
		{{ setting.name }}
		<el-button
			:disabled="disabled"
			@keydown="keydown"
		>
			{{ config.keyBindOne2One.value?setting.code:setting.value }}
		</el-button>
	</el-space>
</template>

<script>
import {config} from '^/src/buffer'
import {useHotkeysStore} from 'store/hotkeys-store';

export default {
	props:["setting","disabled","keyname"],
	data(){
		return {
			config,
			hotkeymanager:useHotkeysStore(),
		}
	},
	mounted(){
		let keycode=this.config.keyBindOne2One.value?this.setting.code:this.setting.value;
		let alternative=this.config.keyBindOne2One.value?this.setting.value:this.setting.code;
		this.hotkeymanager.changebind(this.keyname,keycode,alternative);
	},
	methods:{
		keydown(e){
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
				let result=this.config.keyBindOne2One.value?codeText:valueText;
				let keyboard=this.hotkeymanager.findFunc(result);
				console.log(keyboard);
				if (keyboard&&keyboard!=this.key) {
					console.log(`快捷键与 "${this.config[keyboard].name}" 冲突`);
					valueText=this.setting.value;
					codeText=this.setting.code;
				}else{
					this.setting.value=valueText;
					this.setting.code=codeText;
				}
			}
			e.stopPropagation();
			e.preventDefault();
		}
	}
}
</script>

<style>

</style>