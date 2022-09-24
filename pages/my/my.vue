<template>
	<view class="my-page bgF1F1">
		<view class="my-content ">
			<view class="my-top">
				<comHead></comHead>
				<view class="my-header flex align-center justify-end px-2" style="height: 44px;" title="退出登录">
					<text class="iconfont icon-qiehuan fs-52 ftffff" v-if="getToken"
						@click="$refs.logout.open()"></text>
				</view>

				<view class="flex align-center px-3 mt-2">
					<template v-if="getUser">
						<view class="avatar position-relative" @click="navTo('/pages/eidt-info/eidt-info')">
							<view style="width: 100rpx;height: 100rpx;" class="overflow-hidden  rounded-circle  border">
								<image v-if="getUser.member_avatar" class="rounded-circle bgf4f4 flex"
									style="width: 100rpx;height: 100rpx;" :src="getUser.member_avatar"
									mode="aspectFill"></image>
								<image v-else class="rounded-circle flex" mode="aspectFill"
									style="width: 100rpx;height: 100rpx;" src="../../static/images/logo.png"></image>
							</view>
						</view>
						<view class="flex flex-1 flex-column ml-2">
							<view class="flex justify-start align-center flex-1">
								<text
									class="fs-36 ftffff text-ellipsis">{{getUser.nickname || getUser.member_phone}}</text>
								<!-- <text class="fs-28 ftffff" v-if="getUser.nickname && getUser.member_phone">({{getUser.member_phone}})</text> -->
								<text
									class="d-inline-block px-2 fs-24 ftED3C bgffff rounded ml-1 text-ellipsis">{{getUser.agent_level_name || finebeanLevel}}</text>
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

				<view class="mx-3 bgffff p-2 rounded-lg my-5">
					<view class="flex align-center justify-between">
						<text class="fs-36 ft3333">我的账户</text>
					</view>
					<view class="flex align-center justify-around py-3">
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/record/contribution?title=贡献值&category=9`)">
							<text
								class="fs-28 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.fine_bean).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">贡献值</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=工分&category=10`)">
							<text
								class="fs-28 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.available_integral).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">工分</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=绿分&category=1`)">
							<text
								class="fs-28 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.available_rc_balance).toFixed(2)) || 0}}</text>
							<text class="fs-28 ft9999  mt-1">绿分</text>
						</view>
						<view class="flex flex-column justify-center text-center"
							@click="navTo(`/pages/balance/balance?title=消费劵&category=11`)">
							<text
								class="fs-28 ft3333 font-weight-bolder text-ellipsis">{{(getUser && Number(getUser.with_draw_balance)) || 0}}</text>
							<text class="fs-28 ft9999 mt-1">消费劵</text>
						</view>
					</view>
				</view>

				<view class="mx-3 bgffff p-2 rounded-lg">
					<view class="flex align-center justify-between  mb-3">
						<text class="fs-36 ft3333">我的订单</text>
					</view>
					<view class="flex align-center justify-around pb-2">
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=1')">
							<view style="width: 40rpx;height: 41rpx;" class="mx-auto mb-2">
								<image style="width: 40rpx;height: 41rpx;" src="../../static/images/my_order_icon1.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-24 ft3333">待付款</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=3')">
							<view style="width: 40rpx;height: 41rpx;" class="mx-auto mb-2">
								<image style="width: 40rpx;height: 41rpx;" src="../../static/images/my_order_icon2.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-24 ft3333">待收货</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=4')">
							<view style="width: 40rpx;height: 41rpx;" class="mx-auto mb-2">
								<image style="width: 40rpx;height: 41rpx;" src="../../static/images/my_order_icon3.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-24 ft3333">已签收</text>
						</view>
						<view class="flex flex-column text-center" @click="navTo('/pages/order/order?index=0')">
							<view style="width: 35rpx;height: 39rpx;" class="mx-auto mb-2">
								<image style="width: 35rpx;height: 39rpx;" src="../../static/images/my_order_icon5.png"
									mode="aspectFill"></image>
							</view>
							<text class="fs-24 ft3333">全部订单</text>
						</view>
					</view>
				</view>
			</view>

			<view class="mx-3 bgffff p-2 rounded-lg my-5">
				<view class="flex align-center justify-between">
					<text class="fs-36 ft3333">红包工具</text>
				</view>
				<view class="flex align-center justify-around py-3">
					<view class="flex flex-column justify-center text-center"
						@click="navTo('/pages/red/balance?title=红包余量')">
						<text
							class="fs-36 ft3333 font-weight-bolder">{{(getUser && Number(getUser.red_count)) || 0}}</text>
						<text class="fs-28 ft9999 mt-1">红包余量</text>
					</view>
					<view class="flex flex-column justify-center text-center" @click="navTo('/pages/red/buyred')">
						<text class="fs-52 ft3333 font-weight-bolder iconfont icon-hongbao1"></text>
						<text class="fs-28 ft9999 mt-1">买红包</text>
					</view>
					<view class="flex flex-column justify-center text-center" @click="navTo('/pages/red/sendred')">
						<text class="fs-52 ft3333 font-weight-bolder iconfont icon-hongbao2"></text>
						<text class="fs-28 ft9999  mt-1">发红包</text>
					</view>
				</view>
			</view>

			<view class="mx-3 bgffff p-2 rounded-lg my-5">
				<view class="flex align-center justify-between">
					<text class="fs-36 ft3333">我的好友</text>
				</view>
				<view class="flex align-center justify-around py-3">
					<view class="flex flex-column justify-center text-center"
						@click="navTo('/pages/friend/friendList?type=1&title=我的好友')">
						<text class="fs-36 ft3333 font-weight-bolder">{{memberCount.direct_push || 0}}</text>
						<text class="fs-28 ft9999 mt-1">我的好友</text>
					</view>
					<view class="flex flex-column justify-center text-center"
						@click="navTo('/pages/friend/friendList?type=1&title=我的好友')">
						<text class="fs-36 ft3333 font-weight-bolder">{{memberCount.indirect_push || 0}}</text>
						<text class="fs-28 ft9999 mt-1">我的粉丝</text>
					</view>
				</view>
			</view>

			<view class="mx-3 mt-3 p-2 bgffff  rounded-lg">
				<view class="flex align-center">
					<text class="fs-36 ft3333">更多服务</text>
				</view>
				<view class="flex flex-column pt-5">
					<view class="flex align-center server-item" @click="navTo('/pages/exchange/exchange')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_sk.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">工分兑换绿分</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/settled/settled')"
						v-if="getUser && getUser.is_shop_merchant != 1">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_3.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">入驻商城</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/settled/shopcode')"
						v-if="getUser && getUser.is_shop_merchant == 1">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_3.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">商家二维码</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/likes/likes')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/likes.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">我的收藏</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/setup/bindPhone')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_14.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">绑定手机号</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/address/address')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_9.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8 flex-1 ml-1">收货地址</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item" @click="navTo('/pages/feedback/feedback')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_7.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8  flex-1 ml-1">问题反馈</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
					<view class="flex align-center server-item"
						@click="navTo('/pages/web-view/hybrid?url=user-agreement&title=用户协议')">
						<view style="height: 40rpx;">
							<image style="width: 40rpx;" class="mx-auto mb-1" src="../../static/images/my_icon_10.png"
								mode="widthFix"></image>
						</view>
						<text class="fs-28 ftB5B8  flex-1 ml-1">用户协议</text>
						<text class="iconfont icon-xiayibu fs-52 ft9999"></text>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 50rpx;"></view>

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
	</view>
</template>

<script>
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
				uni.$tools.href(url)
			},
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
			background-image: url(../../static/images/my_bg.png);
			background-size: 100%;
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


	}
</style>
