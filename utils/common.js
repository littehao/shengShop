//日期格式函数
export function dateFormat(str, typeVal) {
	let oDate = new Date(str);
	let oYear = oDate.getFullYear();
	let oMonth = oDate.getMonth() + 1;
	let oDay = oDate.getDate();
	let oHour = oDate.getHours();
	let oMin = oDate.getMinutes();
	let oSen = oDate.getSeconds();
	if (typeVal == 1) {//月-日
		return getzf(oMonth) + "-" + getzf(oDay);
	}
	if (typeVal == 2) {//时-分
		return getzf(oHour) + ":" + getzf(oMin);
	}
	return oYear + "-" + getzf(oMonth) + "-" + getzf(oDay) + " " + getzf(oHour) + ":" + getzf(oMin) + ":" + getzf(oSen);
};

//时间差
export function getTimeDifference(date2, type) {
	// console.log(date2);
	let date1 = new Date(); //开始时间
	let date3 = null;
	if (type) {
		date3 = date1.getTime() - date2; // 
	} else {
		date3 = date2 - date1.getTime(); //时间差的毫秒数
	}
	// console.log(date3);
	//计算出小时数 
	let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数 
	let hours = Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数 
	let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数 
	let minutes = Math.floor(leave2 / (60 * 1000));
	//计算相差秒数 
	let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数 
	let seconds = Math.round(leave3 / 1000);
	let Date_data = {
		hour: hours,
		minute: minutes,
		second: seconds,
	};
	return Date_data;
	// return " 相差 " + hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
};

//获取节点信息
export function getdomInfo(node, that) {
	return new Promise((resolve, reject) => {
		try {
			// console.log(node,that);
			const query = uni.createSelectorQuery().in(that);
			that.$nextTick(function() {
				query.select(node).boundingClientRect(data => {
					resolve(data);
				}).exec();
			});
		} catch (e) {
			reject(e);
		}
	});
};

export function copyTxt(txt) { //传入要复制的内容
	txt += "";
	if (txt == "null" || txt == "undefined" || txt == "") {
		//toast("复制失败，内容为空");
		return;
	}
	// #ifdef APP-PLUS
	uni.setClipboardData({
		data: txt,
	});
	// #endif

	// #ifdef H5
	if (document.queryCommandSupported('copy')) {
		let textarea = document.createElement("textarea")
		textarea.value = txt
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select() // 选中文本内容
		textarea.setSelectionRange(0, txt.length)
		let result = document.execCommand("copy")
		textarea.remove()
		uni.showToast({
			title: "复制成功",
			icon: "none",
		})
	} else {
		uni.showToast({
			title: "您的浏览器不支持复制",
			icon: "none"
		})
	}

	// #endif  
};
// 清空剪切板
export function clearCopyTxt() {
	let txt = "";
	// #ifdef APP-PLUS
	uni.setClipboardData({
		data: txt,
	});
	uni.hideToast();
	// #endif

	// #ifdef H5
	if (document.queryCommandSupported('copy')) {
		let textarea = document.createElement("textarea")
		textarea.value = txt
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select() // 选中文本内容
		textarea.setSelectionRange(0, txt.length)
		let result = document.execCommand("copy")
		textarea.remove()
	} else {
		uni.showToast({
			title: "您的浏览器不支持读取剪切板",
			icon: "none"
		})
	}

	// #endif  
};


//关闭浏览器窗口
export function closeWindow(){
		// #ifdef APP-PLUS
			if (plus.os.name.toLowerCase() === 'android') {
				plus.runtime.quit();
			} else {
				const threadClass = plus.ios.importClass("NSThread");
				const mainThread = plus.ios.invoke(threadClass, "mainThread");
				plus.ios.invoke(mainThread, "exit");
				// ios11
				plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
			}
		// #endif
		
		// #ifdef H5
		setTimeout(() => {
			let browser = navigator.userAgent.toLowerCase();
			if (browser.match(/Alipay/i) == "alipay") {
				console.log("支付宝app的浏览器");
				//这个可以关闭安卓系统的手机
				document.addEventListener("AlipayJSBridgeReady", function() {
						AlipayJSBridge.call("closeWindow");
					},
					false
				);
				//这个可以关闭ios系统的手机
				AlipayJSBridge.call('closeWebview'); //支付宝
			} else if (browser.match(/MicroMessenger/i) == "micromessenger") {
				//这个可以关闭安卓系统的手机
				document.addEventListener("WeixinJSBridgeReady", function() {
						WeixinJSBridge.call("closeWindow");
					},
					false
				);
				//这个可以关闭ios系统的手机
				WeixinJSBridge.call("closeWindow");
			} else {
				console.log("其它浏览器");
				window.opener = null; //如果没有这行和下面的一行则会出现上面的第二个询问框。
				window.open(' ', '_self', ' ');
				window.close()
			}
		}, 2000)
		// #endif
}
//方法：用来判断是否是微信内置的浏览器
export function isWechat(){
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

//获取地址参数
export function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
		[, ''
		])[1]
		.replace(/\+/g, '%20')) || null
}

//请求微信接口，用来获取code
export function	getWeChatCode() {
	let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址 
	let appid = 'wxb924a6eb3d899dd8'

	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href =
		"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
		appid +
		"&redirect_uri=" +
		local +
		"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}

//请求支付宝接口，用来获取code
export function getAlipayCode() {
	let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址 
	let appid = '2021003143604059'
	//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
	window.location.href =
		"https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" +
		appid +
		"&scope=auth_userinfo&redirect_uri=" +
		local;
}

//获取图片信息
export function getImageInfo(src) {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: src,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
};