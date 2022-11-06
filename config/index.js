let config;
config = {
	development: {
		api: 'https://ht.api.shop.shengshihongda.com',
		admin:'http://ht.admin.shop.shengshihongda.com',//测试服后台地址
		href:'http://ht.web.shop.shengshihongda.com',//支付回调域名
		// api: 'https://api.shop.shengshihongda.com',
		// admin:'https://shop.shengshihongda.com',//测试服后台地址
		// href:'https://web.shop.shengshihongda.com',//支付回调域名
	},
	production: {
		// api: 'https://ht.api.shop.shengshihongda.com',
		// admin:'http://ht.shop.shengshihongda.com',//测试服后台地址
		// href:'http://ht.web.shop.shengshihongda.com',//支付回调域名
		 api: 'https://api.shop.shengshihongda.com',
		 admin:'https://shop.admin.shengshihongda.com',//测试服后台地址
		 href:'https://web.shop.shengshihongda.com',//支付回调域名
	},
}
 
console.log(process.env.NODE_ENV)
export default {
	ENV: process.env.NODE_ENV,
	...config[process.env.NODE_ENV]
};





