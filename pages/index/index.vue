<template>
	<view class="home-page">
		<comscroll
		ref="comscroll"
		@loadData="loadData"
		:isSuccess="isSuccess"
		:datalen="datalen"
		>
			<view class="topfiexd topheight bgFEFEFE" style="top: 0;">
				<comHead></comHead>
				<view class="home-header px-3">
					<!-- <view class="flex justify-end align-center position-relative py-2" >
						<text class="iconfont icon-pinglun fs-40 ftffff" @click="navTo('my','msg')"></text>
					</view> -->
					<view class="flex align-center home-search">
						<view class="flex align-center search-box px-2 boxsizing rounded-circle ml-1 flex-1 bgF9F9F9"
							@click="navTo('/pages/search/search')">
							<text class="iconfont icon-sousuo_2 fs-36 ftb2b2 mr-2"></text>
							<text class="fs-20 ftb2b2  text-ellipsis1 flex-1">请您输入商品、品牌、店铺名称</text>
						</view>
						<uni-badge 
							:is-dot="isdot" 
							class="uni-badge-left-margin ml-2" 
							:text="noticeNum" 
							absolute="rightTop" 
							size="small">
							<image
								@click="navTo('/pages/notices/notices')" 
								src="/static/images/online_icon.png"
								style="width:20px;height:20px;"
								mode="widthFix"
								class="ml-2"
							>
							</image>
						</uni-badge>
					</view>
				</view>
			</view>
			<view class="scroll-bg">
				<view class="bgFEFEFE pb-3 mb-2">
					<swiper class="swiper mx-3 rounded-lg overflow-hidden " circular :indicator-dots="true" :autoplay="true"
						:interval="10000" :duration="500">
						<swiper-item v-for="(item,index) in  bannerList" :key="index">
							<view id="swiper" class="swiper-item" @click="tolink(item)">
								<image style="width: 694rpx;height: 360rpx;" class="rounded-lg flex" :src="item.banner_url"
									mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				
				<view class="online-tab-box mx-auto" :class="activeIndex == 0?'onlineTop':'onlineBottom'">
					<view class="flex align-center mb-2">
						<text class="online_tab online-top flex-1" :class="activeIndex == 0?'active':''" @tap="changeOnline(0,'onlineUp')"></text>
						<text class="online_tab online-bottom flex-1" :class="activeIndex == 1?'active':''" @tap="changeOnline(1,'onlineDown')"></text>
					</view>
					<view class="flex flex-wrap">
						<block v-for="(item,index) in tabList" :key="index">
							<view 
							class="flex flex-column text-center mb-3" 
							:style="tabStyle"
							@tap="tabNavTo(item)"
							>
								<image class="mx-auto mb-1" :src="item.img" mode="widthFix" style="width: 84rpx;height: 84rpx;"></image>
								<text class="fs-26 ft666666">{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
				
				<!--横向专区滚动-->
				<!-- <horizontalCard :goldengoods="goldengoods"></horizontalCard> -->
				
				<component :is="currentComponent" :dataList="dataList" @loadData="loadMerchant" :tabsList="onlineDownTabList"></component>
				
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
	import loading from "@/components/loading/loading.vue";
	import horizontalCard from './components/horizontal_card.vue'
	import onlineUp from './components/online_up.vue'
	import onlineDown from './components/online_down.vue'
	import { getTimeDifference, distance } from "@/utils/common.js";
	import IndexApi from "@/api/indexApi.js"
	import merchantApi from '@/api/merchantApi.js'
	export default {
		props:{
			isdot:{
				type:Boolean,
				default:false
			}
		},
		components: {
			comHead,
			loading,
			horizontalCard,
			onlineUp,
			onlineDown
		},
		data() {
			return {
				model:0,
				bannerList: [],
				activeIndex: 0,
				list: [],
				onlineUpList: [],//线上商品列表
				onlineDownList: [],//线下商户列表
				dataList:[],
				isSuccess:false,
				datalen:0,
				top: 0,
				gc_id: 0,
				flag: false,
				currentComponent:'onlineUp',
				specialList: [],
				shopClass: [],
				tabList:[],
				onlineDownTabList:[],
				category_id:0,
				noticeNum:0,
			}
		},
		computed: {
			...mapGetters(['getToken', 'getstatusBarHeight', 'getConfig','getPlatform','getVersion']),
			tabStyle(){
				if(this.tabList.length == 4 || this.tabList.length == 8){
					return {width:'25%'}
				} else if(this.tabList.length == 5 || this.tabList.length == 10){
					return {width:'20%'}
				} else {
					return {width:'25%'}
				}
			}
		},
		watch:{
			isdot:{
				handler(newval,oldval){
					if(newval){
						this.noticeNum = 1
					} else {
						this.noticeNum = 0
					}
				},
				immediate:true
			}
		},
		mounted() {
			this.$refs.loading && this.$refs.loading.show();
			this.getspecialCategory();
			this.merchantCategory()
			this.onlineDownTabListFn()
		},
		created() {
			this.is_hot = 1
			this.getBanners();
		},
		methods: {
			tabNavTo(item){
				if(this.activeIndex == 1){
					uni.navigateTo({
						url:`/pages/shop-list/shop-list?title=${item.name}&category_id=${item.id}`
					})
				} else {
					uni.navigateTo({
						url:`/pages/class/class-shoplist?title=${item.name}&category_id=${item.id}`
					})
				}
			},
			changeOnline(index,component) {
				this.activeIndex = index;
				this.tabList = index == 0 ? this.specialList : this.shopClass
				this.currentComponent =  component
				this.$refs.comscroll.downCallback()
			},
			getspecialCategory() {//线上商城分类
				IndexApi.specialCategory().then(res => {
					let list = res.data.special_category
					let tab = []
					list.forEach(item => {
						tab.push({name:item.c_name,id:item.id,img:item.icon})
					})
					this.specialList = tab
					this.tabList = tab
					this.$refs.comscroll.downCallback()
				})
			},
			merchantCategory() {//线下商户专区分类
				merchantApi.merchantCategory().then(res => {
					let list = res.data
					let tab = []
					list.forEach(item => {
						tab.push({name:item.c_name,id:item.id,img:item.icon})
					})
					this.shopClass = tab
				})
			},
			onlineDownTabListFn() {//线下商户tab分类
				merchantApi.tabCategory().then(res => {
					let list = res.data
					let arr = []
					list.forEach(item => {
						arr.push({name:item.c_name,id:item.id})
					})
					this.onlineDownTabList = arr
					this.category_id = this.onlineDownTabList[0] && this.onlineDownTabList[0]['id']
				})
			},
			getBanners() { //banner
				IndexApi.banners().then(res => {
					this.bannerList = res.data;
				}).catch(err => {})
			},
			loadMerchant(id){
				this.category_id = id
				this.$refs.comscroll.downCallback()
			},
			loadData(page) { 
				if(this.activeIndex == 0){
					this.homePageList(page)
				} else {
					this.merchants(page)
				}
			},
			merchants(page){//商户列表
				let data = {
					page,
					limit: 20,
					dcategory_id:this.category_id
				}
				this.isSuccess = false
				let location = uni.getStorageSync('location')
				merchantApi.merchants(data).then(res => {
					this.$refs.loading.hide();
					let list = res.data
					this.isSuccess = true
					this.datalen = list.length
					list.forEach(item => {
						item.distance = item.merchantappend && distance(item.merchantappend.latitude,item.merchantappend.longitude,location)
					})
					if(page == 1){
						this.onlineDownList = list
					} else {
						this.onlineDownList = this.onlineDownList.concat(list) 
					}
					this.dataList = this.onlineDownList
				}).catch(e => {
					console.log(e)
				})
			},
			homePageList(page){//商品列表
				let data = {
					page,
					limit: 20,
					category_id:0
				}
				this.isSuccess = false
				IndexApi.homePageList(data).then(res => {
					this.$refs.loading.hide();
					let list = res.data
					this.isSuccess = true
					this.datalen = list.length
					if(page == 1){
						this.onlineUpList = list
					} else {
						this.onlineUpList = this.onlineUpList.concat(list) 
					}
					this.dataList = this.onlineUpList
				}).catch(e => {
					console.log(e)
				})
			},
			tolink(item) {
				if (!item.href_url.includes('http://') || !item.href_url.includes('https://')) return;
				uni.$tools.href(`/pages/web-view/hrefurl-view?href_url=${item.href_url}`)
			},
			changeTab(index) {
				this.status = index;
				this.flag = true;
				this.$refs.comscroll.downCallback()
			},
			navTo(url) {
				if(url.includes('on-line') && !uni.getStorageSync('token')){
					// #ifdef APP-PLUS
					uni.$tools.href("/pages/login/login-pwd")
					// #endif
					//#ifdef H5
					uni.$tools.href("/pages/login/login")
					// #endif
					return;
				}
				uni.$tools.href(url)
			}
		},
	}
</script>

<style lang="less" scoped>
	.home-page {
		height: 100%;
		position: relative;
		.topheight {
			height: calc(65px + var(--status-bar-height));
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
		.search-box {
			background-color: #F5F6F8;
			width: 460rpx;
			height: 64rpx;
		}
		.online-tab-box{
			width: 706rpx;
			height: 433rpx;
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
			transition: all 0.3 linear; 
			&.onlineTop{
				background-image: url('/static/images/onlinetopbg.png');
			}
			&.onlineBottom{
				background-image: url('/static/images/onlinebottombg.png');
			}
			.online_tab{
				height: 80rpx;
				background-repeat: no-repeat;
				background-size: 40%;
				background-position: center 16rpx;
				transition: all 0.3 linear; 
				&.online-top{
					background-image: url('/static/images/online_top_tab.png');
					&.active{
						background-image: url('/static/images/online_top_tab_on.png');
						background-size: 46%;
					}
				}
				&.online-bottom{
					background-image: url('/static/images/online_bottom_tab.png');
					&.active{
						background-image: url('/static/images/online_bottom_tab_on.png');
						background-size: 46%;
					}
				}
			}
		}
	}
</style>
