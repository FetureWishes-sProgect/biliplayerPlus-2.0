import { defineStore } from 'pinia'
import defaultconfig from 'setting/defaultconfig'

export const useConfigStore = defineStore('config', {
	state: () => {
		return defaultconfig
	},
	actions:{
		reset(){
			this.$patch(defaultconfig);
		}
	}
})