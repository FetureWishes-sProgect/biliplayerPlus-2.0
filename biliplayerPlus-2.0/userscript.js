export default {
	name:"bilibili 播放器增强",
	outputName:"bilibili 播放器增强",
	namespace: 'https://github.com/FetureWishes-sProgect/biliplayerPlus-2.0',
	version:"2.0.0",
	description:"快捷键设置,自动选择最高清画质、播放、全屏等",
	author:"FetureWishes-sProgect",
	license:"GPL-3.0",
	icon: 'https://static.hdslb.com/images/favicon.ico',
	match: [
		"*://www.bilibili.com/bangumi/play/ep*",
		"*://www.bilibili.com/bangumi/play/ss*",
		"*://www.bilibili.com/video/av*",
		"*://www.bilibili.com/video/BV*",
		"*://www.bilibili.com/s/video/BV*",
		"*://www.bilibili.com/video/bv*",
		"*://www.bilibili.com/watchlater/*",
		"*://www.bilibili.com/medialist/*"
	],
  }