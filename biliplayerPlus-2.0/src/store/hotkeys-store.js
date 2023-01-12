import { defineStore } from 'pinia'
import {useConfigStore} from 'store/config-store'

export const useHotkeysStore = defineStore('hotkeys', {
	state: () => {
		return {
			// key2bind:{//实际触发时，按键触发什么功能
			// 	// "keyS":"openSetting"
			// },
			bind2key:{//设置面板中，功能和哪个绑定
				// "opensetting":"keyS"
			},
			key2bindOne2One:{
				// "s":"openSetting"
			},
			key2bindNotOne2One:{
				// "keyS":"openSetting"
			}
			// keyBindOne2One:false
		}
	},
	getters:{
		key2bind(state){
			if(this.keyBindOne2One)
				return state.key2bindOne2One;
			return state.key2bindNotOne2One;
		},
		keyBindOne2One(){
			return useConfigStore().config.keyBindOne2One.value;
		},
		nowKeyType(state){
			if(this.keyBindOne2One)
				return "code";
			return "value";
		}
	},
	actions:{
		changebind(name,{code,value}){
			let keycode=this.keyBindOne2One?code:value;
			//没有按键绑定，才能设置\
			if(!this.key2bind[keycode]){
				//保存旧值
				let oldkey=this.bind2key[name];

				this.bind2key[name]={code,value};

				this.key2bindOne2One[code]=name;
				this.key2bindNotOne2One[value]=name;
				//如果绑定了别的，则取消挂载
				if(oldkey){
					delete this.key2bindOne2One[oldkey.code];
					delete this.key2bindNotOne2One[oldkey.value];
				}
			}
		},
		findFunc(keycode){
			return this.key2bind[keycode];
		},
	}
})