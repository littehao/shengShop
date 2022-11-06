<template>
	<view class="balace-page bgF5F5F5">
		<com-head :titleshow="true" :title="title" color="#fff" :backshow="true" class="header-bg"></com-head>
		<view class="balace-main px-2 pb-4">
			<view class="pt-5 pb-3 flex justify-between">
				<view class="ftffff">
					<view class="fs-28">我的{{title}}</view>
					<view class="fs-60">{{getUser && Number(getUser.fine_bean) || 0}}</view>
				</view>
			</view>
			<view class="flex justify-around rounded px-2 mb-2 py-3">
				<view 
				class="fs-28 flex-1 text-center ftffffff tab position-relative font-weight-bold" 
				:class="category == 1?'active':''"
				 @click="changeTab(1)">
					<view>个人收益</view>
					<view>{{getUser.person_income || '0.00'}}</view>
				</view>
				<view 
				class="fs-28  flex-1 text-center ftffffff tab position-relative font-weight-bold" 
				:class="category == 2?'active':''" 
				@click="changeTab(2)">
					<view>团队收益</view>
					<view>{{getUser.team_income || '0.00'}}</view>
				</view>
			</view>
			<template v-if="List">
				<template v-if="Object.keys(List).length > 0">
					<view class="bgffff rounded px-3 pt-3 mb-2" v-for="(val,key,i) in List" :key="i">
						<view class="mb-2">{{key}}</view>
						<view class="py-3 border-bottom border-light-secondary not-border" v-for="(item,index) in val" :key="index">
							<view class="fs-30 ft9999" :style="{color:item.color}">{{item.remark}}</view>
							<view class="flex justify-between align-center fs-24 mb-3">
								<view class="fs-30" :style="{color:item.change_money.includes('-')?'#1ca20b':'#ea361f'}">{{item.change_money}}<text class="fs-24 fta0a0 pl-2">余额：{{item.change_after}}</text></view>
								<view class="fs-24 ft9999">{{item.created_at}}</view>
							</view>
						</view>
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
		components:{
			comHead,
			nulldata,
			loading
		},
		data() {
			return {
				page:1,
				List:null,
				temList:[],
				loadText:"加载中...",
				month_tatal:0,
				all_total:0,
				title:'',
				category:1,
				balance:0
			}
		},
		computed:{
			...mapGetters(['getUser'])
		},
		onLoad(query) {
			this.title = query.title
		},
		mounted() {
			this.$refs.loading.show();
			this.profitAllListFn();
		},
		onShow() {
			if(this.List)
			this.profitAllListFn();
		},
		onReachBottom(){
			if(this.temList.length > 19){
				this.page ++ ;
				this.profitAllListFn();
			}else{
				this.loadText = '没有更多数据了'
			}
		},
		methods:{
			profitAllListFn(){
				let data = {
					page:this.page,
					limit:20,
					category:this.category
				}
				myApi.profitAllList(data).then(res => {
					this.$refs.loading.hide();
					this.temList = res.data;
					let list = res.data
					if(this.page == 1)this.List = {};
					let itemData = this.List;
					list.forEach( item =>{
						if(itemData.hasOwnProperty(item.year_month)){
							itemData[item.year_month].push(item)
						}else{
							itemData[item.year_month] = [item];
						}
					})
					this.List  = itemData;
				})
			},
			changeTab(type){
				this.category = type
				this.page = 1
				this.List =[]
				this.profitAllListFn()
			}
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
		.tab.active::after{
			content: '';
			display: block;
			width: 40rpx;
			height: 6rpx;
			background-color: #fff;
			position: absolute;
			left:45%;
			bottom: -5px;
			border-radius: 10px;
		}
	}
</style>
