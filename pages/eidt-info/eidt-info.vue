<template>
	<view class="edit-info-page bgF5F5F5">
		<comHead backshow titleshow title="用户信息" bgcolor="#fff"  class="border-bottom"></comHead>
		<view class="bgffff rounded px-3 mx-2  mt-3">
			<view class="flex align-center justify-between border-bottom py-3">
				<text class="fs-30 ft3333">用户头像</text>
				<view class="flex align-center">
					<uni-file-picker 
						ref="files"
						fileMediatype="image"
					    disable-preview
					    :del-icon="false"
					    return-type="object"
						:image-styles="imageStyles"
						@select="select"
					>
					
					<image style="width: 100rpx;height: 100rpx;" class="flex rounded-circle" v-if="member_avatar" :src="member_avatar" mode="scaleToFill"></image>
					<image style="width: 100rpx;height: 100rpx;" class="flex rounded-circle" v-else src="../../static/images/default.png" mode="scaleToFill"></image>
					</uni-file-picker>
					<text class="iconfont icon-xiayibu fs-24 ft3333 ml-2"></text>
				</view>
			</view>
			<view class="flex align-center border-bottom py-4">
				<text class="fs-30 ft3333  mr-3">用户昵称</text>
				<input type="text" class="flex-1 fs-28 ft3333" v-model="nickname" placeholder="请输入昵称" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center py-4">
				<text class="fs-30 ft3333  mr-3">用户性别</text>
				<view class="flex align-center flex-1">
					<view class="flex align-center mr-4" @click="checkAdd(1)">
						<text class="checkbox checke mr-1" :class="{checked:checkIndex == 1}"></text>
						男
					</view>
					<view class="flex align-center" @click="checkAdd(2)">
						<text class="checkbox checke mr-1" :class="{checked:checkIndex == 2}"></text>
						女
					</view>
				</view>
			</view>
		</view>
		
		<view class="position-fixed left-0 right-0  bgF5F5F5  flex align-center justify-center" style="height: 60px;bottom: 50px;">
			<view class="btnBg fs-28 ftffff flex align-center justify-center rounded-circle mx-2 py-2  flex-1" @click="submit">确认</view>
		</view>
	</view>
</template>

<script>
	import baseApi from '@/api/baseApi.js'
	import comHead from '@/components/header/index.vue';
	import config from "@/config/index.js";
	const baseUrl = config.api + '/api/community/upload';
	import  {mapActions,mapGetters}  from 'vuex';
	import { getImageInfo } from "@/utils/common.js";
 	export default {
		components:{comHead},
		data() {
			return {
				checkIndex: 1,
				member_avatar:"",
				sex:1,
				nickname:'',
				imageStyles:{
					"height": 60,   // 边框高度
					"width": 60,    // 边框宽度
					"border":{ // 如果为 Boolean 值，可以控制边框显示与否
						"color":"#eee",     // 边框颜色
						"width":"1px",      // 边框宽度
						"style":"solid",    // 边框样式
						"radius":"50%"      // 边框圆角，支持百分比
					}
				}
			};
		},
		created(){
			let user =  uni.getStorageSync('user')
			if(user){
				this.member_avatar = user.member_avatar
				this.nickname = user.nickname
			}
			if(this.getUser.sex == '男'){
				this.checkIndex = 1;
			}else{
				this.checkIndex = 2;
			}
		},
		computed:{
			...mapGetters(['getToken','getUser']),
		},
		methods: {
			submit(){
				if(!this.member_avatar){
					uni.showToast({
						title:"请上传头像",
						icon:"none"
					})
					return;
				}
				if(!this.nickname){
					uni.showToast({
						title:"请输入昵称",
						icon:"none"
					})
					return;
				}
				let data  = {
					member_avatar:this.member_avatar,
					sex:this.sex,
					nickname:this.nickname,
				}
				baseApi.updateInfo(data).then(res => {
					this.GetInfo();
					uni.showToast({
						title:"修改成功",
						icon:"none"
					})
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:"none"
					})
				})
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser", res.data)
					setTimeout( ()=>{
						uni.navigateBack()
					},2000)
				})
			},
			upload(){
				this.$refs.files.upload()
			},
			select(e) {
				console.log(e)
				this.imgupload(e.tempFilePaths[0]);
			},
			imgupload(imgfile) {
				uni.showLoading();
				let _this = this;
			    try{
					uni.uploadFile({
						url: baseUrl,
						filePath: imgfile,
						name: "file",
						fileType: 'image',
						success: function(res) {
							console.log(imgfile);
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (res.statusCode == 200) {
								_this.member_avatar = data.data.url.filename;
							}
						},
						fail(err) {
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title: '图片上传失败',
								icon:'none',
								duration: 1500
							});
						}
					})
				}catch(e){ 
					console.log(e)
				}
			},
			checkAdd(index){
				this.checkIndex =  index;
				this.sex =  index;
			},
		},
	}
</script>

<style lang="less">
.edit-info-page{
	min-height: 100vh;
}
</style>
