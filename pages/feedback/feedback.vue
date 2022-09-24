<template>
	<view class="Release-page bgffff">
		<com-head :titleshow="true" title="用户反馈" :backshow="true" :isRefresh='true'>
			<text slot="right" class="position-absolute right-0 fs-24 mr-2" style="top: 12px;"
				@click="feedback">反馈记录</text>
		</com-head>
		<view class="Release-main p-2 border-top">
			<textarea class="w-100 py-2 px-2 boxsizing" v-model="content" placeholder-style="color:#a0a0a0"
				placeholder="请输入反馈内容～" maxlength="200" />
			<view class="fta0a0 fs-24 text-right">{{content.trim().length}}/200</view>
			<view class="upload mt-3">
				<uni-file-picker v-model="imageValue" fileMediatype="image" return-type="array" mode="grid"
					@select="select" @delete="Delete" :auto-upload="false" limit="5" v-if="DestroyIncomeStatistics" />
				<view class=" py-2 fs-24 fta0a0">
					最多上传五张图片
				</view>
			</view>
		</view>
		<view class="mx-2 fs-24 fta0a0 mt-5">注：我们将在15个工作日内对您的意见做出反馈，谢谢！！</view>
		<view class="position-fixed left-0 w-100 px-2 sizing mb-2" style="bottom: 10vh;">
			<view class="fabu btnBg ftffff align-center text-center py-2 fs-24 " @click="addFeedbackFn">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	import myApi from '@/api/myApi.js'
	import config from "@/config/index.js";
	import comHead from "@/components/header/index.vue";
	const baseUrl = config.api + '/api/community/upload';
	export default {
		components: {
			comHead
		},
		data() {
			return {
				imageValue: [],
				content: "",
				resources: [],
				bloblist: [],
				title: "",
				DestroyIncomeStatistics: true,
			}
		},
		methods: {
			addFeedbackFn() {
				if (!this.content) {
					uni.$tools.toast('请输入反馈内容')
					return
				};
				if (!this.resources.length) {
					uni.$tools.toast('请选择图片')
					return
				};
				let data = {
					remark: this.content,
					case_img: this.resources.join(',')
				}
				myApi.addFeedback(data).then(res => {
					uni.showToast({
						title: "提交成功，请稍等客服联系",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}).catch(e => {
					uni.$tools.toast(e.msg)
				})
			},
			//上传图片
			imgupload(imgfile) {
				uni.showLoading({
					title: '图片上传中',
					mask: true
				});
				let _self = this;
				try {
					uni.uploadFile({
						url: baseUrl,
						filePath: imgfile,
						name: "file",
						fileType: 'image',
						success: function(res) {
							uni.hideLoading();
							let data = JSON.parse(res.data);
							if (res.statusCode == 200) {
								uni.showToast({
									title: res.msg,
									duration: 1500
								});
								_self.resources.push(data.data.url.filename);
								_self.bloblist.push(imgfile);
							}
						},
						fail(err) {
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title: '图片上传失败',
								duration: 1500
							});
						}
					})
				} catch (e) {
					console.log(e)
				}
			},
			//图片删除
			deleteImg(index) {
				let filename = this.resources[index];
				myApi.deleteResource({filename}).then(res => {
					this.resources.splice(index, 1);
					this.bloblist.splice(index, 1);
				}).catch(e => {
					uni.$tools.toast(e.msg)
				})
			},
			select(e) {
				//当选择多张一起上传
				if (e.tempFilePaths.length > 1) {
					e.tempFiles.map((item, index) => {
						this.imgupload(e.tempFilePaths[index]);
					})
					return;
				}
				//单张上传
				let blob = e.tempFiles[0].uuid;
				this.imgupload(e.tempFilePaths[0], blob);
			},
			Delete(e) {
				let index = this.bloblist.indexOf(e.tempFilePath);
				this.deleteImg(index);
			},
			feedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedbacklist'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Release-page {
		height: 100%;

		.fabu {
			border-radius: 36rpx;
			margin: 0 auto;
		}

		.Release-main {
			.input-round {
				border-radius: 22rpx;
			}

			.upload {
				.upload-default {
					width: 234rpx;
					height: 234rpx;
					border: 1px dashed #999;
					border-radius: 10rpx;

					image {
						width: 88rpx;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

			}
		}

	}
</style>
