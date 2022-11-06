<template>
	<view class="main-page bgF5F5F5">
		<view class="main-content position-relative" :style="{height:'calc(100vh - 50px - ' +getbottom+ 'px)'}">
			<home-page v-if="activeIndex == 0" :isdot="isdot"></home-page>
			<class-page v-if="activeIndex == 1"></class-page>
			<car-pgae v-if="activeIndex == 2"></car-pgae>
			<my-pgae v-if="activeIndex == 3"></my-pgae>
			<paymentcode v-if="activeIndex == 4"></paymentcode>
		</view>
		
		<view class="position-fixed left-0 right-0 bottom-0 boxsizing border-top" style="z-index: 999;"
			:style="{height: 50 + getbottom + 'px'}">
			<view class="flex align-center mian-tab  nav-bg">
				<view class="flex flex-1 flex-column justify-center text-center" @click="changeTab(0,'home')"
					:class="{homeactive:activeIndex == 0}">
					<text class="tab_icon home mx-auto"></text>
					<text class="fs-24 ft9999 tab-text">推荐</text>
				</view>
				<view class="flex flex-1 flex-column justify-center text-center " @click="changeTab(1,'buy')"
					:class="{homeactive:activeIndex == 1}">
					<text class="tab_icon shequ mx-auto"></text>
					<text class="fs-24 ft9999 tab-text">分类</text>
				</view>
				<view class="flex flex-1 flex-column justify-center text-center" @click="changeTab(4,'buy')">
					<view class="mx-auto flex flex-column justify-center position-relative pt-5" style="height: 82rpx;">
						<image 
						class="mx-auto position-absolute top-0" 
						src="/static/images/saoma_icon.png" 
						mode="aspectFill" 
						style="width: 80rpx;height: 80rpx;"
						>
						</image>
						<text class="fs-24 ft9999 tab-text">付款码</text>
					</view>
				</view>
				<view class="flex flex-1 flex-column justify-center text-center " @click="changeTab(2,'car')"
					:class="{homeactive:activeIndex == 2}">
					<text class="tab_icon car mx-auto"></text>
					<text class="fs-24 ft9999 tab-text">购物车</text>
				</view>
				<view class="flex flex-1 flex-column justify-center text-center " @click="changeTab(3,'my')"
					:class="{homeactive:activeIndex == 3}">
					<text class="tab_icon my mx-auto"></text>
					<text class="fs-24 ft9999  tab-text">我的</text>
				</view>
			</view>
			<view :style="{height: getbottom+'px'}" class="bgffff position-relative" style="z-index: 99999;"></view>
		</view>
		<uni-popup ref="notice" type="dialog" style="z-index: 99999;" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<!-- <view class="fs-32 text-center p-4 pb-0 ft-purple">公告提醒</view> -->
				<view class="text-center fs-32 pt-3 px-2 font-weight-bolder">
					{{notice && notice.notice_title || ''}}
				</view>
				<scroll-view scroll-y="true" class="py-2" style="max-height: 50vh;">
					<view class="fs-28 ft3333 px-2 text-center"
						style="min-height: 100rpx;line-height: 60rpx;color: #606266;"
						v-html="notice&&notice.notice_content || ''"></view>
				</scroll-view>
				<view class="flex text-center pb-3">
					<view class="fs-28 btnBg ftffff flex align-center justify-center rounded-circle mx-auto py-2"
						style="width: 300rpx;" @click="$refs.notice.close()">我知道了</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="downLoad" type="center" style="z-index: 99999;" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0 mb-2">下载中... </view>
				<view class="progress-box  mx-auto" style="width: 500rpx;height: 50px;">
					<progress :percent="progress" activeColor="#FF4C00" stroke-width="8" />
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="useragreement" type="dialog" :maskClick="false" style="z-index: 99999;">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0">用户须知</view>
				<view class="fs-28 ft3333 p-2 text-center" style="height: 40vh;">
					<useragreement></useragreement>
				</view>
				<view class="flex text-center" style="height: 100rpx;line-height: 100rpx;">
					<view class="border-right fs-28 fta0a0" style="width: 50%;" @click="nextClick">不同意</view>
					<view class="flex-1 fs-28 ft3d3c" @click="nextSubmit">同意</view>
				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { closeWindow } from '@/utils/common.js'
	import baseApi from '@/api/baseApi.js'
	import homePage from './index/index.vue';
	import paymentcode from './paymentcode/paymentcode.vue';
	import classPage from './class/class.vue';
	import carPgae from './cart/Index.vue';
	import myPgae from './my/my.vue';
	import useragreement from "@/components/user-agreement.vue"
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		components: {
			homePage,
			paymentcode,
			classPage,
			carPgae,
			myPgae,
			useragreement
		},
		data() {
			return {
				activeIndex: 0,
				progress: 0,
				barArr: [0],
				config: null,
				prize: [],
				pageshow: null,
				changeIndex: 0,
				notice: null,
				stage_end: null,
				flag: false, // 入场协议开关
				pid: null,
				time_template_id: null,
				noticesList:[],
				isdot:false
			};
		},
		created() {
			this.getconfigAll();
			this.getLocation()
		},
		onShow() {
			//从商品详情进入购物车
			let tocar = uni.getStorageSync('tocar');
			if (tocar) {
				this.activeIndex = Number(tocar);
				uni.removeStorageSync('tocar');
			};
			if (this.config) this.getconfigAll();
			if (this.getToken) this.GetInfo();
			if(this.noticesList.length > 0 && this.getToken) this.notices()
		},
		mounted() {
			if (!uni.getStorageSync('agreement_key')) {
				this.$refs.useragreement.open()
			}
			if (this.getToken)this.notices()
		},
		computed: {
			...mapGetters(['getToken', 'getdownApk', 'getbottom', 'getConfig', 'getUser', 'getPlatform', 'getVersion'])
		},
		watch: {
			getdownApk(val) {
				if (val) {
					let downloadTask = null;
					downloadTask = uni.downloadFile({
						url: val, //仅为示例，并非真实的资源
						success: (res) => {
							if (res.statusCode === 200) {
								console.log('下载成功');
								plus.runtime.openFile(res.tempFilePath);
							}
						}
					});
					downloadTask.onProgressUpdate((res) => {
						// console.log('下载进度' + res.progress);
						this.progress = res.progress;
						this.$refs.downLoad.open();
						if (res.progress > 99) {
							this.$refs.downLoad.close();
						}
					});
				}
			},
		},
		methods: {
			// 公告列表
			notices(){
				baseApi.notices().then(res => {
					this.noticesList = res.data
					let noticesNum = uni.getStorageSync('noticesNum')
					if(this.noticesList.length > 0){
						if(noticesNum && noticesNum == this.noticesList.length){
							this.isdot = false
						} else {
							this.isdot = true
							this.noticesDetails(this.noticesList[0]['notice_id'])
						}
					}
					uni.setStorageSync('noticesNum',this.noticesList.length)
				})
			},
			//公告详细
			noticesDetails(notice_id){
				baseApi.noticesDetails({id:notice_id}).then(res => {
					this.notice = res.data
					this.$nextTick(() => {
						this.$refs.notice.open()
					})
				}).catch(e => {
					console.log(e)
				})
			},
			//获取当前位置
			getLocation() {
				let location = {
					lat: 0,
					lng: 0,
				}
				const _this = this;
				uni.getLocation({
					success(res) {
						console.log(res)
						location.lat = res.latitude
						location.lng = res.longitude,
						_this.$store.commit('setLocation',location)
						uni.setStorageSync('location',JSON.stringify(location))
					},
					fail(err) {
						console.log(err) //获取失败则返回经纬坐标为0
					}
				})
			},
			getconfigAll() {
				baseApi.configAll().then(res => {
					console.log(res)
					this.config = res.data;
					this.$store.commit("setconfig", this.config)
					uni.setStorageSync('config', JSON.stringify(this.config))
				}).catch(err => {})
			},
			changeTab(index, $) {
				this.activeIndex = index;
				if (this.getToken) this.GetInfo();
				this.getconfigAll();
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser", res.data)
				})
			},
			nextClick() {
				closeWindow()
			},
			nextSubmit(text) {
				this.$refs.useragreement.close()
				uni.setStorageSync('agreement_key', 'yes');
			}
		}
	}
</script>

<style lang="less">
	.main-page {
		height: 100vh;
		overflow: hidden;

		.main-content {
			// height: calc(100vh - 124rpx);
		}

		.Hide_box {
			visibility: hidden;
		}

		.mian-tab {
			height: 50px;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100%;
		}

		.nav-bg {
			background-color: #FFFFFF;
		}

		.tab_icon {
			width: 50rpx;
			height: 50rpx;
			background-size: 48rpx;
			background-repeat: no-repeat;
			background-position: center;
		}

		.home {
			background-image: url(../static/images/main_home_icon.png);
		}

		.shequ {
			background-image: url(../static/images/main_sq_icon.png);
		}

		.car {
			background-image: url(../static/images/main_car_icon.png);
		}

		.my {
			background-image: url(../static/images/main_my_icon.png);
		}

		.homeactive .home {
			background-image: url(../static/images/main_home_icon_on.png);
		}

		.homeactive .shequ {
			background-image: url(../static/images/main_sq_icon_on.png);
		}

		.homeactive .car {
			background-image: url(../static/images/main_car_icon_on.png);
		}

		.homeactive .my {
			background-image: url(../static/images/main_my_icon_on.png);
		}

		.homeactive .tab-text {
			color: #323232;
		}

		.hot_btn {
			width: 66rpx;
			height: 66rpx;
		}
	}
</style>
