/**
 * 控制用户脚本所有版本的更新逻辑，用于更改不同版本的配置结构
 * @param {string} oldVersion 旧版本号
 * @param {string} newVersion 新版本号
 */
versionUpdateHandler(oldVersion, newVersion){
	console.log(`旧版本为${oldVersion}，新版本为${newVersion}，请编写更新函数以更新脚本配置`);
}

/**
 * 控制tampermonkey所有版本的更新逻辑，用于更改不同版本的配置结构
 * @param {string} oldVersion 旧版本号
 * @param {string} newVersion 新版本号
 */
coreUpdateHandler(oldVersion, newVersion){
	console.log(`旧版本为${oldVersion}，新版本为${newVersion}，请编写更新函数以更新脚本配置`);
}

versionUpdater(){
	console.log("检测版本更新");
	function compareVersion(version1, version2) {
		const arr1 = version1.split('.');
		const arr2 = version2.split('.');
		const length1 = arr1.length;
		const length2 = arr2.length;
		const minlength = Math.min(length1, length2);
		let i = 0;
		for (i ; i < minlength; i++) {
			let a = parseInt(arr1[i]);
			let b = parseInt(arr2[i]);
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			}
		}
		if (length1 > length2) {
			for(let j = i; j < length1; j++) {
				if (parseInt(arr1[j]) != 0) {
					return 1;
				}
			}
			return 0;
		} else if (length1 < length2) {
			for(let j = i; j < length2; j++) {
				if (parseInt(arr2[j]) != 0) {
					return -1;
				}
			}
			return 0;
		}
		return 0;
	}
	//升级内核版本
	if(this.config.coreVersion){
		if(compareVersion(this.coreVersion,this.config.coreVersion.value)==1){
			console.log("正在升级内核版本");
			this.coreUpdateHandler(this.config.version.value,this.coreVersion);
			this.config.coreVersion.value=this.coreVersion;
			this.saveValue("coreVersion");
			console.log("内核版本号保存完毕");
		}else{
			console.log("内核已是最新版本");
		}
	}else{
		console.log("未保存内核版本号，正在保存");
		this.config.coreVersion={
			type:"hidden",
			value:this.coreVersion
		}
		this.saveValue("coreVersion");
		console.log("内核版本号保存完毕");
	}
	//用户脚本版本升级
	if(this.config.version){
		if(compareVersion(GM_info.script.version,this.config.version.value)==1){
			console.log("正在更新版本");
			this.versionUpdateHandler(this.config.version.value,GM_info.script.version);
			this.config.version.value=GM_info.script.version;
			this.saveValue("version");
			console.log("版本号保存完毕");
		}else{
			console.log("已是最新版本");
		}
	}else{
		console.log("未保存版本号，正在保存");
		this.config.version={
			type:"hidden",
			value:GM_info.script.version
		}
		this.saveValue("version");
		console.log("版本号保存完毕");
	}
}

export default {
	versionUpdateHandler,
	coreUpdateHandler,
	versionUpdater
}