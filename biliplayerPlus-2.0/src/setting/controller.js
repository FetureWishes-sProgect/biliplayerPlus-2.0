
resetSetting() {
	let configlist=GM_listValues();
	this.config=JSON.parse(JSON.stringify(this.default));
	for (let i=0; i<configlist.length; i++) {
		let key=configlist[i];
		this.saveValue(key);
	}
	console.log("已重置设置");
}

export default{
	resetSetting
}