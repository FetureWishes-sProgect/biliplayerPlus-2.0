<template>
	<TransitionGroup name="sorttransition">
		<div
			v-for="(element,index) in list"
			:key="index"
			:ref="'sortable'+index"
			:style="dragStartData.index==index?`transform:translate(${dragStartData.movex}px, ${dragStartData.movey}px)`:''"
			:class="dragStartData.index==index?`selectedSortable`:''"
			@mousedown="mousedown($event,index)"
			@dragenter="dragenter"
			@drop="drop"
		>
			<slot
				name="item"
				:element="element"
				:index="index"
			>
				aaa
			</slot>
		</div>
	</TransitionGroup>
</template>

<script>
export default {
	props:{
		list:[Array],
		disabled:Boolean
	},
	components: {},
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
		},
		dragenter(e){
			console.log("dragenter",e.pageX,e.pageY,this.dragStartData.x,this.dragStartData.y);
		},
		mouseup(e){
			document.removeEventListener("mousemove", this.mousemove);
			document.removeEventListener("mouseup", this.mouseup);
			let mousex=e.pageX,
				mousey=e.pageY;
			for(let i=0;i<this.list.length;i++){
				let left=this.$refs["sortable"+i][0].getBoundingClientRect().left,
					top=this.$refs["sortable"+i][0].getBoundingClientRect().top,
					width=this.$refs["sortable"+i][0].getBoundingClientRect().width,
					height=this.$refs["sortable"+i][0].getBoundingClientRect().height;
				console.log(
					left,
					top,
					width,
					height
				);
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
	.sorttransition-fade-enter-active {
		transition: all .3s ease;
	}
	.sorttransition-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.sorttransition-fade-enter, .sorttransition-fade-leave-to{
		height: 0;
		width: 0;
		opacity: 0;
	}
</style>