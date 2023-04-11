<template>
	<el-space>
		{{ setting.name }}
		<el-button
			:disabled="disabled"
			@keydown="keydown"
			@blur="blur"
		>
			{{ setting[hotkeymanager.nowKeyType] }}
		</el-button>
	</el-space>
</template>

<script>
import {useConfigStore} from 'store/config-store'
import {useHotkeysStore} from 'store/hotkeys-store';

export default {
	props:["setting","disabled","keyname","path"],
	data(){
		return {
			hotkeymanager:useHotkeysStore(),
		}
	},
	computed:{
		config(){
			return useConfigStore().config;
		},
	},
	mounted(){
		this.hotkeymanager.changebind(this.keyname,{
			code:this.setting.code,
			value:this.setting.value
		});
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
				let result=this.hotkeymanager.keyBindOne2One?codeText:valueText;
				let keyboard=this.hotkeymanager.findFunc(result);
				console.log(keyboard);
				if (keyboard&&keyboard!=this.keyname) {
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
		},
		blur(e){
			this.hotkeymanager.changebind(this.keyname,{
				code:this.setting.code,
				value:this.setting.value
			});
			useConfigStore().saveConfig(this.path);
		}
	}
}
</script>

<style>

</style>