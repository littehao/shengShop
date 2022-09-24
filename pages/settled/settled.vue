<template>
	<view class="apply-agent bgf4f4">
		<com-head :titleshow="true" color="#333" :backshow="true" bgcolor="#fff" title="入驻商城"></com-head>

		<view class="rounded-lg bg-white  px-2 mx-3 mt-3 mb-2 pb-3">
			<template v-if="!disabled">
				<view class="flex align-center  py-3 border-bottom">
					<text class="fs-32  Color333  mr-2" style="width: 150rpx;">姓名:</text>
					<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
						placeholder="请输入姓名" placeholder-class="placeholder" v-model="form.contact" :disabled="disabled">
				</view>
				<view class="flex align-center  py-3  border-bottom">
					<text class="fs-32  Color333  mr-2" style="width: 150rpx;">联系电话:</text>
					<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
						placeholder="请输入联系电话" placeholder-class="placeholder" v-model="form.mobile_phone"
						:disabled="disabled">
				</view>
				<view class="flex align-center  py-3  border-bottom">
					<text class="fs-32  Color333  mr-2" style="width: 150rpx;">店铺名称:</text>
					<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
						placeholder="请输入公司名称" placeholder-class="placeholder" v-model="form.merchant_name"
						:disabled="disabled">
				</view>
				<view class="flex align-center  py-3  border-bottom">
					<text class="fs-32  Color333  mr-2" style="width: 150rpx;">所在地区:</text>
					<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
						placeholder="请输入所在地区" placeholder-class="placeholder" v-model="form.address"
						:disabled="disabled">
				</view>
				<view class="flex align-center  py-3  border-bottom">
					<text class="fs-32  Color333  mr-2" style="width: 150rpx;">让利比例:</text>
					<view class="flex-1  Color333 fs-28" @click="$refs.bilipopup.open()">
						<text class="fs-28" :class="form.yield_rate?'Color333':'placeholder'">{{form.yield_rate || '请选择'}}</text>
					</view>
				</view>
				<view class="upload mt-3">
					<text class="fs-32  Color333 flex mb-2">营业执照:</text>
					<view class="bgffff flex align-center border" style="width: 200px;height: 120px;">
						<uni-file-picker v-model="businesslicenseurl" fileMediatype="image" return-type="array"
							@select="selectbusinesslicenseurl" :image-styles="imagesStyle" mode="grid"
							:auto-upload="false" limit="1">
							<view class="flex flex-column justify-center text-center">
								<text class="iconfont icon-tianjia fs-60 ft9999"></text>
								<view class="fs-28 ft9999 mt-2">营业执照</view>
							</view>
						</uni-file-picker>
					</view>
				</view>
				<view class="upload mt-3">
					<text class="fs-32  Color333 flex mb-2">身份证正面:</text>
					<view class="bgffff flex align-center border" style="width: 200px;height: 120px;">
						<uni-file-picker v-model="cardfront" fileMediatype="image" return-type="array"
							@select="selectcardfront" :image-styles="imagesStyle" mode="grid" :auto-upload="false"
							limit="1">
							<view class="flex flex-column justify-center text-center">
								<text class="iconfont icon-tianjia fs-60 ft9999"></text>
								<view class="fs-28 ft9999 mt-2">身份证正面</view>
							</view>
						</uni-file-picker>
					</view>
				</view>
				<view class="upload mt-3">
					<text class="fs-32  Color333 flex mb-2">身份证背面:</text>
					<view class="bgffff flex align-center border" style="width: 200px;height: 120px;">
						<uni-file-picker v-model="cardback" fileMediatype="image" return-type="array"
							@select="selectcardback" :image-styles="imagesStyle" mode="grid" :auto-upload="false"
							limit="1">
							<view class="flex flex-column justify-center text-center">
								<text class="iconfont icon-tianjia fs-60 ft9999"></text>
								<view class="fs-28 ft9999 mt-2">身份证背面</view>
							</view>
						</uni-file-picker>
					</view>
				</view>
				<view class="upload mt-3">
					<text class="fs-32  Color333 flex mb-2">门头照:</text>
					<view class="bgffff flex align-center border" style="width: 200px;height: 120px;">
						<uni-file-picker v-model="companyreceptionimage" fileMediatype="image" return-type="array"
							@select="selectcompanyreceptionimage" :image-styles="imagesStyle" mode="grid"
							:auto-upload="false" limit="1">
							<view class="flex flex-column justify-center text-center">
								<text class="iconfont icon-tianjia fs-60 ft9999"></text>
								<view class="fs-28 ft9999 mt-2">门头照</view>
							</view>
						</uni-file-picker>
					</view>
				</view>

			</template>
			<view v-else class="flex align-center  py-3  border-bottom">
				<text class="fs-32  Color333  mr-2" style="width: 150rpx;">店铺名称:</text>
				<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
					placeholder="请输入公司名称" placeholder-class="placeholder" v-model="form.merchant_name"
					:disabled="disabled">
			</view>
		</view>
		<view style="height: 50px;" v-if="!disabled"></view>
		<view class="btnBg ftffff rounded-lg  mx-3 py-3 flex align-center justify-center fs-36" @click="clickEnter"
			v-if="!disabled">入驻申请</view>
		<view v-else class="fta0a0 py-2 text-center">
			<view v-if="getUser.merchant.status == '0'">入驻申请已提交，请耐心等待管理员审核~</view>
			<template v-if="getUser.merchant.status == '2'" >
				<view>驳回原因：{{getUser.merchant.back_message}}~</view>
				<view class="flex align-center justify-center">入驻申请已被驳回，请点击<text
						class="ft3d3c" @click="resetFn">重新提交</text>资料~</view>
			</template>
		</view>
		<view style="height: 50px;" v-if="!disabled"></view>
		
		<uni-popup ref="bilipopup" type="bottom">
			<view class="w-100 bgffff rounded-top-llg" style="min-height: 30vh;">
				<view class="position-relative text-center py-3 w-100  border-bottom">
					<text class="fs-30">选择让利比例</text>
					<text class="iconfont icon-cuowu fs-48 fta0a0 position-absolute icon-style" style="right: 10px;top:10px;" @click="$refs.bilipopup.close()"></text>
				</view>
				<view>
					<block v-for="(item,index) in rateList" :key="item">
						<view class="fs-28 text-center ft3333 py-2 border-bottom" @click="changeRate(item)">{{item}}</view>
					</block>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import myApi from '@/api/myApi.js'
	import baseApi from '@/api/baseApi.js'
	import config from "@/config/index.js";
	import comHead from '@/components/header/index.vue'
	import nullData from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	const baseUrl = config.api + '/api/community/upload';
	export default {
		components: {
			comHead,
			nullData,
			loading
		},
		data() {
			return {
				form: {
					contact: "",
					merchant_name: "",
					mobile_phone: "",
					address: "",
					yield_rate:''
				},
				rateValue:'',
				rateList:[0.1,0.15,0.2,0.25,0.3],
				merchantsimageurl: [],
				merchants_image_url: "",
				businesslicenseurl: [],
				business_license_url: "",
				bankcardimage: [],
				bank_card_image: "",
				companyreceptionimage: [],
				company_reception_image: "",

				cardfront: [],
				card_front: "",
				cardback: [],
				card_back: "",
				id_card_image: [],

				bloblist: [],
				resources: [],
				disabled: false,
				DestroyIncomeStatistics: true,
				imageValue: [],
				imagesStyle: {
					"height": 100, // 边框高度
					"width": 200, // 边框宽度
					"border": false, // 是否显示边框
				},

			};
		},
		created() {
			if (this.getUser && JSON.stringify(this.getUser.merchant) == '[]') { //不是商户
				this.disabled = false;
			} else {
				if (this.getUser && JSON.stringify(this.getUser.merchant) != '[]' && this.getUser.merchant.status == 2) { //驳回
					this.disabled = true;
					this.form = this.getUser.merchant;
				} else if (this.getUser && JSON.stringify(this.getUser.merchant) != '[]' && this.getUser.merchant.status == '0') { //提审了
					this.disabled = true;
					this.form = this.getUser.merchant;
				}
			}
		},
		computed: {
			...mapGetters(['getUser']),
		},
		methods: {
			changeRate(rate){
				this.form.yield_rate = rate
				this.$refs.bilipopup.close()
			},
			selectmerchantsimageurl(e) {
				this.imgupload(e.tempFilePaths[0], 'merchants_image_url');
			},
			selectbusinesslicenseurl(e) {
				this.imgupload(e.tempFilePaths[0], 'business_license_url');
			},
			selectbankcardimage(e) {
				this.imgupload(e.tempFilePaths[0], 'bank_card_image');
			},
			selectcompanyreceptionimage(e) {
				this.imgupload(e.tempFilePaths[0], 'company_reception_image');
			},
			selectcardfront(e) {
				this.imgupload(e.tempFilePaths[0], 'card_front');
			},
			selectcardback(e) {
				this.imgupload(e.tempFilePaths[0], 'card_back');
			},
			select(e) {
				//当选择多张一起上传
				if (e.tempFilePaths.length > 1) {
					e.tempFiles.map((item, index) => {
						this.imgupload(e.tempFilePaths[index], 'company_indoor_image');
					})
					// console.log(e.tempFilePaths)
					return;
				}
				//单张上传
				// let blob = e.tempFiles[0].uuid;
				this.imgupload(e.tempFilePaths[0], 'company_indoor_image');
				console.log(e.tempFilePaths)
			},
			// 图片上传
			async imgupload(imgfile, type) {
				uni.showLoading({
					title: '',
					mask: true
				});
				let _self = this;
				try {
					uni.uploadFile({
						url: baseUrl,
						filePath: imgfile,
						header: {
							Authorization: uni.getStorageSync('token')
						},
						name: "file",
						fileType: 'image',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							console.log(data)
							if (res.statusCode == '200') {
								switch (type) {
									case 'merchants_image_url': //1
										_self.merchants_image_url = data.data.url.filename;
										break;
									case 'business_license_url': //1
										_self.business_license_url = data.data.url.filename;
										break;
									case 'card_front': //1
										_self.card_front = data.data.url.filename;
										_self.id_card_image[0] = data.data.url.filename;
										break;
									case 'card_back': //1
										_self.card_back = data.data.url.filename;
										_self.id_card_image[1] = data.data.url.filename;
										break;
									case 'bank_card_image': //1
										_self.bank_card_image = data.data.url.filename;
										break;
									case 'company_reception_image': //1
										_self.company_reception_image = data.data.url.filename;
										break;
									case 'company_indoor_image': //3
										_self.resources.push(data.data.url.filename);
										_self.bloblist.push({
											imgfile,
											filename: data.data.url.filename
										});
										break;
								}
							}
						},
						fail(err) {
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title: '图片上传失败',
								icon: 'none',
							});
						}
					})
				} catch (e) {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none',
					});
					console.log(e)
				}
			},
			resetFn() { //重新提交
				this.disabled = false;
				this.form = {
					contact: "",
					merchant_name: "",
					mobile_phone: "",
					address: "",
					yield_rate:''
				}
			},
			// 图片和内容上传
			async clickEnter() {
				if(Object.values(this.form).some(i => i === '')){
					uni.$tools.toast('请完善信息')
					return
				}
				uni.showLoading({
					title:'提交中'
				})
				let data = {
					...this.form,
					business_license_url: this.business_license_url,
					id_card_image_a: this.id_card_image[0],
					id_card_image_b: this.id_card_image[1],
					company_reception_image: this.company_reception_image
				}
				myApi.fssettlement(data).then(res => {
					uni.hideLoading();
					uni.$tools.toast(res.msg)
					this.GetInfo();
				}).catch(e => {
					console.log(e)
					uni.$tools.toast(e.msg)
				})
			},
			Delete(e) {
				let filename = null;
				let fileIndex = null;
				this.bloblist.map((item, index) => {
					if (e.tempFilePath == item.imgfile) {
						filename = item.filename;
						fileIndex = index;
					}
				})
				let index = this.resources.indexOf(filename);
				this.resources.splice(index, 1);
				this.bloblist.splice(fileIndex, 1);
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser", res.data)
					setTimeout(() => {
						uni.navigateBack();
					}, 2000)
				})
			},
		}
	}
</script>

<style lang="less">
	.apply-agent {
		min-height: 100vh;

		.code {
			border-color: #FF7142;
		}
	}
</style>
