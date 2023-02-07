import { defineStore } from 'pinia'
import defaultconfig from 'setting/defaultconfig'
import {exportmixin,mixin} from 'setting/configTool'
import {GM_setValue,GM_deleteValue,GM_getValue} from '$'

export const useConfigStore = defineStore('config', {
	state: () => {
		let storagedconfigIndexList=GM_getValue("configIndexList",[]);
		let config=mixin(defaultconfig,GM_getValue("config", {})),
			configIndexList=[//若有新设置项，则放在后面
				...storagedconfigIndexList,
				...Object.keys(defaultconfig)
			];
			//去除新旧设置中的重复项
			configIndexList=[...new Set(configIndexList)];
		return {
			config,
			configIndexList
		};
	},
	actions:{
		reset(){
			GM_deleteValue("config");
			GM_deleteValue("configIndexList");
			this.$reset();
		},
		saveSettingOrder(){
			GM_setValue("configIndexList", this.configIndexList);
		},
		saveConfig(){
			let exportdata=exportmixin(defaultconfig,this.config);
			GM_setValue("config", exportdata);
		},
		setconfig(key, value){
			//只处理字符串    
			if(typeof key !== 'string')return;
			this.config[key]=value;
		}
	}
})