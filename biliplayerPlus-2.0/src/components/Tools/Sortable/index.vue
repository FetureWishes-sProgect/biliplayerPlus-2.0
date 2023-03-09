<template>
	<TransitionGroup name="sorttransition" appear>
		<div
			v-for="(element,index) in list"
			:key="index"
			:ref="'sortable'+index"
			@mousedown="mousedown($event,index)"
		>
			<div
				:style="dragStartData.index==index?`transform:translate(${dragStartData.movex}px, ${dragStartData.movey}px)`:''"
				:class="['item',dragStartData.index==index?`selectedSortable`:'']"
			>
				<slot
					name="item"
					:element="element"
					:index="index"
				>
					aaa
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
			mousemovetime:0
		};
	},
	mounted() {
	},
	updated(){
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
				this.mousemovetime = time;
			}
		},
		mousedown(e,index){
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
			this.dragStartData={
				index:-1,
				x:0,
				y:0,
			}
		}
	},
};
</script>

<style scoped>
	.selectedSortable{
		position: relative;
		z-index: 100;
	}
	.item{
		margin-top: 20px;
	}
	.sorttransition-enter-active, .sorttransition-leave-active {
		transition:all 2s;
	}
	.sorttransition-enter, .sorttransition-leave-to{
		height: 0;
		width: 0;
		opacity: 0;
	}
	.sorttransition-move {
		transition: transform 2s;
	}
</style>