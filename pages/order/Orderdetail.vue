<template>
	<view class="ordetail-page bgF5F5F5">
		<com-head :titleshow="true" title="订单详情" color="#fff" class="active-header-bg" :isfiexd="true" :backshow="true"></com-head>
		<view class="ordetail-main px-2">
			<view class="flex align-center justify-between">
				<view class="ftffff pt-4 w-100 pb-2">
					<view v-if="Bg_flag===1" class="flex justify-center align-end">
						<image src="../../static/images/payment.png" mode="aspectFit" style="width: 180rpx;height: 180rpx;" class="mr-2"></image>
						<view class="">
							<view class="fs-30 py-1">等待付款</view>
							<view class="fs-24 py-1">剩余23:34:45自动取消订单</view>
						</view>
					</view>
					<view v-else-if="Bg_flag===2" class="flex justify-center align-end"> 
					    <image src="../../static/images/Receiving.png" mode="aspectFit" style="width: 180rpx;height: 180rpx;" class="mr-2"></image>
						<view class="">
							<view class="fs-30 py-1">等待收货</view>
							<view class="fs-24 py-1">包裹正快马加鞭的运输，请耐心等待</view>
						</view>
					</view>
					<view v-else-if="Bg_flag===3" class="flex justify-center align-end">
						<image src="../../static/images/complete.png" mode="aspectFit" style="width: 180rpx;height: 180rpx;" class="mr-2"></image>
						<view class="">
							<view class="fs-30 py-1">订单已完成</view>
							<view class="fs-24 py-1">感谢您的购买，欢迎您下次光临</view>
						</view>
					</view>
					<view v-else-if="Bg_flag===6" class="flex justify-center align-end">
						<image src="../../static/images/send.png" mode="aspectFit" style="width: 180rpx;height: 180rpx;" class="mr-2"></image>
						<view class="">
							<view class="fs-30 py-1">等待发货！</view>
							<view class="fs-24 py-1">包裹正在打包中，请耐心等待</view>
						</view>
					</view>
					<view v-else-if="Bg_flag===4" class="flex justify-center align-end">
						<image src="../../static/images/cancel.png" mode="aspectFit" style="width: 180rpx;height: 180rpx;" class="mr-2"></image>
						<view class="">
							<view class="fs-30 py-1">订单已取消</view>
							<view class="fs-24 py-1">您的订单已成功取消</view>
						</view>
					</view>
				</view>
			</view>
			<view class="p-3 bgffff rounded mt-5">
				<block v-for="(item,index) in shoplist.merchant" :key="index">
					<view :class="{'mb-2':shoplist.merchant.length-index !== 1}">
						<view class="mb-2 fs-32">{{status === '待付款'?item.merchant_name:shoplist.merchant_name}}</view>
						<view class="flex justify-start align-self" :class="[{'mb-2':item.goods.length-index !== 1}]" v-for="(val,index) in item.goods" :key="index">
							<image :src="val.img" class="rounded d-block" mode="aspectFill" style="width: 164rpx;height: 164rpx;"></image>
							<view class="flex-1 pl-3">
								<view class="fs-28">{{val.goods_name}}</view>
								<view class="fs-24 ft5050">￥<text class="fs-36">{{val.unit_price}}</text></view>
								<view class="mb-1" v-if="val.specs">
									<text class="fs-20 ft3333 bgf4f4 rounded goods-rule px-2">{{Object.values(val.specs.specs).join(' ')}}</text>
								</view>
								<view class="flex  align-center mb-1">
									<text class="fs-24">共{{val.goods_num}}件</text>
									<view class="py-1 px-2 border rounded-circle fs-24 ft5050" @click="navTo(val.goods_id)" v-if="shoplist.shipping_code">
										查看物流
									</view>
								</view>
							</view>
						</view>
						<view class="flex justify-between align-center px-2 py-1 rounded-lg" v-if="item.freight" style="background: linear-gradient(180deg, #ffffff, #f4f4f4);">
							<text class="fs-24 ft9999">商铺总运费</text>
							<text class="fs-24 ftED3C" >￥<text class="fs-24">{{Number(item.freight).toFixed(2)}}</text></text>
						</view>
					</view>
				</block>
				<view class="flex justify-between align-center pt-4 pb-2 fs-28">
					<view class="">订单总运费</view>
					<view class="fs-28"><text class="fs-24">￥</text>{{Number(shoplist.freight).toFixed(2) || '0.00'}}</view>
				</view>
				<view class="flex justify-between align-center fs-28">
					<view class="">付款金额</view>
					<view class="fs-28"><text class="fs-24">￥</text>{{Number(shoplist.order_amount).toFixed(2)}}</view>
				</view>
			</view>
			<view class="px-3 bgffff mt-2 py-1 rounded-lg">
				<view class="py-2 flex justify-between align-center">
					<view class="">订单编号</view>
					<view class="">{{shoplist.order_no}}</view>
				</view>
				<view class="py-2 flex justify-between align-center">
					<view class="">下单时间</view>
					<view class="">{{shoplist.created_at}}</view>
				</view>
				<view class="py-2 flex justify-between align-center">
					<view class="">发货时间</view>
					<view class="">{{shoplist.gmt_ship}}</view>
				</view>
			</view>
			<view class="px-3 bgffff mt-2 py-1 rounded-lg" v-if="type">
				<view class="py-2 flex justify-between align-center">
					<view class="">积分详情</view>
					<view class="">总积分{{Number(order_integral.integral_total)}}</view>
				</view>
				<block v-for="(item,index) in integral_list" :key="item.id">
					<view v-if="integral_list.length" class="py-2 flex justify-between align-center">
						<text class="fs-24">{{item.created_at}}</text>
						<text class="fs-24">-{{Number(item.release_integral)}}</text>
					</view>
				</block>
				<view class="py-2 flex justify-end align-center">
					<view class="ft-purple">{{Number(order_integral.surplus_integral)}}</view>
				</view>
			</view>
			<view v-if="!type" class="px-3 py-1 bgffff mt-2 rounded-lg">
				<view class="py-2 flex justify-between align-center">
					<view class="">快递公司</view>
					<view class="">{{shoplist.shipping_express_name || '-'}}</view>
				</view>
				<view class="py-2 flex justify-between align-center">
					<view class="">快递单号</view>
					<view class="">{{shoplist.shipping_code || '-'}}</view>
				</view>
			</view>
			<view class="px-3 bgffff mt-2 py-1 rounded-lg">
				<view class="py-2 flex justify-between align-center">
					<view class="">收件人</view>
					<view class="">{{shoplist.shipping_name}}</view>
				</view>
				<view class="py-2 flex justify-between align-center">
					<view class="">电话号码</view>
					<view class="">{{shoplist.shipping_phone}}</view>
				</view>
				<view class="py-2 flex justify-between align-center">
					<view class="mr-6" style="word-break:keep-all;white-space:nowrap;">地址</view>
					<view class="">{{shoplist.shipping_address}}</view>
				</view>
			</view>
			<view class="py-5 my-5"></view>
			<view class="w-100 py-2 bgffff flex justify-end align-center position-fixed left-0 bottom-0 border-top" v-if="Bg_flag===1 && !type">
				<view class="boxsizing btn-whr fs-24 ft3333 border flex justify-center align-center border-light-secondary mr-2" @click="clickCancel">取消订单</view>
				<view class="btn-whr fs-24 btnBg  flex justify-center align-center mr-2 mr-1 ftffff" @click="openup">立即付款</view>
			</view>
			<view class="w-100 py-2 bgffff flex justify-end align-center position-fixed left-0 bottom-0 border-top" v-if="Bg_flag===2 && !type">
				<view class="btn-whr fs-24 ftffffff border flex justify-center align-center btnBg mr-2" @click="clickRetreat()">确认收货</view>
			</view>
		</view>

		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="parameter.goodsPayNum" 
		:orderNo="parameter.order_no" 
		payType='1'
		@loadData="Refresh" 
		fromType="orderList"></payconfig>
		
		<uni-popup ref="dialog" type="dialog" style="z-index: 999999;">
			<uni-popup-dialog mode="base" :title="title" type="info" confirmcolor="#8201F2" :duration="2000" :before-close="true" @close="close" @confirm="confirm()" :content="contents"></uni-popup-dialog>
		</uni-popup>
		<Loading ref="Load" style="z-index: 99999;"></Loading>
	</view>
</template>

<script>
	import {mapActions} from "vuex";
	import myApi from '@/api/myApi.js'
	import payconfig from "@/components/pay-modal/payconfig.vue";
	import comHead from "@/components/header/index.vue";
	import Loading from "@/components/loading/loading.vue";
	export default{
		components:{
			comHead,
			Loading,
			payconfig
		},
		data(){
			return{
				order_no:null, //路由传参参数
				shoplist:{},
				status:null,
				contents: "",
				title:'',
				merchant_id:null,
				parameter:{},
				statu:null,
				type:null,
				integral_list:[],
				order_integral:{}
			}
		},
		onShow() {
			let _this = this;
			let route = uni.getStorageSync('back');
			if(route) uni.removeStorage({
				key: 'back',
				success: function (res) {
					_this.Show();
					_this.$refs.Bottom.getPayConfigList();
					_this.getOrderDetail();
				}
			});
		},
		computed:{
			bg_Img(){
				switch(this.statu){
					case "待付款": 
					return "payment";
					break;
					case "待收货":
					return "Receiving";
					break;
					case "已签收":
					return "complete";
					break;
					case "已取消":
					return "cancel";
					break;
					default:
					return "";
					break;
				}
			},
			Bg_flag(){
				switch(this.statu){
					case "待付款": 
					return 1;
					break;
					case "待收货":
					return 2;
					break;
					case "已签收":
					return 3
					break;
					case "已取消":
					return 4;
					break;
					case "待发货":
					return 6;
					break;
					default:
					return null;
					break;
				}
			},
		},
		onLoad(option) {
			this.order_no = option.order_no;
			if(option.status)this.statu = option.status;
			if(option.merchant_id)this.merchant_id=option.merchant_id;
			if(option.type){this.type = option.type;this.statu = '已签收'};
		},
		mounted(){
			this.Show();
			this.getOrderDetail();
		},
		methods:{
			// 订单详情
			async getOrderDetail(){
				let data = {order_no:this.order_no};
				try{
					let data = {order_no:this.order_no};
					let res = null;
					if(this.Bg_flag!==1 && !this.type){
						data.merchant_id=this.merchant_id;
						res = await myApi.orderMerchantDetail(data);
					}else{
						res = await myApi.orderDetail(data);
					}
					if(res.code == 200){
						this.shoplist = res.data;
						if(res.data.status !== '待付款'){
							if(this.type){
								// 积分订单进入
								this.integral_list = res.data.integral_details;
								this.order_integral = res.data.order_integral;
							}else{
								// 商品订单进入
								this.shoplist.merchant=[];
								this.shoplist.merchant[0] = {};
								this.shoplist.merchant[0].goods = res.data.goods;
								this.shoplist.merchant[0].freight = res.data.freight;
							}
						}else{
							this.parameter={
								order_no:res.data.order_no,
								goodsPayNum:res.data.order_amount,
							};
						}
						this.status = res.data.status;
						this.statu = res.data.status;
						this.Hide();
					}
				}catch(e){
					this.Hide();
					console.log(e)
				}
			},
			Refresh(){
				uni.navigateBack();
			},
			// open close
			clickCancel() {
				this.title='订单取消';
				this.contents="是否确认取消订单？";
				this.$refs.dialog.open();
			},
			// open confirm
			clickRetreat(){
				this.title='确认收货';
				this.contents="请收到商品确认无误后再确认收货";
				this.$refs.dialog.open();
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.dialog.close()
			},
			//打开支付弹框
			openup() {
				this.$refs.payconfig.open();
			},
			async confirm(value) {
				try {
					let _this = this;
					this.$refs.dialog.close();
					uni.showLoading({
						title: _this.status == '待付款' ? '取消中...' : '加载中...'
					})
					let res;
					if(_this.status == '待付款'){  // 取消订单
						res = await this.orderCancle({
							order_no: this.shoplist.order_no
						});
					}else{  // 确认收货
						res = await this.confirmReceipt({
							order_no: this.shoplist.order_no,
							merchant_id:this.shoplist.goods[0].merchant_id
						});
					}
					uni.hideLoading();
					if (res.code == '200') {
						uni.showToast({
							title: _this.status == '待付款' ? '取消成功' : '收货成功',
							duration:1000
						});
						let timer = null;
						if(timer){
							timer=null;
							clearTimeout(timer);
						}
						timer = setTimeout(()=>{
							this.Refresh();
							clearTimeout(timer)
						},1500);
						this.title='';
						this.contents="";
						uni.setStorageSync('Refresh','Orderdetail');
					}
				} catch (e) {
					uni.hideLoading();
					this.$refs.dialog.close();
					uni.showToast({
						title: e.data.msg,
						icon: 'none'
					});
					console.log(e)
				}
			},
			//显示隐藏加载框
			Show() {
				this.$refs.Load.show();
			},
			Hide() {
				this.$refs.Load.hide();
			},
			navTo(goods_id){
				uni.navigateTo({
					url:"/pages/logistics/logistics?order_no="+this.shoplist.order_no+'&goods_id='+goods_id
				})
			}
		},
	}
</script>

<style lang="less">
	.ordetail-page{
		height: 100%;
		background-image: url(../../static/images/orderdetail_bg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;
		.active-header-bg{
			height: 100%;
			background-image: url(../../static/images/orderdetail_bg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
		}
		.ordetail-main{
			 min-height: calc(100vh - 44px - var(--status-bar-height));
			.btn-whr{
				width: 200rpx;
				height: 70rpx;
				border-radius: 35rpx;
			}
		}
		
	}
	
</style>
