import {GM_listValues,GM_getValue} from '$'
import defaultconfig from './setting/defaultconfig'


let config = GM_listValues(),
	configIndexList = [],//设置面板顺序
	gridListSettingMapper = {},//网格列表
	keyboardBindList = {},//已用按键列表
	touchList = {};//触屏按下的手指列表

console.log("开始混入设置");
let configBuffer=JSON.parse(JSON.stringify(defaultconfig));
//首次运行
if(config.length==0){
	config=configBuffer;
}else{
	for(let i=0;i<config.length;i++){
		let key=config[i];
		let value=GM_getValue(key, configBuffer[key]);
		configBuffer[key]=value;
	}
	config=configBuffer;
}
console.log("已混入设置，开始生成设置项顺序");
for(let i=0;i<Object.keys(config).length;i++) {
	let key = Object.keys(config)[i];
	configIndexList.push(key);
}
console.log("设置项顺序已完成，顺序为"+configIndexList);
//此部分在脚本运行过程中的临时变量
export {
	config,
	configIndexList,//设置面板顺序
	gridListSettingMapper,//网格列表
	keyboardBindList,//已用按键列表
	touchList,//触屏按下的手指列表
}