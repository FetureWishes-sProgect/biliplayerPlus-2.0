export default{//默认设置
	defaultScreenSize:{//默认屏幕尺寸
		name:"默认屏幕尺寸",
		type:"select",
		title:`因浏览器限制，只有用户行为才能全屏（不会有人真的开始就全屏吧，不会吧不会吧）`,
		list:[{
			key:"default",
			content:"默认大小"
		},{
			key:"wide",
			content:"宽屏"
		},{
			key:"webFullScreen",
			content:"网页全屏"
		}],
		value:0
	},
	autoQuality:{//自动选择最高画质
		name:"自动选择最高画质",
		type:"bool",
		value:false
	},
	autoSpeed:{//还原上次的播放速度
		name:"还原上次的播放速度",
		title:"仅在自动开播或连播情况下生效",
		type:"bool",
		value:false
	},
	rangeTransition:{//滑动条动画
		name:"启用滑动条过渡动画",
		type:"bool",
		title:"开启后,滑动条滑动时会有0.1s的过渡动画效果，但可能会显得不跟手",
		value:false
	},
	useShadowRoot:{//shadowroot
		name:"启用shadowroot",
		type:"bool",
		title:"若设置面板样式异常可以尝试开启此项，需重开设置面板",
		value:false,
	},
	shortcutPreventDefault:{//取消快捷键默认行为
		name:"取消快捷键默认行为",
		type:"bool",
		title:"开启后,按快捷键不会触发默认行为（复制粘贴等）",
		value:false
	},
	keyBindOne2One:{
		name:"根据键位绑定快捷键",
		type:"bool",
		title:`关闭后将根据实际输出进行绑定，如"shift + a"和"shift + A"将视为不同的快捷键`,
		value:true
	},
	openSettingShortcut:{//快捷键打开设置
		name:"打开设置",
		type:"keyboard",
		value:"s",
		code:"KeyS",
		dependency:["keyBindOne2One"],
	},
	switchSpeedChange:{//快捷键打开设置
		name:"恢复默认速度/改变速度",
		type:"keyboard",
		title:"若更改过视频速度，则使用更改后的速度，否则使用设置中的默认速度",
		value:"z",
		code:"KeyZ",
		dependency:["keyBindOne2One"],
	},
	speedDown:{//减速
		name:"减速快捷键",
		type:"keyboard",
		value:"x",
		code:"KeyX",
		dependency:["keyBindOne2One"],
	},
	speedUp:{//加速
		name:"加速快捷键",
		type:"keyboard",
		value:"c",
		code:"KeyC",
		dependency:["keyBindOne2One"],
	},
	switchWide:{//切换宽屏
		name:"切换宽屏",
		type:"keyboard",
		value:",",
		code:"Comma",
		dependency:["keyBindOne2One"],
	},
	switchWebFullScreen:{//网页全屏
		name:"网页全屏",
		type:"keyboard",
		value:".",
		code:"Period",
		dependency:["keyBindOne2One"],
	},
	switchFullScreen:{//全屏
		name:"全屏",
		type:"keyboard",
		value:"/",
		code:"Slash",
		dependency:["keyBindOne2One"],
	},
	defaultSpeed:{//默认速度
		name:"默认播放速度",
		type:"range",
		start:0.1,
		end:10,
		step:0.1,
		value:1,
		dependency:["rangeTransition"],
	},
	defaultChangeSpeed:{//变速幅度
		name:"变速幅度",
		type:"range",
		start:0.05,
		end:1,
		step:0.05,
		value:0.1,
		dependency:["rangeTransition"],
	},
	touchHandler:{//触控设置
		name:"触屏处理",
		type:"checkbox",
		list:{
			touchProcess:{
				type:"hiddenSwitch",
				key:"touchProcess",//字段名
				name:"触屏控制进度",
				value:true
			},
			touchVolume:{
				type:"hiddenSwitch",
				key:"touchVolume",//字段名
				name:"触屏控制音量",
				value:true
			},
		},
		value:[
			"touchProcess",//指向type="hiddenSwitch"的对应键值
			"touchVolume",
		],
	},
	test1:{
		name:"测试1",
		type:"folder",
		children:[
			"test2",
			"test3",
		],
		test2:{
			name:"测试1",
			type:"folder",
			children:[
				"test2",
				"test3",
			],
			test2:{//全屏
				name:"全屏",
				type:"keyboard",
				value:`=`,
				code:"Slash",
				dependency:["keyBindOne2One"],
			},
			test3:{//默认速度
				name:"默认播放速度",
				type:"range",
				start:0.1,
				end:10,
				step:0.1,
				value:1,
				dependency:["rangeTransition"],
			},
		},
		test3:{//默认速度
			name:"默认播放速度",
			type:"range",
			start:0.1,
			end:10,
			step:0.1,
			value:1,
			dependency:["rangeTransition"],
		},
	},
}