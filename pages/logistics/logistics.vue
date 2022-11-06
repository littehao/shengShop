<template>
	<view class="logistics-page bgf4f4 active-header-bg">
		<comHead backshow :titleshow="true" color="#fff" class="active-header-bg" title="物流信息"></comHead>
		<view class="page-main">
			<view class="bgffff mx-2 my-3 p-2 rounded-lg flex justify-start align-center mb-5">
				<view class="" style="width: 164rpx;height: 164rpx;">
					<image :src="img" style="width: 164rpx;height: 164rpx;" mode="aspectFit"></image>
				</view>
				<view class="flex-1 flex flex-column justify-center align-start pl-2 boxsizing">
					<text class="fs-24"> 物流状态：<text class="ft556E">{{Info && Info.express.Now_Status || "-"}}</text> </text>
					<text class="my-1 fs-24"> 物流公司：<text class="">{{Info && Info.express.ExpressName || "-"}}</text> </text>
					<text class="fs-24"> 物流单号：<text class="">{{Info && Info.express.Express_Num || '-'}}</text> </text>
				</view>
			</view>
			<view class="bgffff mx-2 p-4 rounded-lg boxsizing">
				<template v-if="tracesData && tracesData.length > 0">
					<block v-for="(item, index) in tracesData" :key="index">
						<track-node :is-first="index===tracesData.length-1" :is-last="index===0" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></track-node>
					</block>
				</template>
				<nulldata text="暂无物流动态" v-else></nulldata>
			</view>
		</view>
		<view class="" style="height: 50px;"></view>
		<Loading ref="Load" style="z-index: 99999;"></Loading>
	</view>
</template>

<script>
	import {mapActions} from 'vuex';
	import myApi from '@/api/myApi.js'
	import trackNode from "./components/trackNode.vue";
	import Loading from "@/components/loading/loading.vue";
	import comHead from '@/components/header/index.vue';
	import nulldata from '@/components/null-data/index.vue';
	export default {
		components:{comHead,trackNode,Loading,nulldata},
		data() {
			return {
				tracesData: [],
				Info:null,
				order_no:null,
				goods_id:null
			}
		},
		computed:{
			img(){
				if(this.Info){
				  return this.Info.img[0];
				}else{
					return ""
				}
			}
		},
		onLoad(query) {
			this.order_no = query.order_no;
			if(query.goods_id){
				this.goods_id = query.goods_id
			}
		},
		mounted() {
			this.$refs.Load&&this.$refs.Load.show();
			this.getExpressQuery();
		},
		methods:{
			async getExpressQuery(){
				let data = {
					type:1,
					order_no:this.order_no,
					goods_id:this.goods_id
				}
				myApi.getExpressQuery(data).then(res => {
					this.$refs.Load.hide();
					this.Info = res.data;
					this.tracesData = res.data.express.list;
				}).catch(e => {
					this.$refs.Load.hide();
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.logistics-page {
		min-height: 100vh;
	}
	.active-header-bg{
		height: 100%;
		background-image: url(../../static/images/orderdetail_bg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;
	}
</style>
