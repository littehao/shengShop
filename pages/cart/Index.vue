<template>
	<view  class="car-page position-relative">
		<view class="header">
			<comHead></comHead>
			<view class="flex align-center justify-between px-3" style="height: 44px;">
				<image style="width: 165rpx;" src="../../static/images/car_title.png" mode="widthFix"></image>
				<text class="ftffff fs-28" @click="edit = !edit">管理</text>
			</view>
		</view>
		
		<view class="car-list position-relative">
			<view class="px-3">
				<template v-if="cartList">
					<template v-if="cartList.length > 0">
						<block v-for="(item,index) in cartList" :key="index">
							<view class="car-item rounded-lg bgffff py-3 px-2 mb-2">
								<view class="flex align-center">
									<text class="checkbox mr-2" :class="item.checked?'checked':'checke-top'" @click="checkShop(item)"></text>
									<text class="fs-28 ft3333">{{item.merchant_name}}</text>
								</view>
								<block v-for="(goods,j) in item.goods" :key="j">
									<view class="flex align-center border-bottom py-3 goods-item">
										<text class="checkbox mr-2" :class="goods.checked?'checked':'checke-top'" @click="checkGoods(goods)"></text>
										<image @click="togoods(goods)" style="min-width: 170rpx;height: 170rpx;" class="flex mr-3 bgf4f4 rounded" :src="goods.img" mode="aspectFill"></image>
										<view class="flex flex-column">
											<view class="fs-28 ft3333 font-weight-bold mb-1 text-ellipsis" style="width:400rpx">{{goods.goods_name}}</view>
											<view v-if="goods.ruletext" class="mb-1">
												<text class="fs-20 ft3333 bgf4f4 rounded goods-rule px-2">{{goods.ruletext}}</text>
											</view>
											<view class="flex align-center  justify-between">
												<view class="flex align-center"  style="width: 170rpx;">
													<text class="fs-24 ft5050">￥</text>
													<text class="fs-36 ft5050 font-weight-bold">{{goods.sale_price}}</text>
												</view>
												<uni-number-box :min="1" v-model="goods.goods_num"  @change="changeNumber(goods)"></uni-number-box>
											</view>
										</view>
									</view>
								</block>
							</view>
						</block>
					</template>
					<nulldata  v-else style="margin-top: 100px;" text="购物车是空的"></nulldata>
				</template>
			</view>
			<loading  ref="loading"></loading>
		</view>
		
		<template v-if="edit">
			<view class="px-3 border-top cart_bottom"  style="height: 110px;">
				<view class="flex align-center justify-between " style="height: 60px;">
					<view class="flex align-center">
						<view class="flex align-center mr-2" @click="checkAll">
							<text class="checkbox mr-2" :class="checkout?'checked':'checke'"></text>
							<text class="fs-24 ft3333">全选</text>
						</view>
					</view>
					<view class="submit_btn fs-28  ftffff rounded-circle bg7142  flex align-center justify-center" @click="deleteCartFn">删除</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="px-3 border-top cart_bottom"  style="height: 110px;">
				<view class="flex align-center justify-between" style="height: 60px;">
					<view class="flex align-center">
						<view class="flex align-center mr-2" @click="checkAll">
							<text class="checkbox mr-2" :class="checkout?'checked':'checke'"></text>
							<text class="fs-24 ft3333">全选</text>
						</view>
						<text class="fs-24 ft3333">合计{{goodsNum}}件，共</text>
						<text class="fs-24 ft5050">￥</text>
						<text class="fs-36 ft5050 font-weight-bold">{{goodsPayNum.toFixed(2)}}</text>
					</view>
					<view class="submit_btn btn2-bg fs-28  ftffff rounded-circle  flex align-center justify-center"  @click="orderTo">结算</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import  {mapActions,mapGetters}  from 'vuex'
	export default {
		components:{comHead,nulldata,loading},
		data(){
			return{
				edit:false,
				activeIndex1:1,
				activeIndex2:1,
				cartList:null,
				cart_ids:[],
				goodsNum:0,
				goodsPayNum:0,
				checkout:false,
				goodsallnum:0,//所有商品数量
			}
		},
		mounted() {
			if(!this.getToken){
				this.cartList = [];
			}else{
				this.$refs.loading.show();
				this.getCart();
			}
		},
		computed:{
			...mapGetters(['getUser','getToken'])
		},
		methods:{
			getCart(){
				let data = {buyer_id:this.getUser.id}
				goodsApi.listCart(data).then(res => {
					this.$refs.loading.hide();
					let list = res.data;
					let num  = 0,paynum=0;
					list.forEach(item=>{
						item.checked =  true;
						item.goods.forEach( obj =>{
							obj.ruletext = obj.specs && Object.values(obj.specs).join(' ') || ''
							obj.checked =  true;
							this.cart_ids.push(obj.cart_id)
							this.checkout = true;
							num +=  obj.goods_num;
							paynum  += obj.goods_num * Number(obj.sale_price);
						})
					})
					this.cartList = list;
					if(list.length < 1){
						this.checkout = false;
					}
					this.goodsNum = num;
					this.goodsallnum  = num;
					this.goodsPayNum =  paynum
				}).catch(err => {})
			},
			changeNumber(item){//改变商品数量
				let data = {
					goods_num:item.goods_num,
					cart_id:item.cart_id,
				}
				goodsApi.modifyCart(data).then(res => {
					this.getCart();
				}).catch(err => {})
			},
			deleteCartFn(){//删除购物车
				if(this.cart_ids.length < 1) return
				let  ids =  this.cart_ids.toString();
				goodsApi.deleteCart({cart_ids:ids}).then(res => {
					uni.$tools.toast(res.msg)
					this.getCart();
				}).catch(err => {
					uni.$tools.toast(err.data.msg)
				})
			},
			checkShop(item){
				item.checked  = !item.checked;
				item.goods.forEach( goods=>{
					if(item.checked)
					goods.checked  = true;
					else
					goods.checked  = false;
				})
				let num  = 0,paynum=0,arr=[];
				this.cartList.forEach(obj=>{
					if(obj.checked){
						obj.goods.forEach( it =>{
							arr.push(it.cart_id)
							num  += it.goods_num;
							paynum  += it.goods_num * Number(it.sale_price);
						})
					}else{
						obj.goods.forEach( (it,index) =>{
							arr.splice(index,1)
						})
					}
				})
				this.cart_ids = arr.filter((item, index) => arr.indexOf(item) === index); 
				// console.log(this.cart_ids);
				this.goodsNum = num;
				if(item.checked){
					if(this.goodsallnum == this.cart_ids.length){
						this.checkout  = true;
					}
				}else{
					this.checkout  = false;
				}
				this.goodsPayNum =  paynum
			},
			checkGoods(item){
				item.checked  = !item.checked;
				let arr = this.cart_ids;
				if(item.checked){
					if(!arr.includes(item.cart_id))
					arr.push(item.cart_id)
					this.goodsNum  = this.goodsNum + item.goods_num
					this.goodsPayNum += item.goods_num * Number(item.sale_price);
					if(this.goodsallnum == this.cart_ids.length)this.checkout  = true;
				}else{
					arr.splice(arr.findIndex(id => id == item.cart_id), 1)
					this.goodsNum  = this.goodsNum - item.goods_num
					this.goodsPayNum -= item.goods_num * Number(item.sale_price);
					this.checkout  = false;
				}
				this.cart_ids = arr.filter((item, index) => arr.indexOf(item) === index); 
				// console.log(this.cart_ids);
			},
			checkAll(){
				this.checkout = !this.checkout;
				if(this.checkout){
					let num  = 0,paynum=0,arr=this.cart_ids;
					this.cartList.forEach(obj=>{
						obj.checked = true;
						
						obj.goods.forEach( it =>{
							it.checked = true;
							arr.push(it.cart_id)
							num  += it.goods_num;
							paynum  += it.goods_num * Number(it.sale_price);
						})
						this.goodsNum = num;
						this.goodsPayNum =  paynum
					})
					this.cart_ids = arr.filter((item, index) => arr.indexOf(item) === index); 
					// console.log(this.cart_ids);
				}else{
					this.cartList.forEach(obj=>{
						obj.checked = false;
						obj.goods.forEach( it =>{
							it.checked = false;
						})
						this.goodsNum = 0;
						this.goodsPayNum =  0
					})
					this.cart_ids  = [];
				}
				
			},
			orderTo(){
				// console.log(this.cartList);
				if(this.goodsPayNum >  0){
					uni.setStorageSync('formCart','toorder');
					uni.setStorageSync('cartList',this.cartList);
					uni.navigateTo({
						url:"/pages/order/order-confirm"
					})
				}else{
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
				}
			},
			togoods(item){
				uni.navigateTo({
					url:"/pages/goods-details/goods-details?id="+item.goods_id
				})
			}
		}
	}
</script>

<style lang="less">
.car-page{
	height: 100%;
	background-image: url(../../static/images/cart_bg.png);
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center top;
	.header{
		height: calc(80px + var(--status-bar-height));
	}
	.car-list{
		height: calc(100% - 140px  - var(--status-bar-height));
		overflow-y: auto;
		.goods-rule{
			width: 240rpx;
			height: 36rpx;
		}
		.price{
			height: 30rpx;
			line-height: 30rpx;
			background: linear-gradient(-60deg, #FA6451, #E23D3C);
			border-radius: 6rpx;
		}
		.goods-item:last-child{
			border:0;
		}
	}
	.cart_bottom{
		// background-image: url(../../static/images/cart_btn_bg.png);
		// background-repeat: no-repeat;
		// background-size: 100%;
		// background-position: center top;
		background-color: #FFFFFF;
	}
	.checkbox{
		min-width: 32rpx;
		height: 32rpx;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius:50px;
		&.checke-top{
			background-image: url(../../static/images/checke.png);
		}
		&.checke{
			background-color: #FFFFFF;
			background-image: url(../../static/images/checke.png);
		}
		&.checked{
			background-image: url(../../static/images/checked.png);
		}
	}
	.submit_btn{
		width: 160rpx;
		height: 70rpx;
	}
	
	.rule-item{
		.rule{
			height: 48rpx;
			line-height: 48rpx;
			background-color: #F4F4F4;
			&.active{
				background-color: #E23D3C;
				color: #fff;
			}
		}
	}
	.submit{
		height: 70rpx;
		line-height: 70rpx;
	}
}
</style>
