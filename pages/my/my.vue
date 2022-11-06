<template>
	<view class="my-page bgF1F1">
		<view class="my-content ">
			<view class="my-top">
				<comHead></comHead>
				<view class="my-header flex align-center justify-end px-2" style="height: 44px;" title="退出登录">
					<text class="iconfont icon-qiehuan fs-52 ftffff" v-if="getToken"
						@click="$refs.logout.open()"></text>
				</view>

				<view class="flex align-center pl-3 mt-2">
					<template v-if="getUser">
						<view class="avatar position-relative" @click="navTo('/pages/eidt-info/eidt-info')">
							<view style="width: 100rpx;height: 100rpx;" class="overflow-hidden  rounded-circle  border">
								<image v-if="getUser.member_avatar" class="rounded-circle bgF5F5F5 flex"
									style="width: 100rpx;height: 100rpx;" :src="getUser.member_avatar"
									mode="aspectFill"></image>
								<image v-else class="rounded-circle flex" mode="aspectFill"
									style="width: 100rpx;height: 100rpx;" src="../../static/images/logo.png"></image>
							</view>
						</view>
						<view class="flex flex-1 flex-column ml-2">
							<view class="flex justify-between align-center flex-1">
								<text class="fs-36 ftffff text-ellipsis">
									{{getUser.nickname || getUser.member_phone}}
								</text>
								<!-- <text class="fs-28 ftffff" v-if="getUser.nickname && getUser.member_phone">({{getUser.member_phone}})</text> -->
								<text class="d-inline-block pl-4 pr-2 py-1 fs-28 ft3B3E4F bglevelName rounded-left-circle ml-1 text-ellipsis">
									{{getUser.agent_level_name || finebeanLevel}}
								</text>
							</view>
							<view class="fs-20 ftffff" style="border-radius: 4px;">
								<text class="fs-28 ftffff"
									v-if="getUser.nickname && getUser.member_phone">{{getUser.member_phone}}</text>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="avatar position-relative" @click="navTo('/pages/login/login')">
							<image class="rounded-circle flex border" mode="aspectFill"
								style="width: 100rpx;height: 100rpx;" src="../../static/images/logo.png"></image>
						</view>
						<view class="ml-2" @click="navTo('/pages/login/login')"><text class="fs-40 ftffff">登录</text>
						</view>
					</template>
				</view>

				<view class="mx-3 bgffff p-2 rounded-lg mb-5" style="margin-top: 60rpx;">
					<view class="flex align-center justify-around py-3">
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/record/contribution?title=贡献值&category=9`)">
							<text
								class="fs-36 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.fine_bean).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">贡献值</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=工分&category=10`)">
							<text
								class="fs-36 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.available_integral).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">工分</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=绿分&category=1`)">
							<text
								class="fs-36 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.available_rc_balance).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999  mt-1">绿分</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=消费劵&category=11`)">
							<text
								class="fs-36 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.with_draw_balance)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">消费劵</text>
						</view>
					</view>
				</view>

				<view class="mx-3 bgffff p-2 rounded-lg">
					<view class="flex align-center justify-between  mb-4 pl-1">
						<text class="fs-36 ft3333">我的订单</text>
					</view>
					<view class="flex align-center justify-around pb-2">
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=1')">
							<view style="width: 50rpx;height: 51rpx;" class="mx-auto mb-3">
								<image style="width: 50rpx;height: 50rpx;" src="../../static/images/my_order_icon1.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-28 ft999999">待付款</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=3')">
							<view style="width: 50rpx;height: 50rpx;" class="mx-auto mb-3">
								<image style="width: 50rpx;height: 50rpx;" src="../../static/images/my_order_icon2.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-28 ft999999">待收货</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=4')">
							<view style="width: 50rpx;height: 50rpx;" class="mx-auto mb-3">
								<image style="width: 50rpx;height: 50rpx;" src="../../static/images/my_order_icon3.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-28 ft999999">已签收</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=0')">
							<view style="width: 45rpx;height: 49rpx;" class="mx-auto mb-3">
								<image style="width: 45rpx;height: 49rpx;" src="../../static/images/my_order_icon5.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-28 ft999999">全部订单</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mx-3 bgffff p-2 rounded-lg my-5">
				<view class="flex align-center justify-between pl-1">
					<text class="fs-36 ft3333">更多服务</text>
				</view>
				<view class="flex flex-wrap py-3">
					<template v-if="getConfig && getConfig.hongbaoopen == 1">
						<view class="flex flex-column justify-center text-center my_tool"
							@tap="navTo('/pages/red/balance?title=红包余量')">
							<text
								class="fs-36 ft3333 font-weight-bolder">{{(getUser && Number(getUser.red_count)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">红包余量</text>
						</view>
						<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/red/sendred')">
							<image class="my_icon" src="/static/images/my_icon/my_icon_1.png" mode="aspectFit"></image>
							<text class="fs-28 ft9999 mt-1">发红包</text>
						</view>
						<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/red/buyred')">
							<image class="my_icon" src="/static/images/my_icon/my_icon_2.png" mode="aspectFit"></image>
							<text class="fs-28 ft9999 mt-1">买红包</text>
						</view>
					</template>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/friend/share')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_share.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999 mt-1">邀请好友</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/friend/friendList?type=1&title=我的好友')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_3.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">我的好友</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/exchange/exchange')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_4.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">工分兑换</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/mystores/index')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_12.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">我的店铺</text>
					</view>
<!-- 					<view 
					v-if="getUser && getUser.is_shop_merchant != 1" 
					class="flex flex-column justify-center text-center my_tool" 
					@tap="navTo('/pages/settled/settled')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_5.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">入驻商城</text>
					</view>
					<view 
					v-if="getUser && getUser.is_shop_merchant == 1" 
					class="flex flex-column justify-center text-center my_tool" 
					@tap="navTo('/pages/settled/shopcode')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_5.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">商家二维码</text>
					</view> -->
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/likes/likes')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_6.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">我的收藏</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/address/address')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_7.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">收货地址</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/setup/setup')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_10.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">账号设置</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/feedback/feedback')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_8.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">问题反馈</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/web-view/hybrid?url=user-agreement&title=用户协议')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_9.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">用户协议</text>
					</view>
					<view class="flex flex-column justify-center text-center my_tool" @tap="navTo('/pages/on-line/on-line')">
						<image class="my_icon" src="/static/images/my_icon/my_icon_11.png" mode="aspectFit"></image>
						<text class="fs-28 ft9999  mt-1">在线客服</text>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 50rpx;"></view>
		<view class="ft999999 text-center mb-5 fs-24">当前版本：{{getVersion}}</view>

		<uni-popup ref="logout" type="dialog" style="z-index:999;" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0">提示</view>
				<view class="p-2 text-center" style="height: 100rpx;line-height: 100rpx;">
					<text class="fs-28 ft3333">你确定退出登录吗?</text>
				</view>
				<view class="flex align-center justify-center" style="height: 100rpx;">
					<view class="fs-28 border ft9999 flex align-center justify-center rounded-circle"
						style="width: 200rpx;height: 60rpx;" @click="$refs.logout.close()">取消</view>
					<view class="fs-28 btnBg ftffff flex align-center justify-center rounded-circle ml-4"
						style="width: 200rpx;height: 60rpx;" @click="logout">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="stores" type="dialog" style="z-index:999;" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0">您当前还没注册商户，请先注册</view>
				<view class="flex flex-wrap m-2">
					<text class="bgF5F5F5 rounded p-1 px-2 text-left" style="word-break:break-all;">{{getConfig.dmerchant_address}} </text>	
				</view>
				<view class="flex align-center justify-center" style="height: 100rpx;">
					<view class="fs-28 border ft9999 flex align-center justify-center rounded-circle"
						style="width: 200rpx;height: 60rpx;" @click="$refs.stores.close()">取消</view>
					<view class="fs-28 btnBg ftffff flex align-center justify-center rounded-circle ml-4"
						style="width: 200rpx;height: 60rpx;" @tap="copyTxt">复制</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { copyTxt } from '@/utils/common.js'
	import myApi from '@/api/myApi.js'
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import comHead from '@/components/header/index.vue'
	import {
		getTimeDifference
	} from "@/utils/common.js";
	export default {
		components: {
			comHead
		},
		data() {
			return {
				memberCount: {}
			}
		},
		created() {
			this.getToken && this.getChildMemberCountFn()
		},
		computed: {
			...mapGetters(['getPlatform', 'getToken', 'getUser', 'getConfig', 'getVersion', 'getbottom']),
			finebeanLevel() { //角色判断
				if ((this.getUser && Number(this.getUser.fine_bean)) >= 1000) {
					return '消费商'
				} else {
					return '消费者'
				}
			}
		},
		methods: {
			getChildMemberCountFn() { //获取好友人数
				myApi.getChildMemberCount().then(res => {
					this.memberCount = res.data
				}).catch(err => {})
			},
			logout() {
				uni.removeStorageSync('token');
				uni.removeStorageSync('user');
				uni.removeStorageSync('address');
				uni.removeStorageSync('agreement_key');
				this.$store.commit("setUser", null)
				this.$store.commit("setToken", null)
				this.$refs.logout.close();
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: "/pages/login/login-pwd"
				})
				// #endif
				//#ifdef H5
				uni.navigateTo({
					url: "/pages/login/login"
				})
				// #endif
			},
			navTo(url) {
				if (!this.getToken) {
					// #ifdef APP-PLUS
					uni.$tools.href("/pages/login/login-pwd")
					// #endif
					//#ifdef H5
					uni.$tools.href("/pages/login/login")
					// #endif
					return;
				}
				if(url == '/pages/mystores/index' && !this.getUser.dmerchant){
					this.$refs.stores.open()
					return;
				}
				if(url.includes('on-line')){
					// #ifdef APP-PLUS
					url = '/pages/on-line/app-on-line'
					// #endif
				}
				uni.$tools.href(url)
			},
			copyTxt(){
				copyTxt(this.getConfig.dmerchant_address || '')
				this.$refs.stores.close()
			}
		}
	}
</script>

<style lang="less">
	.my-page {
		height: 100%;
		overflow-y: auto;

		.avatr-border {
			border: 3px solid #cac9c8;
		}

		.my-content {
			min-height: 100%;
			background-image: url(../../static/images/mybg.png);
			background-size: 100% 30vh;
			background-repeat: no-repeat;
			background-position: center top;

			.meber_label {
				height: 40rpx;
				line-height: 40rpx;
			}

			.server-item {
				width: 100%;
				margin-bottom: 50rpx;
			}
		}
		.my_tool{
			width: 25%;
			margin-bottom: 40rpx;
			.my_icon{
				width:50rpx;
				height: 50rpx;
				margin:0 auto 10rpx;
			}
		}

	}
</style>
