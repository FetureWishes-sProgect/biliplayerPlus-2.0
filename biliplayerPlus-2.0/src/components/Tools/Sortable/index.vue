<template>
	<TransitionGroup
		name="sorttransition"
	>
		<div
			v-for="(element,index) in list"
			:key="JSON.stringify(element)"
			:ref="'sortable'+index"
			:class="dragEndData.startIndex==index?`selectedSortableContainer`:``"
			@mousedown="mousedown($event,index)"
		>
			<div
				:class="[
					dragStartData.index==index?`selectedSortable`:'',
					'usetransitionInSort'
				]"
			>
				<slot
					name="item"
					:element="element"
					:index="index"
				>
					no data
				</slot>
			</div>
		</div>
	</TransitionGroup>
</template>

<script>
import { TransitionGroup } from 'vue';

export default {
	props:{
		list:[Array],
		disabled:Boolean,
		duration:{
			type:Number,
			default:0.5
		}
	},
	components: { TransitionGroup },
	data() {
		return {
			dragStartData:{
				index:-1,
				x:0,
				y:0,
			},
			dragEndData:{
				startIndex:-1,
				movex:0,
				movey:0,
			},
			mousemovetime:0,
		};
	},
	mounted() {
	},
	computed: {
		durationCssStr(){
			return this.duration+"s";
		}
	},
	methods: {
		//获取父元素
		getParentAutoScrollElement(el, includeSelf) {
			function css(el, prop, val) {
				let style = el && el.style;

				if (style) {
					if (val === void 0) {
						if (document.defaultView && document.defaultView.getComputedStyle) {
							val = document.defaultView.getComputedStyle(el, '');
						}
						else if (el.currentStyle) {
							val = el.currentStyle;
						}

						return prop === void 0 ? val : val[prop];
					}
					else {
						if (!(prop in style) && prop.indexOf('webkit') === -1) {
							prop = '-webkit-' + prop;
						}

						style[prop] = val + (typeof val === 'string' ? '' : 'px');
					}
				}
			}
			function getWindowScrollingElement() {
				let scrollingElement = document.scrollingElement;

				if (scrollingElement) {
					return scrollingElement
				} else {
					return document.documentElement
				}
			}
			// skip to window
			if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();

			let elem = el;
			let gotSelf = false;
			do {
				// we don't need to get elem css if it isn't even overflowing in the first place (performance)
				if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
					let elemCSS = css(elem);
					if (
						elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') ||
						elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')
					) {
						if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();

						if (gotSelf || includeSelf) return elem;
						gotSelf = true;
					}
				}
			/* jshint boss:true */
			} while (elem = elem.parentNode);

			return getWindowScrollingElement();
		},
		scroll(e){
			if(this.dragEndData.startIndex!==-1)return;
			let scrolly = e.target.scrollTop-this.dragStartData.scrollTop,
				scrollx=e.target.scrollLeft-this.dragStartData.scrollLeft;
			let node=document.querySelector(".selectedSortable")
			node.style.setProperty('--scrollx', `${scrollx}px`);
			node.style.setProperty('--scrolly', `${scrolly}px`);
			node.style.transform=`translate(calc(var(--movex) + var(--scrollx)), calc(var(--movey) + var(--scrolly)))`;
			node.style.transition=`unset`;
			// console.log(node);
		},
		mousemove(e){
			let time=this.mousemovetime++%10;
			if(time==0){
				let movex=e.pageX-this.dragStartData.x,
					movey=e.pageY-this.dragStartData.y;
				let node=document.querySelector(".selectedSortable");
				node.style.setProperty('--movex', `${movex}px`);
				node.style.setProperty('--movey', `${movey}px`);
				node.style.transform=`translate(calc(var(--movex) + var(--scrollx)), calc(var(--movey) + var(--scrolly)))`;
				node.style.transition=`unset`;
				this.mousemovetime = time;
			}
		},
		mousedown(e,index){
			//左键点击
			if(e.button!=0)return;
			//是否禁用
			if(this.disabled)return;
			//是否正在拖拽
			if(this.dragStartData.index!=-1)return;
			let scrollElementContainer=this.getParentAutoScrollElement(e.target,true);
			this.dragStartData={
				index,
				x:e.pageX,
				y:e.pageY,
				scrollTop:scrollElementContainer.scrollTop,
				scrollLeft:scrollElementContainer.scrollLeft
			}

			scrollElementContainer.addEventListener("scroll",this.scroll);
			document.addEventListener("mousemove", this.mousemove);
			document.addEventListener("mouseup", this.mouseup);
			e.preventDefault();
			e.stopPropagation();
		},
		mouseup(e){
			document.removeEventListener("mousemove", this.mousemove);
			document.removeEventListener("mouseup", this.mouseup);
			let mousex=e.pageX,
				mousey=e.pageY,
				lastRange=null;
			let movex=e.pageX-this.dragStartData.x,
				movey=e.pageY-this.dragStartData.y;
			let endindex=this.dragStartData.index;

			for(let i=0;i<this.list.length;i++){
				let left=this.$refs["sortable"+i][0].getBoundingClientRect().left,
					right=this.$refs["sortable"+i][0].getBoundingClientRect().right,
					top=this.$refs["sortable"+i][0].getBoundingClientRect().top,
					bottom=this.$refs["sortable"+i][0].getBoundingClientRect().bottom;
				if(mousey<bottom){
					if(top<mousey&&left<mousex&&mousex<right){
						//在里面
						let listItem=this.list[this.dragStartData.index];
						if(this.dragStartData.index<i){
							this.list.splice(i+1,0,listItem);
							this.list.splice(this.dragStartData.index,1);
						}else{
							this.list.splice(i,0,listItem);
							this.list.splice(this.dragStartData.index+1,1);
						}
						endindex=i;
						console.log("找到了，在"+i+"里面");
						break;
					}else{
						//不在里面，判断前后之间的关系
						if(lastRange){
							if(lastRange.left==left&&lastRange.right==right){
								//上下关系，上下大小一样
								let listItem=this.list[this.dragStartData.index];
								this.list.splice(i,0,listItem);
								if(this.dragStartData.index<i){
									this.list.splice(this.dragStartData.index,1);
								}else{
									this.list.splice(this.dragStartData.index+1,1);
								}
								endindex=i;
								console.log("在"+i+"上方");
								break;
							}else if(lastRange.top==top&&lastRange.bottom==bottom){
								//左右关系,只取左侧的
								if(mousex<left){//不需要判断lastRange，在之前会被其他分支拦截
									let listItem=this.list[this.dragStartData.index];
									this.list.splice(i,0,listItem);
									if(this.dragStartData.index<i){
										this.list.splice(this.dragStartData.index,1);
									}else{
										this.list.splice(this.dragStartData.index+1,1);
									}
									//不会出现第一个分支，所以可以-1
									endindex=i-1;
									console.log("在"+i+"左侧");
									break;
								}else if(mousex<right &&mousey<top){
									//在上面
									let listItem=this.list[this.dragStartData.index];
									this.list.splice(i,0,listItem);
									if(this.dragStartData.index<i){
										this.list.splice(this.dragStartData.index,1);
									}else{
										this.list.splice(this.dragStartData.index+1,1);
									}
									//不会出现第一个分支，所以可以-1
									endindex=i-1;
									console.log("在"+i+"上面");
									break;
								}
							}else if(lastRange.bottom<top){
								//换行关系，去除掉上下关系之后的
								if(mousex>lastRange.right||mousex<left){
									let listItem=this.list[this.dragStartData.index];
									this.list.splice(i,0,listItem);
									if(this.dragStartData.index<i){
										this.list.splice(this.dragStartData.index,1);
									}else{
										this.list.splice(this.dragStartData.index+1,1);
									}
									endindex=i;
									console.log("在"+i+"之前换行");
									break;
								}
							}
						}else if(mousex<left||mousey<top){
							//第一个元素之前
							let listItem=this.list[this.dragStartData.index];
							this.list.splice(i,0,listItem);
							if(this.dragStartData.index<i){
								this.list.splice(this.dragStartData.index,1);
							}else{
								this.list.splice(this.dragStartData.index+1,1);
							}
							endindex=i;
							console.log("在"+i+"之前");
							break;
						}
					}
				}

				lastRange={
					left,
					right,
					top,
					bottom
				}
			}
			//用以后续恢复
			let node=document.querySelector(".selectedSortable");
			node.addEventListener("transitionend",this.afterMove);
			this.$nextTick(()=>{
				node.style=``;
			});
			this.dragEndData = {
				startIndex:endindex,
				movex,
				movey
			};
			let selectedSortableContainer=document.querySelector(".selectedSortableContainer");
			let scrollElementContainer=this.getParentAutoScrollElement(selectedSortableContainer,true);
			scrollElementContainer.removeEventListener("scroll",this.scroll);
		},
		afterMove(e){
			//不监听子元素的事件
			if(e.target!==e.currentTarget)return;

			console.log("还原dragData");
			let node=document.querySelector(".selectedSortable");
			node.removeEventListener("transitionend",this.afterMove);

			this.dragStartData={
				index:-1,
				x:0,
				y:0,
			}
			this.dragEndData = {
				startIndex:-1,
				movex:0,
				movey:0
			};
		}
	},
};
</script>

<style scoped>
	.usetransitionInSort{
		--scrollx:0px;
		--scrolly:0px;
		--movex:0px;
		--movey:0px;
		transition: all v-bind("durationCssStr");
	}
	.sorttransition-move {
		z-index: 50;
		transition: transform v-bind("durationCssStr");
	}

	.sorttransition-enter-active, .sorttransition-leave-active {
		transition:all 1s;
	}
	.sorttransition-enter, .sorttransition-leave-to{
		height: 0;
		width: 0;
		opacity: 0;
	}
	.selectedSortableContainer{
		z-index: 100;
	}
	.selectedSortable{
		position: relative;
		z-index: 100;
		transform: translate(0,0);
	}
</style>