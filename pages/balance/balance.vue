<template>
	<view class="balace-page bgF5F5F5" :class="bgActive">
		<com-head :titleshow="true" :title="title" color="#fff" :backshow="true" class="header-bg" :class="bgActive"></com-head>
		<view class="balace-main px-2 pb-4">
			<view class="pt-5 pb-3 flex justify-between">
				<view class="ftffff">
					<view class="fs-28">我的{{title}}</view>
					<view class="fs-60">{{balance}}</view>
				</view>
				<view class="flex flex-column justify-end pb-1 ftffff" v-if="category == 11">
					<view class="btn-wh ft333333 bgffff fs-24" @click="navTo()">充值</view>
				</view>
			</view>
			<view class="bgffffff rounded px-2 py-4 mb-2 text-center" v-if="category == 1">
				<view class="fs-32 font-weight-bold mb-2">工分兑换绿分累计总值</view>
				<view class="fs-40 ft999999">{{lvfenToal}}</view>
			</view>
			<template v-if="List">
				<template v-if="Object.keys(List).length > 0">
					<view class="bgffff rounded px-3 pt-3 mb-2" v-for="(val,key,i) in List" :key="i">
						<view class="mb-2">{{key}}</view>
						<view class="py-3 border-bottom border-light-secondary not-border" v-for="(item,index) in val" :key="index">
							<view class="fs-30 ft9999">{{item.remark}}</view>
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
		data() {
			return {
				page:1,
				List:null,
				temList:[],
				loadText:"加载中...",
				month_tatal:0,
				all_total:0,
				title:'',
				category:'',
				lvfenToal:0,
			}
		},
		computed:{
			...mapGetters(['getUser']),
			balance(){
				if(this.category == 9){
					return (this.getUser && Number(this.getUser.fine_bean).toFixed(2)) || 0
				} else if(this.category == 10){
					return (this.getUser && Number(this.getUser.available_integral).toFixed(2)) || 0
				} else if(this.category == 1){
					return (this.getUser && Number(this.getUser.available_rc_balance).toFixed(2)) || 0
				} else if(this.category == 11){
					return (this.getUser && Number(this.getUser.with_draw_balance).toFixed(2)) || 0
				}
			},
			bgActive(){
				if(this.title == '绿分'){
					return 'lvbg'
				}
			}
		},
		onLoad(query) {
			this.title = query.title
			this.category  = query.category
			this.category == 1 && this.gongtolvTotal()
		},
		mounted() {
			this.$refs.loading.show();
			this.getbalanceAllListFn();
		},
		onShow() {
			if(this.List)
			this.getbalanceAllListFn();
		},
		onReachBottom(){
			if(this.temList.length > 19){
				this.page ++ ;
				this.getbalanceAllListFn();
			}else{
				this.loadText = '没有更多数据了'
			}
		},
		methods:{
			getbalanceAllListFn(){
				let data = {
					page:this.page,
					limit:20,
					category:this.category
				}
				myApi.getbalanceAllList(data).then(res => {
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
			gongtolvTotal(){
				myApi.gongtolvTotal().then(res => {
					this.lvfenToal = Number(res.data.totao_add_balance || 0).toFixed(2)
				})
			},
			navTo(){
				uni.navigateTo({
					url:`/pages/recharge-juan/recharge-juan`
				})
			}
		},
		components:{
			comHead,
			nulldata,
			loading
		}
	}
</script>

<style lang="scss" scoped>
	.balace-page{
		min-height: 100vh;
		background-image: url(../../static/images/gongfenbg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;
		&.lvbg{
			background-image: url(../../static/images/lvfenbg.png);
		}
		.header-bg{
			height: 100%;
			background-image: url(../../static/images/gongfenbg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
			&.lvbg{
				background-image: url(../../static/images/lvfenbg.png);
			}
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
