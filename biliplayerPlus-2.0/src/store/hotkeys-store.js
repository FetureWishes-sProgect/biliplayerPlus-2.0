import { defineStore } from 'pinia'

export const useHotkeysStore = defineStore('hotkeys', {
	state: () => {
		return {
			key2bind:{//实际触发时，按键触发什么功能
				// "keyS":"openSetting"
			},
			bind2key:{//设置面板中，功能和哪个绑定
				// "opensetting":"keyS"
			},
			useAlternative:false
		}
	},
	actions:{
		changebind(name,keycode,alternative){
			//没有按键绑定，才能设置\
			if(!this.key2bind[keycode]){
				let oldkey=this.useAlternative?this.bind2key[name].alternative:this.bind2key[name].keycode;
				this.bind2key[name]={
					keycode,
					alternative
				};
				this.key2bind[keycode]=name;
				if(oldkey){
					delete this.key2bind[oldkey];
				}
			}
		},
		findFunc(keycode){
			console.log(this.key2bind,this.bind2key,keycode);
			return this.key2bind[keycode];
		},
		switchMode(){
			this.key2bind={};
			for(let i=0;i<Object.keys(bind2key).length;i++){
				let name=Object.keys(bind2key)[i];
				let newkey;
				if(this.useAlternative){
					newkey=this.bind2key[name].alternative;
				}else{
					newkey=this.bind2key[name].keycode;
				}
				this.key2bind[newkey]=name;
			}
			this.useAlternative=!this.useAlternative;
		}
	}
})