import { defineStore } from 'pinia'
import defaultconfig from 'setting/defaultconfig'
import {exportmixin,mixin,unflattenObj,flattenObj} from 'setting/configTool'
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
			if(JSON.stringify(this.configIndexList) == JSON.stringify([...Object.keys(defaultconfig)])){
				GM_deleteValue("configIndexList");
			}else{
				GM_setValue("configIndexList", this.configIndexList);
			}
		},
		saveConfig(path){
			let exportdata;
			if(path){//只更新部分
				eval(`exportdata=exportmixin(defaultconfig.${path},this.config.${path})`);
				let newconfig=GM_getValue("config",{});
				console.log(JSON.stringify(exportdata));
				if(JSON.stringify(exportdata)==`{}`){
					//去扁平化删除内容
					newconfig=unflattenObj(newconfig);
					delete newconfig[path];
					//删除后重新扁平化
					newconfig=flattenObj(newconfig);
				}else{
					for (const key in exportdata) {
						const value = exportdata[key];
						newconfig[path+"."+key]=value;
					}
				}
				GM_setValue("config", newconfig);
			}else{
				exportdata=exportmixin(defaultconfig,this.config)
				GM_setValue("config", exportdata);
			}
		},
		setconfig(key, value){
			//只处理字符串    
			if(typeof key !== 'string')return;
			this.config[key]=value;
		}
	}
})