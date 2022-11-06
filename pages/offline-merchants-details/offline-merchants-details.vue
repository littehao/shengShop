<template>
	<view class="offline-merchants-details bgF5F5F5 position-relative">
		<view class="position-absolute top-0 left-0 right-0">
			<image
				class="flex" 
				:src="product_imgs[0]" 
				mode="aspectFill" 
				style="width: 750rpx;height: 452rpx;">
			</image>
			<view class="glass position-absolute top-0 left-0 right-0" style="width: 750rpx;height: 452rpx;"></view>
		</view>
		<view class="fixed-top" style="height: 44px;">
			<comHead></comHead>
			<view class="flex align-center justify-between px-1">
				<text class="headerbtn  back" @click="back"></text>
			</view>
		</view>
		
		<view class="mx-2 position-relative" style="top:calc(60px + var(--status-bar-height));" >
			<view class="bgffffff rounded p-3">
				<view class="fs-40 font-weight-bold ft333333">{{merchantData.merchant_name}}</view>
				<view class="flex align-center mt-1 mb-2">
					<view class="flex align-center">
						<tui-rate :current="Number(merchantData.score)" :size="16" active="#EA4E3D"></tui-rate>
						<text class="ml-1 ftEA4E3D fs-28">{{merchantData.score}}</text>
					</view>
					<text class="ft666666 fs-28 ml-1">￥{{merchantData.avg_price}}/人</text>
				</view>
				<view>
					<scroll-view :scroll-x="true" style="white-space: nowrap;">
						<view class="w-100 flex">
							<block v-for="(item,index) in product_imgs" :key="index">
								<view class="flex mr-1">
									<image class="flex rounded bgF5F5F5" :src="item" @click="previewImage(product_imgs,index)" mode="aspectFill" style="width: 268rpx;height: 200rpx"></image>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
				<view class="my-3">
					<text class="ft666666 fs-28">营业时间：{{merchantData.business_time_desc}}</text>
				</view>
				<view class="flex align-center border-top py-2">
					<view class="flex flex-column flex-1">
						<view class="flex align-center mb-1" @tap="openLocation">
							<text class="iconfont icon-dingwei fs-28 ft333333"></text>
							<text class="ft333333 fs-28 ml-2">{{merchantData.detail_address}}</text>
						</view>
						<text class="fs-24 ft999999 ml-5">距离{{distanceMx}}km</text>
					</view>
					<view class="flex flex-column ml-4 justify-end" style="width: 60rpx;" @tap="telFun">
						<image class="flex" src="../../static/images/tel.png" mode="widthFix" style="width: 52rpx;height: 52rpx;"></image>
						<text class="fs-24 ft333333 mt-1">电话</text>
					</view>
				</view>
			</view>
			<view class="my-2">
				<v-tabs v-model="model" 
				activeColor="#E7331F" 
				bgColor="#F5F5F5" 
				class="tabfiexd border-bottom border-top" 
				style="top: calc(65px + var(--status-bar-height));" 
				:tabs="tabsList"
				field="name" 
				@change="clickTab" 
				lineColor="#E7331F" 
				lineHeight="3px" 
				:lineScale="0.3" 
				height="50px" 
				width="25%" 
				:fontbold="true">
				</v-tabs>
			</view>
			<null-data class="mx-auto"
				style="height: 100px;width: 100px;margin-bottom: 50px;"></null-data>
		</view>
		
	</view>
</template>

<script>
	import { distance } from "@/utils/common.js"
	import merchantApi from '@/api/merchantApi.js'
	import comHead from '@/components/header/index.vue';
	import vTabs from "@/components/v-tabs/v-tabs.vue";
	import nullData from "@/components/null-data/index.vue";
	export default {
		components: {
			comHead,
			vTabs,
			nullData
		},
		data() {
			return {
				id:'',
				model:0,
				tabsList:[{name:'套餐',id:1}],
				merchantData:{},
				location:null,
				distanceMx:0,//距离
				product_imgs:[
					// 'https://fs-shop.oss-cn-chengdu.aliyuncs.com/shhw/Test/images/2022-08-14/3254d4a453e5d290971859c168cbe9a0.jpg',
					// 'https://fs-shop.oss-cn-chengdu.aliyuncs.com/shhw/Test/images/2022-08-14/4532058ffbd268125bc5356a61a084ed.jpg',
					// 'https://fs-shop.oss-cn-chengdu.aliyuncs.com/shhw/Test/images/2022-08-14/4532058ffbd268125bc5356a61a084ed.jpg',
				]
			}
		},
		onLoad(query) {
			this.id = query.id
			this.downMerchantInfo()
		},
		methods: {
			previewImage(product_imgs,index){
				uni.previewImage({
					current:index,
					urls: product_imgs
				});
			},
			downMerchantInfo(){
				let location = uni.getStorageSync('location')
				merchantApi.downMerchantInfo({id:this.id}).then(res => {
					this.merchantData = res.data
					const {latitude, longitude} = this.merchantData.merchantappend
					this.distanceMx = distance(latitude,longitude,location) || 0
					console.log(this.distanceMx)
					this.product_imgs = res.data.merchantappend.product_imgs || []
				})
			},
			telFun(){
				uni.makePhoneCall({
					phoneNumber: this.merchantData.merchantappend.mobile_phone, //电话号码
					success: function(e) {
						console.log(e);
					},
					fail: function(e) {
						console.log(e);
					}
				})
			},
			openLocation(){
				let self = this;
				// #ifdef H5
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == "micromessenger") {
					window.location.href = `https://uri.amap.com/marker?position=${Number(self.merchantData.merchantappend.longitude)},
					${Number(self.merchantData.merchantappend.latitude)}&name=${self.merchantData.merchantappend.address}
					&address=${self.merchantData.detail_address}`;
				}
				//#endif
				// #ifdef APP-PLUS
				uni.openLocation({
					latitude: Number(this.merchantData.merchantappend.latitude),
					longitude: Number(this.merchantData.merchantappend.longitude),
					name:this.merchantData.merchantappend.address,
					address:this.merchantData.detail_address,
					success: function () {
						console.log('success');
					},
					fail:function (e) {
						console.log(e);
					},
				});
				//#endif
			},
			clickTab(index){
				
			},
			back() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
.offline-merchants-details{
	min-height: 100vh;
	// background-image: url('../../static/images/balance_bg.png');
	// background-size: 100%;
	// background-position: center top; 
	// background-repeat: no-repeat;
	.glass{
		backdrop-filter: blur(10px);
	}
	.headerbtn {
		width: 44px;
		height: 44px;
		background-size: 56rpx;
		background-repeat: no-repeat;
		background-position: center;
	}
	
	.back {
		background-image: url(../../static/images/back1.png);
	}
	
}
</style>
