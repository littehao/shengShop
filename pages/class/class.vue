<template>
	<view class="class-page bgF5F5F5">
		<view class="class-header bgffff border-bottom">
			<comHead></comHead>
			<view class="flex align-center px-3" style="height: 44px;">
				<view class="bgF5F5F5 search-box bgF5F5F5 px-2 flex align-center justify-between flex-1 rounded-circle"
					@click="navTo('/pages/search/search')">
					<text class="fs-28 ft9999">请您输入商品、品牌名称</text>
					<text class="iconfont icon-sousuo_2 fs-36 ftb2b2 ml-1"></text>
				</view>
			</view>
		</view>
		<template v-if="category.length > 0">
			<view class="flex class-content">
				<view class="class-left bgffff">
					<scroll-view scroll-y="true" style="height: 100%;">
						<block v-for="(item,index) in category" :key="index">
							<view class="left-item text-center" :class="{life_title:index == click_index}"
								@click="change_click_index(index)">
								<text class="fs-26 ft3333">{{item.gc_name}}</text>
							</view>
						</block>
					</scroll-view>
				</view>
				<view class="class-right">
					<scroll-view scroll-y="true" :scroll-into-view="scroll_into_view" scroll-with-animation="true"
						@scroll="scroll_detail" style="height: 100%;">
						<view class="px-2" style="width: 530rpx;">
							<!-- <image style="width: 530rpx;" class="mx-auto  rounded  flex" src="../../static/images/home_banner5.png" mode="widthFix"></image> -->
							<block v-for="(obj,index) in category" :key="index">
								<view class="class-card bgffff rounded my-2 pl-2 pt-3" :id="'id'+index">
									<view class="fs-24 ft3333 font-weight-bold mb-3">{{obj.gc_name}}</view>
									<view class="flex flex-wrap">
										<block v-for="(item,k) in obj.child" :key="k">
											<view class="goods-item flex flex-column text-center mb-3"
												style="width: 164rpx;"
												@click="navTo(`/pages/class/class-shoplist?title=${item.gc_name}&gc_id=${item.gc_id}`)">
												<image style="width: 100rpx;height: 100rpx;"
													class="mx-auto rounded bgF5F5F5" :src="item.image_url"
													mode="aspectFill"></image>
												<text class="fs-24 ft3333 mt-1">{{item.gc_name}}</text>
											</view>
										</block>
									</view>
								</view>
							</block>
							<view style="height: 150rpx;"></view>
						</view>
					</scroll-view>
				</view>
			</view>
		</template>
		<!-- <nulldata v-else></nulldata> -->
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			comHead,
			nulldata,
			loading
		},
		data() {
			return {
				click_index: 0,
				//id动态切换
				scroll_into_view: "",
				//节点top值
				top_list: [],
				category: []
			};
		},
		created() {
			this.getCategory();
		},
		methods: {
			getCategory() { //全部品类
				goodsApi.goodsCategory().then(res => {
					this.category = res.data;
				}).catch(err => {})
			},
			/* 左侧导航点击 */
			change_click_index(index) {
				this.click_index = index;
				//利用uniapp组件的配置信息。
				this.scroll_into_view = 'id' + index;
				//解决最后一个 ***来回*** 问题 (由于点击左侧导航，右侧锚点位置信息变化，此时滚动事件也随之滚动。)
				uni.setStorageSync("resolve", "last");
				setTimeout(() => {
					uni.removeStorageSync("resolve");
					// uni.clearStorageSync("resolve")
				}, 400);
			},
			//滚动过程
			scroll_detail(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				if (!uni.getStorageSync("resolve")) {
					this.get_node_details(options);
				};
			},
			//获取节点信息
			get_node_details(options) {
				const query = uni.createSelectorQuery().in(this); //获得实力
				//获取多个节点方式
				query.selectAll(".class-card").boundingClientRect(data => {
					// console.log(data); //得到class类名为  selectAll的数组集合
					this.top_list = data.map(item => {
						return Math.ceil(item.top);
					});
					this.async_detail_msg(options);
				}).exec();
			},
			async_detail_msg(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				// console.log(this.top_list)
				let top_page = options.detail.scrollTop + this.top_list[0];

				for (let i = 0; i < this.top_list.length; i++) {
					let node1 = this.top_list[i];
					let node2 = this.top_list[i + 1];
					if (node2 && top_page >= node1 && top_page < node2) {
						this.click_index = i;
						break;
					} else if (node2 && top_page === node2) {
						this.click_index = i + 1;
						break;
					}
				}
			},
			back() {
				uni.navigateBack()
			},
			navTo(url, item) {
				uni.$tools.href(url)
			},
		}
	}
</script>

<style lang="less">
	.class-page {
		min-height: 100vh;

		.search-box {
			height: 60rpx;
		}

		.class-content {
			height: calc(100vh - 44px - var(--status-bar-height));
		}

		.class-left {
			min-width: 180rpx;
			height: 100%;

			.left-item {
				height: 90rpx;
				line-height: 90rpx;

				&.life_title {
					background-color: #F4F4F4;
					background-image: url(../../static/images/left-border.png);
					background-position: left center;
					background-size: 8rpx;
					background-repeat: no-repeat;
				}
			}
		}

		.goods-item {
			margin-bottom: 40rpx;
		}
	}
</style>
