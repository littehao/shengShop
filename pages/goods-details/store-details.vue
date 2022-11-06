<template>
	<view class="store-details bgF5F5F5">
		<template v-if="merchant">
			<comHead backshow titleshow color="#fff"  class="headbg">
				<template>
					<view class="position-absolute" style="left: 44px;top:50%;transform: translateY(-50%);" slot="left">
						<text class="fs-30 ftffff font-weight-bold">{{merchant.merchant_name}}</text>
					</view>
				</template>
			</comHead>
			<view class="store-info">
				<view class="flex align-center mx-3 position-relative pt-5">
					<image  style="width: 120rpx;height: 120rpx;flex-shrink: 0;" class="rounded storeLogo" :src="merchant.logo" mode="aspectFill"></image>
					<view class="ml-2">
						<view class="fs-30 ftffff font-weight-bold pt-1">{{merchant.merchant_name}}</view>
						<view class="fs-26 ftffff text-ellipsis" style="width: 430rpx;">{{merchant.merchant_introduction || '-'}}</view>
					</view>
					<view class="ml-2">
						<view class="w-100 pt-1" style="height: 40upx;"></view>
						<text class="ftffff fs-24" @click="clickshop()">资质 >></text>
					</view>
				</view>
				<view class="bgffff rounded-top-lg pt-4" style="margin-top: -8px;">
					<view class="flex align-center border-bottom pb-2">
						<view class="flex flex-column text-center flex-1">
							<text class="fs-36 font-weight-bold ft3333">{{merchant.all_num}}</text>
							<text class="fs-24 ft8385">全部商品</text>
						</view>
						<view class="flex flex-column text-center flex-1">
							<text class="fs-36 font-weight-bold ft3333">{{merchant.new_products}}</text>
							<text class="fs-24 ft8385">上新</text>
						</view>
						<view class="flex flex-column text-center flex-1">
							<text class="fs-36 font-weight-bold ft3333">{{merchant.hot_sale}}</text>
							<text class="fs-24 ft8385">热销</text>
						</view>
						<view class="flex flex-column text-center flex-1">
							<text class="fs-36 font-weight-bold ft3333">{{merchant.collect_num}}</text>
							<text class="fs-24 ft8385">收藏</text>
						</view>
					</view>
					<view class="flex align-center justify-around py-3">
						<text class="fs-28 ft3333 orderly-item" :class="{active:activeIndex == 0}" @click="changeTab(0)">默认</text>
						<text class="fs-28 ft3333 orderly-item" :class="{active:activeIndex == 1}" @click="changeTab(1)">销量</text>
						<text class="fs-28 ft3333 orderly-item" :class="{active:activeIndex == 2}" @click="changeTab(2)">上新</text>
						<text class="fs-28 ft3333 orderly-item price pr-3" :class="[{active:activeIndex == 3},active]" @click="changeTab(3)">价格</text>
					</view>
				</view>
			</view>
			
			<view class="home-shop-list flex  flex-wrap  py-2  pl-2 pr-2">
				<block v-for="(item,index) in goods" :key="index">
					<bottom-card :item="item" class="shop-item"></bottom-card>
				</block>
			</view>
			<view v-if="goods.length > 19" class="flex align-center justify-center  fs-28 ft3333">{{loadingtext}}</view>
		</template>
		<loading  ref="loading"></loading>
		<image v-show="showBtn" src="../../static/images/mescroll-totop.png" class="uni-top position-fixed" mode="" @click="gopageTop()"></image>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue'
	import bottomCard from '@/components/card/home-bottom-card.vue';
	import loading from '@/components/loading/loading.vue';
	import  {mapActions,mapGetters}  from 'vuex'
	let timer = null;
	let timerTop = null;
	export default {
		components:{comHead,bottomCard,loading},
		data() {
			return {
				activeIndex:0,
				merchant_id:null,
				merchant:null,
				goods:[],
				page:1,
				temList:[],
				loadingtext:"加载中...",
				active:"",
				column:"sort",
				direction:"",
				sort:['sort','sales_volume','created_at','sale_price'],
				showBtn:false
			};
		},
		onLoad(query) {
			this.merchant_id = query.merchant_id;
		},
		mounted() {
			this.$refs.loading.show();
			this.GetmerchantDetail();
		},
		onReachBottom(){
			if(this.temList.length > 19){
				this.page ++;
				this.getGoodsList();
			}else{
				this.loadingtext = '没有更多数据了'
			}
		},
		methods:{
			GetmerchantDetail(){
				goodsApi.merchantDetail({merchant_id:this.merchant_id}).then(res => {
					this.$refs.loading.hide();
					this.merchant  = res.data;
					this.getGoodsList();
				}).catch(e => {
					this.$refs.loading.hide();
				})
			},
			getGoodsList(){//商品列表
				let data  = {
					page:this.page,
					limit:20,
					merchant_id:this.merchant_id,
					column:this.column
				}
				if(this.direction)data.direction  = this.direction;
				goodsApi.goodsList(data).then(res => {
					this.temList  = res.data;
					if(this.page ==  1){
						this.goods =  res.data;
					}else{
						this.goods = this.goods.concat(res.data);
					}
				}).catch(e => {})
			},
			changeTab(index){
				this.activeIndex  = index;
				this.column = this.sort[index];
				if(index == 3){
					if(!this.active)this.active  = 'down'
					if(this.active == 'down'){
						this.active  = 'up'
						this.direction = 'asc'
					}else{
						this.active  = 'down'
						this.direction = 'desc'
					}
				}else{
					this.active = ''
					this.direction = ''
				}
				this.getGoodsList();
			},
			clickshop(){
				// 店铺资质 
				uni.navigateTo({
					url:"/pages/goods-details/shop-info?id="+this.merchant_id
				})
			},
			gopageTop(){
				// 回顶
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
		},
		onPageScroll(e) {
			if(timerTop)return;
			let _this = this;
			// e.scrollTop 获取页面的滚动高度
			timerTop = setTimeout((scrollTop)=>{
				_this.showBtn = scrollTop >= 1000;
				clearTimeout(timerTop);
				timerTop = null;
			},200,e.scrollTop);
		},
	}
</script>

<style lang="less">
.store-details{
	min-height: 100vh;
	background-repeat: no-repeat;
	background-position: center top;
	background-size: 100% 400rpx;
	background-image: url(../../static/images/qgPage-bg.png);
	.storeLogo{
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover;
		background-image: url(../../static/logo.png);
	}
	.headbg{
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 100%;
		background-image: url(../../static/images/qgPage-bg.png);
	}
	.store-info{
		.price{
			background-repeat: no-repeat;
			background-position: right center;
			background-size: 10px;
			background-image: url(../../static/images/orderly.png);
		}
		.orderly-item.active{
			color:#E2231A;
			&.up{
				background-image: url(../../static/images/up.png);
			}
			&.down{
				background-image: url(../../static/images/down.png);
			}
		}
	}
	.storetab{
		background-repeat: no-repeat;
		background-position: center bottom;
		background-size: 52rpx 8rpx;
		&.active{
			color: #FF3335;
		}
	}
	.shop-item{
		margin-right: 2%;
	}
	.shop-item:nth-child(2n){
		margin-right:0;
	}
	.uni-top{
		z-index: 9990;
		left: auto;
		right: 15px;
		bottom: 10%;
		width: 36px;
		border-radius: 50%;
		height: 36px;
		opacity: 1;
		transition: all 0.5s;
	}
}
</style>
