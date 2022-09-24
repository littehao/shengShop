<template>
	<view class="balace-page bgf4f4">
		<com-head :titleshow="true" :title="title" color="#fff" :backshow="true" class="header-bg"></com-head>
		<view class="balace-main px-2 pb-4">
			<view class="pt-5 pb-3 flex justify-between">
				<view class="ftffff text-center">
					<view class="fs-24">我的{{title}}</view>
					<view class="fs-60">{{(getUser && Number(getUser.red_count)) || 0}}</view>
				</view>
			</view>
			<template v-if="List">
				<template v-if="List.length > 0">
					<view class="border-bottom border-light-secondary not-border bgffff rounded mx-2 mb-1 p-3" 
					v-for="(item,index) in List" :key="index">
						<view class="fs-30 ft9999 flex align-center justify-between mb-2">
							<text class="ft3333">红包数量:{{item.red_count}}</text>
							<text class="fs-28">{{item.created_at}}</text>
						</view>
						<view class="flex justify-between align-center fs-24 mb-2">
							<view class="fs-30">收益金额:<text class="fs-30 fta0a0 pl-2" style="color:#ea361f">{{item.owner_money}}</text></view>
							<text class="fs-28 ft9999">{{item.status == 1?'未开':'已开包'}}</text>
						</view>
						<view class="fs-28 ft9999" v-if="item.opened_at">开包时间:{{item.opened_at}}</view>
					</view>
					<view v-if="temList.length > 19" class="flex align-center justify-center  ft9999 fs-28">{{loadText}}</view>
				</template>
				<template v-else>
					<view style="height: 100px;"></view>
					<nulldata></nulldata>
				</template>
			</template>
			<loading ref="loading"></loading>
		</view>
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import comHead from "@/components/header/index.vue";
	import loading from '@/components/loading/loading.vue'
	import nulldata from '@/components/null-data/index.vue'
	import { mapActions,mapGetters } from "vuex";
	export default {
		data() {
			return {
				page:1,
				List:null,
				temList:[],
				loadText:"加载中...",
				month_tatal:0,
				all_total:0,
				title:'',
				category:1
			}
		},
		computed:{
			...mapGetters(['getUser']),
		},
		onLoad(query) {
			this.title = query.title
		},
		mounted() {
			this.$refs.loading.show();
			this.sendRedPackOrderListFn();
		},
		onShow() {
			if(this.List)
			this.sendRedPackOrderListFn();
		},
		onReachBottom(){
			if(this.temList.length > 19){
				this.page ++ ;
				this.sendRedPackOrderListFn();
			}else{
				this.loadText = '没有更多数据了'
			}
		},
		methods:{
			sendRedPackOrderListFn(){
				let data = {
					page:this.page,
					limit:20,
					status:this.category
				}
				myApi.sendRedPackOrderList(data).then(res => {
					this.$refs.loading.hide();
					this.temList = res.data;
					let list = res.data
					if(this.page == 1){
						this.List = list
					} else {
						this.List = this.List.concat(list);
					}
				}).catch(e => {
					this.$refs.loading.hide();
					this.List = {}
				})
			},
			changeTab(type){
				this.category = type
				this.page = 1
				this.List =[]
				this.sendRedPackOrderListFn()
			}
		},
		components:{
			comHead,
			nulldata,
			loading
		}
	}
</script>

<style lang="less" scoped>
	.balace-page{
		min-height: 100vh;
		background-image: url(../../static/images/balance_bg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;
		.header-bg{
			height: 100%;
			background-image: url(../../static/images/balance_bg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
		}
		.btn-wh{
			width: 92rpx;
			height: 48rpx;
			border-radius: 24rpx;
			line-height: 48rpx;
			text-align: center;
		}
		.not-border{
			&:nth-last-of-type(1){
				border: 0;
			}
		}
	}
</style>
