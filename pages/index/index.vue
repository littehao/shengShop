<template>
	<view class="home-page">
		<comscroll
		ref="comscroll"
		@loadData="loadData"
		:isSuccess="isSuccess"
		:datalen="datalen"
		>
			<view class="topfiexd topheight" style="top: 0;">
				<comHead></comHead>
				<view class="home-header px-3">
					<view class="flex justify-end align-center position-relative py-2" >
						<!-- <text class="iconfont icon-kefu1 fs-40 ftffff mr-5" @click="navTo('my','on-line')"></text>
						<text class="iconfont icon-pinglun fs-40 ftffff" @click="navTo('my','msg')"></text> -->
					</view>
					<view class="flex align-center home-search">
						<view class="flex align-center search-box px-2 boxsizing rounded-circle ml-1 flex-1"
							@click="navTo('/pages/search/search')">
							<text class="iconfont icon-sousuo_2 fs-36 ftb2b2 mr-2"></text>
							<text class="fs-20 ftb2b2  text-ellipsis1 flex-1">请您输入商品、品牌、店铺名称</text>
						</view>
					</view>
				</view>
			</view>
			<view class="scroll-bg pt-3">
				<swiper class="swiper mx-3 rounded-lg overflow-hidden " circular :indicator-dots="true" :autoplay="true"
					:interval="10000" :duration="500">
					<swiper-item v-for="(item,index) in  bannerList" :key="index">
						<view id="swiper" class="swiper-item" @click="tolink(item)">
							<image style="width: 694rpx;height: 360rpx;" class="rounded-lg flex" :src="item.banner_url"
								mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				
				<view class="rounded-lg py-3 flex align-center justify-around bgffff tabfiexd " v-if="tabsList.length <  4">
					<block v-for="(item,index) in tabsList" :key="index">
						<view class="tabs-item flex flex-column  align-center" @click="clickTab(index)"
							:class="{'line':tabsList.length-index!=1}">
							<view class="fs-32 box-transition" :class="{'font-weight-bolder ftE7331F':status==index}"
								style="height: 50rpx;">{{item.name}}</view>
						</view>
					</block>
				</view>
				<template v-else>
					<v-tabs v-model="model" activeColor="#E7331F" class="tabfiexd border-bottom border-top " :tabs="tabsList"
						field="name" @change="clickTab" lineColor="transparent" height="50px" width="25%">
					</v-tabs>
				</template>
				<view class="position-relative" style="padding-top: 10px;min-height: 610px;">
					<goodsCard :wfList='goldengoods'></goodsCard>
					<null-data v-if="goldengoods.length == 0" class="mx-auto"
						style="height: 100px;width: 100px;margin-bottom: 50px;"></null-data>
					<loading ref="shoploading"></loading>
				</view>
			</view>
		</comscroll>

		<loading ref="loading"></loading>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	import comHead from '@/components/header/index.vue';
	import vTabs from "@/components/v-tabs/v-tabs.vue";
	import nullData from "@/components/null-data/index.vue";
	import loading from "@/components/loading/loading.vue";
	import goodsCard from '@/components/goodsCard/goodsCard.vue';
	import { getTimeDifference } from "@/utils/common.js";
	import IndexApi from "@/api/indexApi.js"
	export default {
		components: {
			comHead,
			vTabs,
			nullData,
			loading,
			goodsCard
		},
		data() {
			return {
				model:0,
				bannerList: [],
				status: 0,
				list: [],
				goldengoods: [],
				isSuccess:false,
				datalen:0,
				top: 0,
				gc_id: 0,
				flag: false,
				tabsList: [],
			}
		},
		computed: {
			...mapGetters(['getToken', 'getstatusBarHeight', 'getConfig','getPlatform','getVersion']),
			uniHeight() {
				const sys = uni.getSystemInfoSync();
				if (sys.windowHeight) {
					return sys.windowHeight - 94 - this.getstatusBarHeight + 'px';
				}
				return 0
			}
		},
		mounted() {
			this.$refs.loading && this.$refs.loading.show();
		},
		created() {
			this.is_hot = 1
			this.getspecialCategory();
			this.getBanners();
		},
		methods: {
			clickTab(index) {
				this.status = index;
				this.$refs.comscroll.downCallback()
			},
			getspecialCategory() {
				IndexApi.specialCategory().then(res => {
					let list = res.data.special_category
					list.forEach(item => {
						this.tabsList.push({name:item.c_name,id:item.id})
					})
					this.$refs.comscroll.downCallback()
				})
			},
			getBanners() { //banner
				IndexApi.banners().then(res => {
					this.bannerList = res.data;
				}).catch(err => {})
			},
			loadData(page) { //商品列表
				let data = {
					page,
					limit: 20,
					category_id:this.tabsList[this.status]['id']
				}
				this.isSuccess = false
				IndexApi.homePageList(data).then(res => {
					this.$refs.loading.hide();
					this.$refs.shoploading.hide();
					let list = res.data
					this.isSuccess = true
					this.datalen = list.length
					if(page == 1){
						this.goldengoods = list
					} else {
						this.goldengoods = this.goldengoods.concat(list) 
					}
				}).catch(err => {})
			},
			tolink(item) {
				if (!item.href_url.includes('http://') || !item.href_url.includes('https://')) return;
				uni.$tools.href(`/pages/web-view/hrefurl-view?href_url=${item.href_url}`)
			},
			changeTab(index) {
				this.$refs.shoploading && this.$refs.shoploading.show();
				this.status = index;
				this.flag = true;
				this.$refs.comscroll.downCallback()
			},
			navTo(url) {
				uni.$tools.href(url)
			}
		},
	}
</script>

<style lang="less" scoped>
	.home-page {
		height: 100%;
		position: relative;

		.item-second {
			flex:1;
		}

		.scroll-bg {
			background-image: url(../../static/images/homebg.png);
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: center calc(-94px - var(--status-bar-height));
		}

		.topheight {
			height: calc(94px + var(--status-bar-height));
			background-image: url(../../static/images/homebg.png);
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: center top;
		}

		.uniHeight {
			height: calc(100% - 94px + var(--status-bar-height))
		}

		.swiper {
			height: 360rpx;
			background: linear-gradient(-45deg, #dd2b1c 0%, #ee3821 100%);
		}

		.home-header {
			// height: 44px;
			z-index: 999;

			.home-search {
				height: 44px;
			}
		}

		.home-topfiexd {
			position: sticky;
			position: -webkit-sticky;
			top: calc(0px + var(--status-bar-height));
		}

		.search-box {
			background-color: #F5F6F8;
			width: 460rpx;
			height: 64rpx;
		}

		.home-typetitle {
			height: 100rpx;

			.line {
				width: 100rpx;
				height: 1px;
				background-color: #B2B2B2;
				color: #E7331F;
			}
		}

		.hot-shop-item {
			width: 232rpx;
			margin-bottom: 6rpx;

			.shop-price {
				width: 160rpx;
				height: 38rpx;
				background-color: #01344E;
			}
		}

		.tab-scroll-row {
			width: 750rpx;
			height: 88rpx;
			width: 750rpx;
			flex-direction: row;

			.tab-item {
				padding: 0 20rpx;
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
					color: #FF3335;
				}
			}
		}
		.tabs-item {
			width: 20%;
			position: relative;

			&.line {
				
				&::before {
					content: "";
					width: 1rpx;
					height: 20px;
					background-color: #ECECEC;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}

			.red {
				color: #E2231A;
			}

			.bline {
				background-image: url(../../static/images/tabs-line.png);
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 100% 100%;
			}

			.box-transition {
				transition: all .3s;
			}

		}
	}
</style>
