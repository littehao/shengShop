<template>
	<view class="order-confirm bgf4f4">
		<comHead backshow titleshow title="订单确认" bgcolor="#fff"  class="border-bottom"></comHead>
		<view class="address-box bgffff mb-2">
			<template v-if="address">
				<view class="flex flex-column address px-3 pt-2" style="height: 188rpx;" @click="navTo('/pages/address/address')">
					<view  class="flex align-center mb-2">
						<text class="fs-24 ftffff bg-purple  rounded  px-1 mr-1" v-if="address.is_default == 1">默认</text>
						<text class="fs-24  ft3333">{{address.shipping_province + address.shipping_city + address.shipping_area}}</text>
					</view>
					<view class="fs-32 ft3333 mb-1">{{address.shipping_address}}</view>
					<view class="flex align-center fs-24 ft3333"><text class="mr-1">{{address.shipping_name}}</text><text>{{address.shipping_phone}}</text></view>
				</view>
			</template>
			<template v-else>
				<view class="flex align-center address px-3" style="height: 188rpx;" @click="navTo('/pages/address/add-address?title=添加地址')">
					<view class="fs-32 ft9999">添加收货地址</view>
				</view>
			</template>
		</view>
		<view class="rounded-lg bgffff px-2  pt-3">
			<block v-for="(item,index) in cartList" :key="index">
				<view class="car-item rounded bgffff mb-2">
					<view class="flex align-center">
						<text>{{item.merchant_name}}</text>
					</view>
					<block v-for="(goods,j) in item.goods" :key="j">
						<view class="flex align-center border-bottom py-3 goods-item" v-if="goods.checked || isShop">
							<image style="width: 164rpx;height:164rpx;" class="flex mr-3 bgf4f4 rounded" :src="goods.img" mode="aspectFill"></image>
							<view class="flex flex-column flex-1">
								<view class="fs-28 ft3333 font-weight-bold mb-1 text-ellipsis" style="width:500rpx">{{goods.goods_name}}</view>
								<view class="mb-1">
									<text class="fs-20 ft3333 bgf4f4 rounded goods-rule px-2">{{goods.ruletext}}</text>
								</view>
								<view class="flex align-center  justify-between">
									<view class="flex align-center">
										<text class="fs-24 ft3d3c">￥</text>
										<text class="fs-36 ft3d3c font-weight-bold">{{goods.sale_price}}</text>
									</view>
									<text class="fs-24 ftb2b2">数量：{{goods.goods_num}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</block>
			<view class="flex align-center justify-between fs-24 ft3333 py-2">
				<text>配送方式</text>
				<text>邮寄</text>
			</view>
			<view class="flex align-center justify-between fs-24 ft3333 py-2">
				<text>运费</text>
				<text>{{freights}}</text>
			</view>
			<view class="flex align-center justify-end pt-2 border-top" :class="{'py-2':goldnum == 0}">
				<text class="fs-24 ft3333">合计：</text>
				<text class="fs-32 ft3d3c"><text class="fs-24">￥</text>{{Number(goodsPayNum).toFixed(2) || '0.00'}}</text>
			</view>
			
		</view>
		<view style="height: 60px;"></view>
		
		<view class="bgffff px-3 position-fixed left-0 right-0  bottom-0 border-top"  :style="{height: (50 + getbottom)+'px'}">
			<view class="flex align-center justify-between" style="height: 50px;">
				<view class="flex align-center">
					<text class="fs-24 ft3333">合计{{goods_num}}件，共</text>
					<text class="fs-24 ft3d3c">￥</text>
					<text class="fs-48 ft3d3c font-weight-bold">{{Number(goodsPayNum).toFixed(2) || '0.00'}}</text>
				</view>
				<view class="submit_btn fs-24  ftffff rounded-circle btnBg  flex align-center justify-center" style="width: 200rpx;height: 70rpx;" @click="openway">立即支付</view>
			</view>
			<view :style="{height: getbottom+'px'}" class="bgffff"></view>
		</view>
		
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="goodsPayNum" 
		fromType="orderConfirm" 
		:address="address"
		:cartList="cartList"
		payType='1'
		></payconfig>
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue';
	import config from '@/config/index.js';
	import payconfig from "@/components/pay-modal/payconfig.vue";
	import  {mapActions,mapGetters}  from 'vuex';
	let frist = true;
	export default {
		components:{comHead,payconfig},
		data() {
			return {
				cartList:[],
				cart_ids:[],
				goodsPayNum:0,
				goods_num:1,
				address:null,
				goodsId:null,
				details:null,
				isShop:null,
				goldnum:0,
				rule:null,
				ruletext:'',
				choiceGoods:null,
				freights:null,  // 运费
			};
		},
		onLoad(query) {
			if(query.id){
				this.goodsId = query.id;
			}
			if(query.num){
				this.goods_num = query.num;
			}
			frist = true;
			this.getAddressFn();
		},
		onUnload() {
			let cartList = uni.getStorageSync('cartList');
			if(cartList)uni.removeStorageSync('cartList');
			let formCart = uni.getStorageSync('formCart');
			if(formCart)uni.removeStorageSync('formCart');
			uni.removeStorageSync('rule');
			uni.removeStorageSync('choiceGoods');
		},
		onShow() {
			let address = uni.getStorageSync('address');
			if(address){
				this.address  = JSON.parse(address);
			}else{
				this.address  = null;
				if(!frist)
				this.getAddressFn();
			}
		},
		created() {
			let form = uni.getStorageSync('formCart')
			if(form  == 'toorder'){
				this.isShop = false;
				this.getCart();
			}else{
				this.isShop = true;
				this.getDetails();
			}
		},
		computed:{
			...mapGetters(['getUser','getbottom','getToken','getConfig'])
		},
		methods:{
			getCart(){
				try{
						let cartList = uni.getStorageSync('cartList');
						this.cartList = cartList;
						let num  = 0,paynum=0,goldnum=0;
						let numarr = [];
						let goodFilter = {};
						let totalFreight = 0;
						this.cartList.forEach((item,index)=>{
								item.goods.forEach( (obj,ii) =>{
									if(obj.checked){
										numarr.push(obj.checked);
										// 将同种商品集合在一起
										if(goodFilter[`${obj.goods_id}`]){
											goodFilter[`${obj.goods_id}`].goods_num+=obj.goods_num;
										}else{
											goodFilter[`${obj.goods_id}`] = {
												goods_num:obj.goods_num,
												freight_template:obj.freight_template
											};
										}
									    paynum  += obj.goods_num * Number(obj.sale_price);
										goldnum += obj.goods_num * obj.points;
									}
								})
						});
						// 遍历计算运费
						for(var key in goodFilter){
							let objFreight = this.getFreight(goodFilter[key].freight_template,goodFilter[key].goods_num);
							if(objFreight != '免运费'){
								totalFreight += objFreight;
							}
						};
						this.freights = totalFreight+'元';
						num=numarr.length;
						this.goods_num = num
						this.goldnum = goldnum;
						this.goodsPayNum =  paynum+totalFreight;
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			async getAddressFn(){
				frist = false;
				myApi.getAddress({member_id:this.getUser.id}).then(res => {
					let list = res.data;
					if(list.length >  0){
						let address = uni.getStorageSync('address');
						if(address){
							let adrs = JSON.parse(address);
							let obj = list.find( item =>{
								return item.address_id  == adrs.address_id
							})
							if(obj){
								uni.setStorageSync('address',JSON.stringify(obj));
								this.address = obj;
							}else{
								uni.removeStorageSync('address')
								this.address = null;
							}
						}else{
							list.forEach(item =>{
								if(item.is_default  ==  1){
									this.address = item;
									uni.setStorageSync('address',JSON.stringify(item))
								}
							})
						}
					}else{
						uni.removeStorageSync('address');
					}
				})
			},
			async getDetails(){
				let rule  = uni.getStorageSync('rule');
				let choiceGoods  = uni.getStorageSync('choiceGoods');
				if(rule){
					this.rule  =  rule;
					this.ruletext = Object.values(rule).join(' ')
				}
				if(choiceGoods)this.choiceGoods  =  choiceGoods;
				goodsApi.goodsDetail({id:this.goodsId}).then(res => {
					let {freight_template} = res.data;
					this.details  = res.data;
					this.cartList = [{
						merchant_name:this.details.memchant_name,
						goods:[
							{
								goods_id:this.goodsId,
								goods_name: this.details.goods_name,
								goods_num: this.goods_num,
								img: this.details.images[0],
								merchant_name: this.details.memchant_name,
								points: this.details.points,
								sale_price:this.choiceGoods.sale_price,
								ruletext:this.ruletext||'',
								rule:this.rule||'',
							}
						]
					}]
					let freight = this.getFreight(freight_template,this.goods_num);
					if(freight != '免运费'){
						if(this.details.is_buy_ubean == 1){
							this.goodsPayNum = (Number(this.choiceGoods.sale_price)-Number(this.details.contribution_integral))* this.goods_num + freight;
						}else{
							this.goodsPayNum = Number(this.choiceGoods.sale_price) * this.goods_num + freight;
							this.freights = freight+'元';
						}
					}else{
						if(this.details.is_buy_ubean == 1){
							this.goodsPayNum = (Number(this.choiceGoods.sale_price)-Number(this.details.contribution_integral))* this.goods_num;
						}else{
							this.goodsPayNum = Number(this.choiceGoods.sale_price) * this.goods_num;
						}
						this.freights = freight;
					}
					this.goldnum = this.goods_num * this.details.points;
				})
			},
			// 计算运费
			getFreight(freight_template,goods_num){
				if(!freight_template){
					return "免运费";
				}else{
					const {type,basics_price,max_price,freight_price,basics_num,splicing_num,splicing_price} = freight_template;
					let freights = null;
					if(type==0 ){freights = "免运费"}
					else if(type==1 ){ // 按件收费
						if(Number(max_price)<=0){
							freights = "免运费";
						}else{
							if(Number(goods_num)<=Number(basics_num)){ // 小于最低件数
								if(Number(basics_price) < Number(max_price)){
									freights = basics_price;
								}else{
									freights = max_price;
								}
							}else{ // 大于最低件数
								let is_num = Math.ceil((goods_num-basics_num)/splicing_num);
								let totalSp_price = Number(splicing_price)*is_num; // 总续费价格
								let total_price = Number(basics_price) + totalSp_price; // 总运费
								// max_price 最大运费收费
								freights = Number(total_price) > Number(max_price)?max_price:total_price;
							}
						}
					}else if(type==2){
						freights=freight_price;
					}; // 按订单收费
					return freights == '免运费'?freights:Number(freights);
				}
			},
			openway(){
				if(!this.address){
					uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
					return;
				}
				this.$refs.payconfig.open()
			},
			navTo(url){
				uni.setStorageSync('from','order-confirm')
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="less">
.order-confirm{
	min-height: 100vh;
	.address-box{
		background-image: url(../../static/images/address_border.png);
		background-repeat: no-repeat;
		background-position: center bottom;
		background-size: 100%;
	}
	.address{
		background-image: url(../../static/images/right.png);
		background-repeat: no-repeat;
		background-position: 96% center;
		background-size: 16rpx;
	}
	.goods-rule{
		// width: 240rpx;
		height: 36rpx;
	}
	.price{
		height: 30rpx;
		line-height: 30rpx;
		// background: linear-gradient(-60deg, #FA6451, #E23D3C);
		border-radius: 6rpx;
	}
	.goods-item:last-child{
		border:0;
	}
}
</style>
