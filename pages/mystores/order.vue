<template>
	<view class="order-page bgF5F5F5">
		<com-head :backshow="true" webview :titleshow="true" title="订单" color='#fff' class="header-bg" bgcolor="transparent"></com-head>
		<comscroll ref="comscroll" @loadData="loadData" :isSuccess="isSuccess" :datalen="datalen">
			<view style="white-space: nowrap;top: 0;" class="px-3 py-2 flex align-center justify-between topfiexd bgF5F5F5">
				<block v-for="(item,index) in tabList"  :key="index">
					<view class="tab-item flex align-center justify-center bgffff py-1 px-2 rounded-circle">
						<text class="tab-text" @click="changeTab(index)" :class="{tabactive:activeIndex == index}">{{item}}</text>
					</view>
				</block>
			</view>
			<view class="px-2 order-main boxsizing">
				<view class="p-2 position-relative">
					<template v-if="orderList.length > 0">
						<block v-for="(item,index) in orderList" :key="index">
							<view class="bgffff rounded mb-2">
								<view class="pl-3 pr-2 pt-3 mb-1 flex justify-between align-center">
									<view class="fs-28 ft666666">订单编号:{{item.trade_no}}</view>
									<image src="../../static/images/stores/copy-icon.png" class="bgF5F5F5"
										style="width: 30rpx;height: 30rpx;" mode="widthFix" @tap="copyNo(item)"></image>
								</view>
								<view class="px-3 pb-3">
									<view class="flex align-center mb-1">
										<view class="flex align-center flex-1">
											<text class="fs-28 ft666666">支付人名:</text>
											<text class="fs-28 ft333333">{{item.member_name}}</text>
										</view>
										<view class="flex align-center flex-1">
											<text class="fs-28 ft666666">金额:</text>
											<text class="fs-28 ft333333">{{item.order_price}}</text>
										</view>
									</view>
									<view class="flex align-center mb-1">
										<view class="flex align-center flex-1">
											<text class="fs-28 ft666666">支付方式:</text>
											<text class="fs-28 ft333333">{{item.payment_code_name}}</text>
										</view>
										<view class="flex align-center flex-1">
											<text class="fs-28 ft666666">状态:</text>
											<text class="fs-28" :class="item.status == 1?'ft3d3c':'ft333333'">{{tabList[item.status]}}</text>
										</view>
									</view>
									<view class="fs-28 ft666666 pb-1 flex align-center justify-between">
										<text>订单创建时间：{{item.payed_at ||  '-'}}</text>
									</view>
								</view>
							</view>
						</block>
					</template>
					<null-data v-if="orderList.length == 0"></null-data>
				</view>
			</view>
		</comscroll>

	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import merchantApi from '@/api/merchantApi.js'
	import comHead from "@/components/header/index.vue";
	import nullData from '@/components/null-data/index.vue'
	import loading from "@/components/loading/loading.vue";

	function copyTxt(txt) { //传入要复制的内容
		txt += "";
		if (txt == "null" || txt == "undefined" || txt == "") {
			//toast("复制失败，内容为空");
			return;
		}
		// #ifdef APP-PLUS
		uni.setClipboardData({
			data: txt,
		});
		// #endif

		// #ifdef H5
		if (document.queryCommandSupported('copy')) {
			let textarea = document.createElement("textarea")
			textarea.value = txt
			textarea.readOnly = "readOnly"
			document.body.appendChild(textarea)
			textarea.select() // 选中文本内容
			textarea.setSelectionRange(0, txt.length)
			let result = document.execCommand("copy")
			textarea.remove()
			uni.showToast({
				title: "复制成功",
				icon: "none",
			})
		} else {
			uni.showToast({
				title: "您的浏览器不支持复制",
				icon: "none"
			})
		}

		// #endif  
	}
	export default {
		components: {
			comHead,
			nullData,
			loading
		},
		data() {
			return {
				num: 0,
				activeIndex: 0,
				tabList: ['全部', '待支付', '已完成', '已取消'],
				isSuccess:false,
				datalen:0,
				orderList:[],
				status:0,
			}
		},
		mounted() {
			this.$refs.comscroll.downCallback()
		},
		computed: {
			...mapGetters(['getstatusBarHeight'])
		},
		methods: {
			loadData(page) {
				let data = {
					page_limit:20,
					page,
				}
				if(this.status)data.status = this.status
				this.isSuccess = false
				merchantApi.getDmerchantScanOrder(data).then(res => {
					let list = res.data
					this.isSuccess = true
					this.datalen = list.length
					if(page == 1){
						this.orderList = list
					} else {
						this.orderList = this.orderList.concat(list) 
					}
				}).catch(e => {
					console.log(e)
				})
			},
			copyNo(item) {
				copyTxt(item.trade_no)
			},
			changeTab(index) {
				this.activeIndex = index;
				this.status = index
				this.$refs.comscroll.downCallback()
			},
		}
	}
</script>

<style lang="less">
	.order-page {
		height: 100%;
		.order-main {
			background-color: #F4F4F4;
			min-height: calc(100vh - 95px - var(--status-bar-height));
		}
		.header-bg{
			background-image: url(../../static/images/stores/header_bg.png);
			background-size: 100%;
			background-position: center top;
			background-repeat: no-repeat;
		}
		.search-box {
			height: 52rpx;
			background-color: rgba(255, 255, 255, 0.3);
		}

		.order-main {

			// height: calc(100% - 80px);
			.line {
				height: 80rpx;
				width: 1rpx;
				background-color: #EDEDED;
				border-radius: 8rpx;
			}
		}

		.tab-text {
			color: #47474C;

			&.tabactive {
				color: #FF3335;
			}
		}

		.tab-scroll-row {
			width: 750rpx;
			height: 88rpx;
			width: 750rpx;
			flex-direction: row;

			.tab-item {
				// width:140rpx ;
				display: inline-flex;
			}

			.tab-text {
				height: 78rpx;
				line-height: 78rpx;
				background-position: center bottom;
				background-size: 66rpx 8rpx;
				background-repeat: no-repeat;
				font-size: 32rpx;
				color: #47474C;

				&.active {
					background-image: url(../../static/images/stores/line.png);
					color: #FF3335;
				}
			}
		}

	}
</style>
