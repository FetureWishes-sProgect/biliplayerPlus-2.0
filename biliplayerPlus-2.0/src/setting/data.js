let data={
	settingName: 'bilibili播放器plus设置',//设置面板标题
	elementMapper:[{//不同页面元素映射至一致
			filter:/(video\/[AaBb][Vv])|(watchlater)|(medialist)/,//正则
			settingRootElement:`[aria-label="哔哩哔哩播放器"]`,//设置面板的挂载节点
			showElement:`[aria-label="哔哩哔哩播放器"]`,//全屏时的最大元素
			videoTag:"#bilibili-player video",//video标签
			videoTag_replace:"#bilibili-player bwp-video",//video标签
			settingIcon:".bpx-player-ctrl-setting .bpx-player-ctrl-btn-icon",//设置按钮
			qualityItems:".bpx-player-ctrl-quality-menu-item ",//画质选择按钮
			wideIcon:".bpx-player-ctrl-wide",//宽屏按钮
			webFullScreenIcon:".bpx-player-ctrl-web",//网页全屏按钮
			fullScreenIcon:".bpx-player-ctrl-full",//全屏按钮
			qualityControlBar:".bpx-player-ctrl-quality-menu",//原生画质切换面板
			speedControlBar:".bpx-player-ctrl-playbackrate",//原生速度切换面板
			highlightBar:".bpx-player-pbp",//高能进度条
			touchControlMask:".bilibili-player-dm-tip-wrap",//原生视频遮罩
		},{
			filter:/bangumi/,
			settingRootElement:`[aria-label="哔哩哔哩播放器"]`,//设置面板的挂载节点
			showElement:`[aria-label="哔哩哔哩播放器"]`,
			videoTag:"#bilibili-player video",
			settingIcon:".squirtle-video-setting .squirtle-setting-icon",
			qualityItems:".bui-select-quality-menu .bui-select-list .bui-select-item",
			wideIcon:".squirtle-video-widescreen",//宽屏按钮
			webFullScreenIcon:".squirtle-video-pagefullscreen",//网页全屏按钮
			fullScreenIcon:".squirtle-video-fullscreen",//全屏按钮
			qualityControlBar:".squirtle-video-quality .squirtle-select-list",//原生画质切换面板
			speedControlBar:".squirtle-video-speed .squirtle-select-list",//原生速度切换面板
			highlightBar:"#bilibili_pbp",//高能进度条
			touchControlMask:".bilibili-player-dm-tip-wrap",//原生视频遮罩
		},
	],
	maxInitTimes:6,//最大初始化次数
	coreVersion:"1.0",//内核版本
}
for(let i=0;i<data.elementMapper.length;i++) {
	if(data.elementMapper[i].filter.test(window.location.href)){
		data.elementMapper=data.elementMapper[i];
		break;
	}
}
//此部分在脚本运行过程中不会更改
export default data;