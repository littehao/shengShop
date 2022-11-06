<script>
	import baseApi from '@/api/baseApi.js'
	import {
		mapGetters
	} from "vuex";
	import APPUpdate from "./js_sdk/zhouWei-APPUpdate/APPUpdate/index.js";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.removeStorageSync('isagree');
		},
		onShow: function() {
			console.log('App Show')
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res)
					this.$store.commit("setPlatform", res.platform)
					this.$store.commit("setStatusBarHeight", res.statusBarHeight)
					this.$store.commit("setwindowHeight", res.windowHeight)
					// #ifdef APP-PLUS
					this.$store.commit("setBottom", res.safeAreaInsets.bottom)
					//#endif
					//#ifdef H5
					let u = navigator.userAgent;
					let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
					let bottom = 0;
					if (isiOS) {
						// iPhone X、iPhone XS
						var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window
							.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width ===
							375 && window.screen.height === 812;
						// iPhone XS Max
						var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window
							.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width ===
							414 && window.screen.height === 896;
						// iPhone XR
						var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window
							.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width ===
							414 && window.screen.height === 896;
						var isIPhone12 = (window.screen.height >= 812 && window.screen.width >= 375) ||
							(window.screen.height >= 896 && window.screen.width >= 414)
						if (isIPhoneX || isIPhoneXSMax || isIPhoneXR || isIPhone12) {
							bottom = 10;
						}
					}
					this.$store.commit("setBottom", bottom)
					//#endif
				},
			})
			let user = uni.getStorageSync("user");
			let token = uni.getStorageSync("token");
			if (token) {
				this.$store.commit("setToken", token);
				this.$store.commit("setUser", user);
				this.GetInfo();
			} else {
				uni.removeStorageSync('address');
			}
			let config = uni.getStorageSync("config");
			if (config) this.$store.commit("setconfig", JSON.parse(config))
			// 开发环境 版本更新
			// #ifdef APP-PLUS
			if (process.env.NODE_ENV != "development") {
				APPUpdate();
			}
			// APPUpdate();
			let _this = this;
			plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
				console.log(wgtinfo.version)
				_this.$store.commit("setVersion", wgtinfo.version);
			});
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser", res.data)
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/uni.css");
	@import url("./static/font/iconfont.css");
	@import url("/common/free.css");
	@import url("/common/common.css");
</style>
