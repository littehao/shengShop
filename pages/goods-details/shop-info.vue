<template>
	<view class="apply-agent bgf4f4">
		<com-head  :titleshow="true" color="#333" :backshow="true" bgcolor="#fff"  :title="title"></com-head>
		
		<view  class="rounded-lg bg-white  px-2 mx-3 mt-3 mb-2 py-5">
				<view class="">
					<text class="fs-32  Color333 flex mb-2" style="width: 150rpx;">店铺简介:</text>
					<textarea class="Color333 fs-28 boxsizing border p-2" style="height: 200rpx;width: 100%;" v-model="merchant_introduction" placeholder-style="color:#a0a0a0" placeholder="产品介绍" maxlength="200" :disabled="disabled"/>
				</view>
				<view class="upload mt-3" v-if="merchantsimageurl.length > 0">
					<text class="fs-32  Color333 flex mb-2">店铺资质:</text>
					<view  class="bgffff flex align-center border" style="width: 200px;minHeight: 120px;">
						<uni-file-picker v-model="merchantsimageurl" fileMediatype="image" return-type="array" :image-styles="imagesStyle" mode="grid" :auto-upload="false" limit="1" :readonly="disabled">
							<view  class="flex flex-column justify-center text-center">
								<!-- <text class="iconfont icon-tianjia fs-60 ft9999"></text> -->
							</view>
						</uni-file-picker>
					</view>
				</view>
				<view class="upload mt-3" v-if="businesslicenseurl.length > 0">
					<text class="fs-32  Color333 flex mb-2">营业执照:</text>
					<view  class="bgffff flex align-center border" style="width: 200px;minHeight: 120px;">
						<uni-file-picker v-model="businesslicenseurl" fileMediatype="image" return-type="array" :image-styles="imagesStyle" mode="grid" :auto-upload="false" limit="1" :readonly="disabled">
							<view  class="flex flex-column justify-center text-center">
								<!-- <text class="iconfont icon-tianjia fs-60 ft9999"></text> -->
							</view>
						</uni-file-picker>
					</view>
				</view>
				<view class="upload mt-3" v-if="companyreceptionimage.length > 0" >
					<text class="fs-32  Color333 flex mb-2">公司前台照片:</text>
					<view class="bgffff flex align-center border" style="width: 200px;minHeight: 120px;">
						<uni-file-picker v-model="companyreceptionimage" fileMediatype="image" return-type="array":image-styles="imagesStyle" mode="grid" :auto-upload="false" limit="1" :readonly="disabled">
							<view  class="flex flex-column justify-center text-center">
								<!-- <text class="iconfont icon-tianjia fs-60 ft9999"></text> -->
							</view>
						</uni-file-picker>
					</view>
				</view>
		</view>
		<view style="height: 50px;" ></view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import {mapActions,mapGetters} from "vuex";
	import config from "@/config/index.js";
	import comHead from '@/components/header/index.vue'
	import nullData from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	const baseUrl = config.api + '/api/community/upload';
	export default {
		components:{comHead,nullData,loading},
		data() {
			return {
				businesslicenseurl:[],
				companyreceptionimage:[],
				imageValue:[],
				disabled:true,
				imagesStyle:{
					"height": 100,    // 边框高度
					"width": 200,    // 边框宽度
					"border":false, // 是否显示边框
				},
				title:"",
				merchant_introduction:"",
				merchantsimageurl:[],
			};
		},
		onLoad(query){
			this.GetmerchantDetail(query.id);
		},
		computed:{
			...mapGetters(['getUser']),
		},
		methods:{
			GetmerchantDetail(id){
				goodsApi.merchantDetail({merchant_id:id}).then(res => {
					let merchant = res.data;
					this.title = merchant.merchant_name;
					if(merchant?.qualifications?.length > 0){
						this.merchantsimageurl = this.lookImage(merchant.qualifications);
					}
					if(merchant.business_license_url){
						let arr1 = [];
						arr1.push(merchant.business_license_url);
						this.businesslicenseurl = this.lookImage(arr1);
					}
					if(merchant.company_reception_image){
						let arr2 = [];
						arr2.push(merchant.company_reception_image);
						this.companyreceptionimage = this.lookImage(arr2);
					}
					this.merchant_introduction = merchant.merchant_introduction;
				}).catch(e => {
					this.$refs.loading.hide();
				})
			},
			lookImage(imgArr){
				let arr = [];
				imgArr.forEach((item,index) =>{
				    let obj = {
					        "name": `img${index}.png` || `img${index}.jpg`,
					        "extname": "png"||"jpg",
					        "url": item
					}
					arr.push(obj);
				});
				return arr;
			}
		}
	}
</script>

<style lang="less">
.apply-agent{
	min-height: 100vh;
	.code{
		border-color: #FF7142;
	}
}
</style>
