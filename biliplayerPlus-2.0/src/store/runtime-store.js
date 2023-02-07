import { defineStore } from 'pinia'

export const useRuntimeStore = defineStore('runtime', {
	state: () => {
		return {
			settingpanelVisible:false,
		};
	},
	actions:{
		switchSettingpanelVisible(){
			console.log("切换设置面板");
			this.settingpanelVisible=!this.settingpanelVisible;
		},
		closesettingpanel(){
			this.settingpanelVisible=false;
		},
	}
})