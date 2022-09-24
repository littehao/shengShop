/**
 * 常用方法封装 请求，文件上传等
 * @author echo. 
 **/
import config from "@/config/index.js"
import store from '@/store/index.js';
const tools = {
	//上传接口地址
	interfaceUrl: function() {
		return config.api
	},
	toast: function(text, duration, success) {
		uni.showToast({
			// #ifndef MP-ALIPAY
			duration: duration || 2000,
			// #endif
			title: text || "出错啦~",
			icon: success ? 'success' : 'none'
		})
	},
	navToLogin:function(){
		// #ifdef APP-PLUS
		tools.href("/pages/login/login-pwd")
		// #endif
		//#ifdef H5
		tools.href("/pages/login/login")
		// #endif
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, "").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	loadding: false,
	showLoading: function(title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || '请稍候...'
		})
	},
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool showLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: async function(url, method, postData, showLoading) {
		//接口请求
		tools.loadding && uni.hideLoading();
		tools.loadding = false;
		if (showLoading) {
			tools.loadding = true
			tools.showLoading()
		}
		const headers = {
			'Content-Type': 'application/json',
			'Accept-Language':'zh-CN'
		}
		if (tools.getToken()) {
			Object.assign(headers, {
				'Authorization': 'Bearer ' + tools.getToken()
			});
		}
		if(!url.includes('http://')){
			url = tools.interfaceUrl() + url
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: postData,
				header: headers,
				method: method || "POST", //'GET','POST'
				// dataType: 'json',
				success: (res) => {
					// console.log(res)
					clearTimeout(tools.delayed)
					tools.delayed = null;
					if (tools.loadding && showLoading) {
						uni.hideLoading()
					}
					if(res.data.code == 200 && res.data.data){
						resolve(res.data)
					}else if(res.data.code == 401){ // token过期或被串改
						uni.removeStorageSync('token')
						uni.removeStorageSync('user')
						tools.navToLogin()
					} else {
						reject(res.data)
						res.data.code != 200 && tools.toast(res.data.msg)
					}
				},
				fail: (res) => {
					console.log(res)
					clearTimeout(tools.delayed)
					tools.delayed = null;
					tools.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src,formData) {
		tools.showLoading()
		return new Promise((resolve, reject) => {
			console.log(url)
			if(!url.includes('http://')){
				url = tools.interfaceUrl() + url
			}
			const uploadTask = uni.uploadFile({
				url: url,
				filePath: src,
				name: 'upfile',
				header: {
					'Authorization': 'Bearer ' + tools.getToken()
				},
				formData:formData,
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						tools.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					tools.toast(res.msg);
				}
			})
		})
	},
	//设置用户信息
	setUserInfo: function(mobile, token) {
		//uni.setStorageSync("thorui_token", token)
		uni.setStorageSync("mobile", mobile)
	},
	//获取token
	getToken() {
		let token = uni.getStorageSync("token")
		return token?token:null
	},
	//获取当前用户信息
	getUser() {
		const user = uni.getStorageSync("user")
		if(user){
			return JSON.parse(user)
		}
		return null
	},
	// 设置缓存值
	setStorage(key,data){
		uni.setStorageSync(key,JSON.stringify(data))
	},
	// 获取缓存值
	getStorage(key){
		let data = uni.getStorageSync(key)
		if(data){
			return JSON.parse(data)
		} else {
			return null
		}
	},
	//判断是否登录
	isLogin: function() {
		if(uni.getStorageSync("token") && uni.getStorageSync("user")){
			return true
		}
		return false
	},
	//跳转页面，校验登录状态
	href(url, isVerify) {
		if (isVerify && !tools.isLogin()) {
			tools.navToLogin()
		} else {
			uni.navigateTo({
				url: url
			});
		}
	}
}

export default tools
