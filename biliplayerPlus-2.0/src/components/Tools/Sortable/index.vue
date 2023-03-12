<template>
	<TransitionGroup
		name="sorttransition"
	>
		<div
			v-for="(element,index) in list"
			:key="JSON.stringify(element)"
			:ref="'sortable'+index"
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
		disabled:Boolean
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
	},
	methods: {
		mousemove(e){
			let time=this.mousemovetime++%10;
			if(time==0){
				let movex=e.pageX-this.dragStartData.x,
					movey=e.pageY-this.dragStartData.y;
				let node=document.querySelector(".selectedSortable");
				node.style.transform=`translate(${movex}px, ${movey}px)`;
				node.style.transition=`unset`;
				this.mousemovetime = time;
			}
		},
		mousedown(e,index){
			if(this.disabled)return;
			if(e.button!=0)return;
			this.dragStartData={
				...this.dragStartData,
				index,
				x:e.pageX,
				y:e.pageY
			}
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
			this.dragEndData = {
				startIndex:this.dragStartData.index,
				movex,
				movey
			};

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
								console.log("在"+i+"上方");
								break;
							}else if(lastRange.top==top&&lastRange.bottom==bottom){
								//左右关系
								let listItem=this.list[this.dragStartData.index];
								this.list.splice(i,0,listItem);
								if(this.dragStartData.index<i){
									this.list.splice(this.dragStartData.index,1);
								}else{
									this.list.splice(this.dragStartData.index+1,1);
								}
								console.log("在"+i+"左侧");
								break;
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
			this.$nextTick(()=>{
				node.style=``;
				this.afterMove();
			});
		},
		afterMove(){
			console.log("还原dragStartData");
			this.dragStartData={
				index:-1,
				x:0,
				y:0,
			}
			// this.dragEndData = {movex:0,movey:0};
		}
	},
};
</script>

<style scoped>
	.selectedSortable{
		position: relative;
		z-index: 100;
		transform: translate(0,0);
	}
	.usetransitionInSort{
		transition: all .5s;
	}

	.sorttransition-enter-active, .sorttransition-leave-active {
		transition:all 1s;
	}
	.sorttransition-enter, .sorttransition-leave-to{
		height: 0;
		width: 0;
		opacity: 0;
	}
	.sorttransition-move {
		transition: transform .5s;
	}
</style>