<template>
	<view class="add-address bgf4f4">
		<comHead backshow titleshow :title="title" bgcolor="#fff" class="border-bottom"></comHead>

		<view class="px-2 pt-3">
			<view class="rounded bgffff  px-3">
				<view class="flex align-center py-4 border-bottom">
					<text class="fs-30 ft3333 mr-3" style="width: 120rpx;flex-shrink: 0;">姓名</text>
					<input type="text" class="flex-1 fs-24 ft3333" v-model="address.shipping_name" placeholder="请输入收件人姓名" placeholder-class="placeholder" />
				</view>
				<view class="flex align-center py-4 border-bottom">
					<text class="fs-30 ft3333 mr-3" style="width: 120rpx;flex-shrink: 0;">手机号</text>
					<input type="number" class="flex-1 fs-24 ft3333" v-model="address.shipping_phone" placeholder="请输入收件人手机号码" placeholder-class="placeholder" />
				</view>
				<view class="flex align-center py-4 border-bottom">
					<text class="fs-30 ft3333 mr-3" style="width: 120rpx;flex-shrink: 0;">地址</text>
					<view class="flex-1">
						<AddressPicker style="width: 100%;height: 50rpx;line-height: 50rpx;" @change="change" :level="3">
							<view v-if="planLocate">{{planLocate}}</view>
							<view v-else class="fs-28 fta0a0">请选择收件人地址</view>
						</AddressPicker>
					</view>
					<image style="width: 30rpx;" src="../../static/images/address.png" mode="widthFix"></image>
				</view>
				<view class="flex align-center py-4 border-bottom">
					<text class="fs-30 ft3333 mr-3" style="width: 120rpx;flex-shrink: 0;">详细地址</text>
					<input type="text" class="flex-1 fs-24 ft3333" v-model="address.shipping_address" placeholder="请输入详细地址" placeholder-class="placeholder" />
				</view>
				<view class="flex align-center py-4 border-bottom">
					<text class="fs-30 ft3333 mr-3" style="width: 120rpx;flex-shrink: 0;">默认地址</text>
					<view class="flex align-center">
						<view class="flex align-center mr-4" @click="checkAdd(1)">
							<text class="checkbox checke mr-1" :class="{checked:checkIndex == 1}"></text>
							是
						</view>
						<view class="flex align-center" @click="checkAdd(0)">
							<text class="checkbox checke mr-1" :class="{checked:checkIndex == 0}"></text>
							否
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="position-fixed left-0 right-0  bottom-0 bgf4f4  flex align-center justify-center" style="height: 60px;">
			<view class="btnBg fs-28 ftffff flex align-center justify-center rounded-circle mx-2 py-2  flex-1" @click="addAddressFn">确认</view>
		</view>
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import comHead from '@/components/header/index.vue'
	import AddressPicker from "@/components/addressPicker/addressPicker.vue"
	import  {mapActions,mapGetters}  from 'vuex'
	export default {
		components: {
			comHead,
			AddressPicker
		},
		data() {
			return {
				planLocate: "",
				checkIndex:1,
				title:"添加地址",
				address:{
					shipping_name:"",
					shipping_phone:'',
					shipping_province:"",
					shipping_city:"",
					shipping_area:"",
					shipping_address:"",
				},
				member_id:"",
				address_id:""
			};
		},
		onLoad(query) {
			this.title =  query.title
			if(query.address_id){
				this.address_id = query.address_id;
			}
			let address = uni.getStorageSync('edit_address')
			if(address){
				let adres = JSON.parse(address);
				this.address = {
					shipping_name:adres.shipping_name,
					shipping_phone:adres.shipping_phone,
					shipping_province:adres.shipping_province,
					shipping_city:adres.shipping_city,
					shipping_area:adres.shipping_area,
					shipping_address:adres.shipping_address,
				}
				this.checkIndex  = adres.is_default;
				this.address_id = query.address_id;
				this.planLocate = `${adres.shipping_province}-${adres.shipping_city}-${adres.shipping_area}`;
			}
		},
		onUnload() {
			let address = uni.getStorageSync('edit_address')
			if(address)  uni.removeStorageSync('edit_address');
		},
		computed:{
			...mapGetters(['getUser'])
		},
		methods: {
			addAddressFn(){//新增/修改
				if(Object.values(this.address).some(item => item == '')){
					uni.showToast({
						title:"信息不能有空",
						icon:'none'
					})
					return
				}
				let data = {
					...this.address,
					is_default:this.checkIndex,
					member_id:this.getUser.id,
				}
				if(this.address_id){
					data.address_id =  this.address_id;
				}
				myApi.addAddress(data).then(res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					setTimeout( ()=>{
						uni.navigateBack();
					},2000)
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			checkAdd(index){
				this.checkIndex =  index;
			},
			change(result) {
				this.planLocate = '';
				result.data.forEach((item, index) => {
					if (index === 0) {
						this.planLocate += item.name
					} else {
						this.planLocate += '-' + item.name
					}
				});
				let arr = this.planLocate.split('-');
				this.address.shipping_province=arr[0];
				this.address.shipping_city=arr[1];
				this.address.shipping_area=arr[2];
			},
		}
	}
</script>

<style lang="less">
	.add-address {
		min-height: 100vh;
	}
</style>
