
let preInit=()=>{//预初始化
	//根据网址得到标签选择器
	this.getElementMapper();
	this.mixin();
	this.versionUpdater();
	console.log("开始初始化键盘映射");
	for (const key in this.config) {
		let element = this.config[key];
		let {type,value,code}=element;
		if(type=="keyboard"){
			this.keyboardBindList[key]=element;
		}
	}
	// 组件顺序映射
	for (let i = 0; i < Object.keys(this.config).length; i++) {
		let key = Object.keys(this.config)[i]
		this.configIndexList.push(key);
	}
	console.log("this.configIndexList",this.configIndexList)
	console.log("键盘映射初始化完成，开始监听键盘事件");
	this.bindKeyBoardListener();
	console.log("成功监听键盘事件，开始注册脚本设置项");
	GM_registerMenuCommand(this.settingName, this.switchSettingPanel.bind(this));
	console.log("成功注册脚本设置项");
	this.init();

	//路由改变重新初始化，同类型页面且无刷新页面时适用
	this.listenHistoryChange(()=>{
		this.init();
	});
}

let init=()=>{//按照时钟周期性初始化，只有当需要的元素出来时才会初始化
	let settingControlInit=()=>{
		if(this.maxInitTimes){
			setTimeout(() => {
				try {
					console.log("初始化开始，更改屏幕尺寸");
					let {list,value}=this.config.defaultScreenSize;
					switch (list[value].key) {
						case "wide":
							if (this.iswideScreen()) {

							}else{
								this.wideSwitch();
							}
							break;
						case "webFullScreen":
							if (this.isfullScreen()) {

							}else{
								this.webFullScreenSwitch();
							}
							break;
						default:
							break;
					};
					console.log("屏幕尺寸更改完毕，开始调节视频速度");
					if (this.config.autoSpeed.value) {
						let speed=Cookies.get("videoSpeed");
						let defaultSpeed=speed?speed:this.config.defaultSpeed.value;
						this.changeVideoSpeed(defaultSpeed);
						this.messageShow("已自动调整速度为"+defaultSpeed+"倍");
					}
					this.controlBarInit();
					console.log("初始化已完成");
				} catch (error) {
					console.error("播放器控制栏未加载完成，等待重新开始");
					console.error(error);
					this.maxInitTimes--;
					settingControlInit();
				}
			}, 1000);
		}
	};
	settingControlInit();
}

export default {
	preInit,
	init
}