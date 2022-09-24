<template>
	<view class="shop-details-page bgf4f4">
		<view class="fixed-top" style="height: 44px;">
			<comHead></comHead>
			<view class="flex align-center justify-between px-1">
				<text class="headerbtn  back" @click="back"></text>
				<!-- <text class="headerbtn share" @click="$refs.share.open()"></text> -->
			</view>
		</view>

		<template v-if="details">
			<view class="" v-if="details.images">
				<swiper class="shop-swiper bgffff" circular :indicator-dots="true" :autoplay="true" :interval="10000"
					:duration="500">
					<swiper-item v-for="(item,index) in details.images" :key="index">
						<view class="swiper-item  bgf4f4">
							<image style="width: 100%;height:750rpx;" :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="goods-info px-2 bgffff mb-2 pb-4 pt-1">
				<view class="flex align-center justify-between">
					<view class="flex align-center flex-1">
						<text class="ft3d3c fs-36">￥</text>
						<text class="ft3d3c fs-52">{{details.sale_price}}</text>
						<text class="fs-24 fta0a0  text-through ml-1">原价：￥{{details.price}}</text>
					</view>
				</view>
				<view class="fs-30 ft3333 mb-1">{{details.goods_name}}</view>
				<view class="flex flex-column">
					<view class="fs-24 ft9999  mb-1">{{details.goods_desc}}</view>
				</view>
			</view>
			<view class="goods-info px-2 bgffff mt-1 mb-2">
				<view class="flex align-center" v-if="Number(details.integral) > 0">
					<text class="fs-28 ft3333 font-weight-bold mr-3">福利</text>
					<view class="flex align-center flex-1 border-bottom py-4">
						<text class="fs-28 ft3333">购买此商品将获赠贡献值</text>
						<text class="fs-28 ft3d3c font-weight-bold ml-1">{{Number(details.integral).toFixed(2)}}</text>
					</view>
				</view>
				<view class="flex align-center" data-index="0" @click="toStore">
					<text class="fs-28 ft3333 font-weight-bold mr-3">商家</text>
					<view class="flex align-center flex-1 border-bottom py-4 justify-between">
						<text class="fs-28 ft3333">{{details.memchant_name}}</text>
						<image style="width: 40rpx;" src="../../static/images/more.png" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view class="goods-details bgffff mt-1 mb-2">
				<rich-text class="fs-28 ft3333 content" :nodes="details.goods_detail"></rich-text>
			</view>

			<view :style="{height: (50 + getbottom)+'px'}"></view>

			<view class="fixed-bottom bgffff goods_tool" :style="{height: (50 + getbottom)+'px'}">
				<uni-goods-nav :fill="true" :options="options" @click="onClick">
					<view class="goods_right_sub flex align-center pr-2">
						<view class="sub sub_left rounded-left-circle fs-26 ftffff text-center bg7142"
							@click="buttonClick(1)">加入购物车</view>
						<view class="sub sub_right rounded-right-circle fs-26 ftffff  text-center bg231A"
							@click="buttonClick(2)">立即购买</view>
					</view>
				</uni-goods-nav>
				<view :style="{height: getbottom+'px'}" class="bgffff"></view>
			</view>
			<!-- sku -->
			<uni-popup ref="sku" type="bottom" :mask-click="false" style="z-index: 12;">
				<view class="goods-sku bgffff px-3 pb-2">
					<view class="flex mb-3  pt-3"><text @click="close" class="iconfont icon-cuowu fta0a0"
							style="font-size: 60rpx;"></text></view>
					<view class="flex mb-3">
						<view style="min-width:180rpx;height: 180rpx;" class="overflow-hidden">
							<image style="width:180rpx;" class="rounded" v-if="details.images" :src="choiceGoods.img"
								mode="widthFix"></image>
						</view>
						<view class="ml-2">
							<view class="fs-30 ft3333 mb-1 text-ellipsis2">{{details.goods_name}}</view>
							<view class="flex align-center">
								<text class="ft3d3c fs-36">￥</text>
								<text class="ft3d3c fs-52">{{choiceGoods.sale_price}}</text>
								<!-- 	<text class="fs-24 fta0a0  text-through ml-1">原价：￥{{details.price}}</text> -->
								<text class="fs-24 fta0a0  text-through ml-1">原价：￥{{choiceGoods.market_price}}</text>
							</view>
							<view><text class="fs-24 fta0a0">库存：{{choiceGoods.goods_storage || 0}}</text></view>
						</view>
					</view>
					<view class="flex flex-column">
						<view class="fs-24 ft3333  mb-1">{{details.goods_desc}}</view>
					</view>
					<template v-if="attr_name">
						<block v-for="(val,key,index) in attr_name" :key="index">
							<view class="rule-item  mb-5 mt-4">
								<text class="fs-24 ft3333 font-weight-bold">{{key}}</text>
								<view class="flex align-center mt-3  flex-wrap">
									<block v-for="(item,i) in val" :key="i">
										<text class="rule px-3 fs-24 ft3333 rounded-circle mr-2 mb-2"
											:class="{active:item.checked}"
											@click="choiceRule(item,val,key)">{{item.name}}</text>
									</block>
								</view>
							</view>
						</block>
					</template>
					<template v-else>
						<view class="rule-item  mb-5 mt-4">
							<text class="fs-24 ft3333 font-weight-bold">规格</text>
							<view class="flex align-center mt-3">
								<text class="rule px-3 fs-24 ft3333 rounded-circle mr-2 active">默认</text>
							</view>
						</view>
					</template>

					<view class="flex align-center justify-between my-2">
						<text class="fs-24 ft3333 font-weight-bold">数量</text>
						<uni-number-box :min="1" v-model="goods_num" readly @change="changeNumber"></uni-number-box>
					</view>
					<view style="height: 50rpx;"></view>
					<view class="flex align-center mb-2 flex align-center justify-between"
						v-if="Number(choiceGoods.integral) >  0">
						<text class="fs-24 ft3333">赠送贡献值</text>
						<text class="fs-28 ft3d3c font-weight-bold">{{Number(choiceGoods.integral)}}</text>
					</view>
					<!-- <view class="flex align-center mb-2 flex align-center justify-between" v-if="Number(choiceGoods.contribution_integral) >  0">
						<text class="fs-24 ft3333">抵扣u豆</text>
						<text class="fs-28 ft3d3c font-weight-bold">{{Number(choiceGoods.contribution_integral)}}</text>
					</view> -->
					<view class="flex align-center mb-2">
						<text class="fs-24 ft3333">合计{{goods_num}}件，共</text>
						<text class="fs-24 ft3333">￥</text>
						<text class="fs-36 ft3d3c font-weight-bold">{{toalPrice.toFixed(2)}}</text>
					</view>

					<view style="height: 50rpx;"></view>

					<view class="mx-2 fs-28 ftffff font-weight-bold rounded-circle submit text-center"
						@click="submitFn">确定</view>
					<view :style="{height: getbottom+'px'}" class="bgffff"></view>
				</view>
			</uni-popup>
		</template>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue';
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	export default {
		components: {
			comHead
		},
		data() {
			return {
				cartype: 0, //判断是不是加入购物车或者 直接下单
				options: [{
					icon: 'shop',
					text: '店铺',
					color: "#e6575a"
				}, {
					icon: 'star',
					text: '收藏',
					color: "#333",
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				goodsId: null,
				details: null,
				goods_num: 1,
				toalPrice: 0,
				backtype: null,
				attr_name: null,
				attr_value: null,
				choiceChecked: {},
				choiceGoods: {},
			};
		},
		onLoad(query) {
			if (query.id) {
				this.goodsId = query.id;
				this.getDetails();
			}
			if (query.back) {
				this.backtype = query.back
			}
			if (this.getToken) this.getCart();
			uni.removeStorageSync('formCart');
		},
		computed: {
			...mapGetters(['getUser', 'getToken', 'getbottom', 'getConfig']),
		},
		methods: {
			// 选择规格
			choiceRule(item, arr, key) {
				arr.forEach(a => {
					a.checked = false;
				})
				item.checked = true;
				this.choiceChecked[key] = item.name;
				this.attr_value.forEach((obj, index) => {
					let arr = []
					Object.values(this.choiceChecked).forEach(item => {
						if (Object.values(obj).indexOf(item) > -1) {
							arr.push(true)
							if (arr.length == Object.keys(this.attr_name).length) {
								this.choiceGoods.is_buy_ubean = this.details.is_buy_ubean;
								this.choiceGoods.sale_price = obj.price;
								this.choiceGoods.goods_storage = obj.stock;
								this.choiceGoods.img = (obj.pic && obj.pic[0]['full_url']) || this.details
									.images[0];
								this.choiceGoods.market_price = obj.market_price;
								this.choiceGoods = Object.assign(this.choiceGoods, obj)
							}
						}
					})
				})
				this.toalPrice = this.details.is_buy_ubean == 1 ? ((Number(this.choiceGoods.sale_price) - Number(this
					.details.contribution_integral)) * this.goods_num) : (Number(this.choiceGoods.sale_price) * this
					.goods_num);
				// console.log(this.choiceGoods)
			},
			// 获取页面详情
			getDetails() {
				goodsApi.goodsDetail({
					id: this.goodsId
				}).then(res => {
					this.details = res.data;
					let attrName = res.data.sku.attr_name;
					// let attrValue = res.data.sku.attr_value;
					if (attrName) {
						let names = {}
						for (let key in attrName) {
							names[key] = [];
							attrName[key].forEach(item => {
								names[key].push({
									name: item,
									checked: false
								})
							})
						}
						this.attr_name = names;
					}
					// this.attr_value = attrValue
					this.choiceGoods.is_buy_ubean = this.details.is_buy_ubean;
					this.choiceGoods.contribution_integral = this.details.contribution_integral
					this.choiceGoods.sale_price = this.details.sale_price
					this.choiceGoods.goods_storage = this.details.goods_storage
					this.choiceGoods.integral = this.details.integral
					this.choiceGoods.img = this.details.images[0];
					this.choiceGoods.market_price = this.details.price;
					// this.attr_name = names;
					this.attr_value = res.data.sku.attr_value;
					this.toalPrice = Number(this.choiceGoods.sale_price) * this.goods_num;
					if (this.details.is_collect) {
						this.options[1]['icon'] = 'star-filled'
						this.options[1]['color'] = '#f15050'
					}
				}).catch(err => {})
			},
			changeNumber(val) { //改变商品数量
				this.toalPrice = this.details.is_buy_ubean == 1 ? ((Number(this.choiceGoods.sale_price) - Number(this
					.details.contribution_integral)) * val) : (Number(this.choiceGoods.sale_price) * val);
			},
			onClick(e) {
				console.log(e)
				if (e.index == 1) { //收藏商品
					if (!this.getToken) {
						uni.$tools.navToLogin()
						return;
					}
					this.goodsLikesFn();
				}
				if (e.index == 2) { //购物车
					uni.setStorageSync('tocar', 2);
					let pages = getCurrentPages();
					let pagelength = pages.length - 1;
					uni.navigateBack({
						delta: pagelength
					});
					return;
				}
				if (e.index == 0) { //店铺
					uni.navigateTo({
						url: "/pages/goods-details/store-details?merchant_id=" + this.details.merchant_id
					})
				}
			},
			buttonClick(type) {
				if (!this.getToken) {
					uni.$tools.navToLogin()
					return;
				}
				this.cartype = type;
				this.$refs.sku.open();
			},
			goodsLikesFn() { //收藏商品
				goodsApi.goodsCollect({goods_id: this.goodsId}).then(res => {
					const { status } = res.data
					if (status == 1) {
						uni.$tools.toast('收藏成功')
						this.options[1]['icon'] = 'star-filled'
						this.options[1]['color'] = '#f15050'
					} else {
						uni.$tools.toast('取消收藏')
						this.options[1]['icon'] = 'star'
						this.options[1]['color'] = '#333'
					}
				}).catch(e => {
					uni.$tools.toast(e.msg)
				})
			},
			getCart() {
				goodsApi.listCart({buyer_id: this.getUser.id}).then(res => {
					let list = res.data;
					let num = 0;
					list.forEach(item => {
						item.goods.forEach(goods => {
							num += goods.goods_num
						})
					})
					this.options[2]['info'] = num;
				}).catch(e => {})
			},
			close() {
				this.$refs.sku.close();
			},
			toStore() {
				uni.navigateTo({
					url: "/pages/goods-details/store-details?merchant_id=" + this.details.merchant_id
				})
			},
			back() {
				if (this.backtype) {
					uni.reLaunch({
						url: "/pages/main"
					})
					return;
				}
				uni.navigateBack()
			},
			submitFn() {
				if (Object.keys(this.choiceChecked).length != Object.keys(this.attr_name).length) {
					uni.$tools.toast('请选择要购买的商品规格')
					return;
				}
				if (this.cartype == 2) { //下单
					this.$refs.sku.close();
					uni.setStorageSync('rule', this.choiceChecked)
					uni.setStorageSync('choiceGoods', this.choiceGoods)
					uni.navigateTo({
						url: "/pages/order/order-confirm?id=" + this.goodsId + "&num=" + this.goods_num
					})
				} else { //加入购物车
					let data = {
						goods_id: this.goodsId,
						goods_num: this.goods_num,
						buyer_id: this.getUser.id,
						specs: JSON.stringify(this.choiceChecked)
					}
					goodsApi.addCart(data).then(res => {
						uni.setStorageSync('reshcar', 'goods_detail');
						this.$refs.sku.close();
						uni.$tools.toast(res.msg)
						this.getCart();
					}).catch(e => {
						uni.$tools.toast(e.msg)
						this.$refs.sku.close();
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop-details-page {
		min-height: 100vh;

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

		.share {
			background-image: url(../../static/images/share1.png);
		}

		.shop-swiper {
			height: 750rpx;
		}

		.goods-info {
			.price {
				height: 30rpx;
				line-height: 30rpx;
				background: linear-gradient(-60deg, #FF5C5D, #FF9F33);
				border-radius: 6rpx;
			}
		}

		.goods-details {}

		.rule-item {
			.rule {
				height: 48rpx;
				line-height: 48rpx;
				background-color: #fff;
				background-color: #F1F1F1;
				color: #333;

				&.active {
					background: linear-gradient(-45deg, #dd2b1c 0%, #ee3821 100%);
					color: #fff;
				}
			}
		}

		.submit {
			height: 70rpx;
			line-height: 70rpx;
			background: linear-gradient(-45deg, #dd2b1c 0%, #ee3821 100%);
		}

		.goods_left_sub {
			width: 160rpx;
		}

		.goods_right_sub {
			height: 90rpx;
			.sub {
				width: 180rpx;
				line-height: 70rpx;
			}
		}

		.shop-item {
			margin-right: 2%;
		}

		.shop-item:nth-child(2n) {
			margin-right: 0;
		}
	}
</style>
