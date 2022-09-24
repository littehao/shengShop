<template>
	<mescroll-uni ref="mescrollRef"
		:fixed="fixed" 
		:down="downOption" 
		:up="upOption"
		@init="mescrollInit"
		@down="downCallback" 
		@up="upCallback"
		@scroll="scrollFn"
	>
		<slot/>
	</mescroll-uni>
</template>

<script>
	export default {
		props:{
			fixed:{
				type:Boolean,
				default:false,//false 高度跟随父元素
			},
			downOptionUse:{//下拉刷新是否启用
				type:Boolean,
				default:true
			},
			upOptionAuto:{//初始化完毕之后自动执行一次上拉加载的回调
				type:Boolean,
				default:false
			},
			upOptionUse:{ // 是否启用上拉加载
				type:Boolean,
				default:true
			},
			isSuccess:{//判断是否加载成功
				type:Boolean,
				default:false
			},
			pagelen:{// 每页数据长度
				type:Number,
				default:19
			},
			datalen:{// 数据长度
				type:Number,
				default:0
			}
		},
		data(){
			return {
				mescroll:null,
				upOption:{
					use:this.upOptionUse,//是否启用上拉加载
					onScroll:true,//监听滚动事件
					textNoMore:'暂无更多数据',//没有更多数据的提示文本
					auto: this.upOptionAuto,//是否在初始化完毕之后自动执行一次上拉加载的回调
					noMoreSize: 5,//数量要大于5条才显示无更多数据
					page: {
						num: 0,
						size: 20 // 每页数据的数量,默认10
					},
					empty: {//列表第一页无任何数据时,显示的空布局
						use: false//是否启用
					},
					textLoading: '加载中...',//上拉加载中的文本
					toTop: {//回到顶部按钮的配置
						safearea: true,
						bottom: "15%"
					}
				},
				downOption: {
					use:this.downOptionUse,//是否启用下拉刷新
					auto: false,//是否在初始化完毕之后自动执行一次下拉刷新的回调 
				},
			}
		},
		watch:{
			isSuccess(){// 监听加载完成后关闭状态
				const next = this.datalen > this.pagelen
				setTimeout(()=>{
					this.mescroll.endSuccess(this.datalen, next);
				},500)
			}
		},
		methods:{
			mescrollInit(mescroll){
				this.mescroll = mescroll
			},
			downCallback(){
				this.mescroll.resetUpScroll();
			},
			upCallback(mescroll){
				this.$emit('loadData',mescroll.num)
			},
			scrollFn(e){
				this.$emit('scrollFn',e)
			}
		}
	}
	

</script>

<style>

</style>