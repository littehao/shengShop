<template>
	<view class="address-page bgF5F5F5">
		<comHead backshow titleshow title="我的地址" bgcolor="#fff"  class="border-bottom"></comHead>
		
		<view class="address-list px-2 py-3" v-if="addressList">
			<template v-if="addressList.length > 0">
				<block v-for="(item,index) in addressList" :key="index">
					<view class="rounded bgffff p-2 mb-2">
						<view class="flex align-center mb-2">
							<view class="flex align-center flex-1" @click="chioceAddress(item)">
								<text class="fs-32 ft3333 mr-6">{{item.shipping_name}}</text>
								<text class="fs-32 ft3333">{{item.shipping_phone}}</text>
							</view>
							<text class="checkbox checke" :class="{checked:checkIndex == index}" @click="checkFn(item,index)"></text>
						</view>
						<view @click="chioceAddress(item)">{{item.address}}</view>
						<view class="flex align-center justify-end mt-4">
							<text class="del-btn fs-24 rounded  p-1 mr-2 border ftEA4E3D bdEA4E3D"  @click="submitDel(item)">删除</text>
							<text class="edit-btn fs-24 btnBg rounded  p-1 ftffff" @click="navTo('编辑地址',item)">编辑</text>
						</view>
					</view>
				</block>
			</template>
			<nulldata  v-else></nulldata>
		</view>
		<loading  ref="loading"></loading>
		<view style="height: 60px;"></view>
		<view class="position-fixed left-0 right-0  bottom-0 bgF5F5F5  flex align-center justify-center" style="height: 60px;">
			<view class="btnBg fs-28 ftffff flex align-center justify-center rounded-circle mx-2 py-2  flex-1" @click="navTo('添加地址')">新 增</view>
		</view>
		
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog mode="base" type="info" title="提示" content="确认删除该地址吗？" 
			:duration="2000" 
			:before-close="true" 
			confirmcolor="#ED3C44"
			confirmText="确定"
			@close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import comHead from '@/components/header/index.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import  {mapActions,mapGetters}  from 'vuex'
	export default {
		components:{comHead,nulldata,loading},
		data() {
			return {
				checkIndex:-1,
				addressList:null,
				selectItem:null,
				isget:false
			};
		},
		computed:{
			...mapGetters(['getUser'])
		},
		onShow() {
			if(this.isget)this.getAddressFn();
		},
		mounted() {
			this.$refs.loading.show();
			this.getAddressFn();
		},
		onUnload() {
			let route = uni.getStorageSync('from');
			if(route) uni.removeStorageSync('from');
		},
		methods:{
			chioceAddress(item){
				let route = uni.getStorageSync('from');
				if(route){
					uni.setStorage({
					    key: 'address',
					    data: JSON.stringify(item),
					    success: function () {
					        uni.navigateBack();
					    }
					});
				}
			},
			getAddressFn(){
				myApi.getAddress({member_id:this.getUser.id}).then(res => {
					this.$refs.loading&&this.$refs.loading.hide();
					this.isget = true;
					this.addressList = res.data;
					this.addressList.forEach( (item,index) =>{
						if(item.is_default == 1)this.checkIndex = index;
					})
				}).catch(e => {
					this.addressList = [];
					this.isget = true;
					this.$refs.loading&&this.$refs.loading.hide();
				})
			},
			submitDel(item){
				this.$refs.popup.open();
				this.selectItem  = item;
			},
			delAddressFn(){
				myApi.delAddress({id:this.selectItem.address_id}).then(res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if(this.selectItem.is_default == 1){
						this.checkIndex  =  -1;
					}
					let address = uni.getStorageSync('address');
					if(address){
						let adrs = JSON.parse(address);
						if(this.selectItem.address_id  == adrs.address_id)
						uni.removeStorageSync('address');
					}
					this.getAddressFn();
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			confirm(){
				this.$refs.popup.close();
				this.delAddressFn();
			},
			close(){
				this.$refs.popup.close();
			},
			checkFn(item,index){
				this.checkIndex = index;
				this.addAddressFn(item);
			},
			addAddressFn(item){//修改
				let data = {
					shipping_name:item.shipping_name,
					shipping_phone:item.shipping_phone,
					shipping_province:item.shipping_province,
					shipping_city:item.shipping_city,
					shipping_area:item.shipping_area,
					shipping_address:item.shipping_address,
					is_default:1,
					member_id:this.getUser.id,
					address_id:item.address_id
				}
				if(this.address_id){
					data.address_id =  this.address_id;
				}
				myApi.addAddress(data).then(res => {
					this.getAddressFn();
					uni.showToast({
						title:'修改成功',
						icon:'none'
					});
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			navTo(title,item){
				if(item){
					uni.setStorageSync('edit_address',JSON.stringify(item))
					uni.navigateTo({
						url:`/pages/address/add-address?title=${title}&address_id=${item.address_id}`
					})
					return;
				}
				uni.navigateTo({
					url:`/pages/address/add-address?title=${title}`
				})
				
			}
		}
	}
</script>

<style lang="less">
.address-page{
	min-height: 100vh;
}
</style>
