import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 获取版本号
	 */
	static getversion(data) {
		return tools.request(
			`/api/version`,
			'GET',
			data
		)
	}
	/**
	 * 系统配置
	 */
	static configAll(data) {
		return tools.request(
			`/api/config`,
			'GET'
		)
	}
	/**
	 * 用户信息 
	 */
	static memberInfo(data) {
		return tools.request(
			`/api/member/info`,
			'GET'
		)
	}
	/**
	 * 密码登录 
	 */
	static loginPw(data) {
		return tools.request(
			`/api/member/loginPw`,
			'POST',
			data
		)
	}
	/**
	 * 公粽号微信授权登录 
	 */
	static loginWx(data) {
		return tools.request(
			`/api/member/loginWx`,
			'POST',
			data
		)
	}
	/**
	 * 验证码登录 
	 */
	static loginSmsCode(data) {
		return tools.request(
			`/api/member/loginSmsCode`,
			'POST',
			data
		)
	}
	/**
	 * 修改用户信息
	 */
	static updateInfo(data) {
		return tools.request(
			`/api/member/updateInfo`,
			'POST',
			data
		)
	}
	/**
	 * 发送绑定手机号验证码
	 */
	static sendBindPhoneSms(data) {
		return tools.request(
			`/api/member/sendBindPhoneSms`,
			'POST',
			data
		)
	}
	/**
	 * 发送更新密码短信验证码
	 */
	static sendUpdatePasswordSms(data) {
		return tools.request(
			`/api/member/sendUpdatePasswordSms`,
			'POST',
			data
		)
	}
	/**
	 * 更新登陆密码
	 */
	static updatePassword(data) {
		return tools.request(
			`/api/member/updatePassword`,
			'POST',
			data
		)
	}
	/**
	 * 公告列表
	 */
	static notices(data) {
		return tools.request(
			`/api/notices`,
			'GET'
		)
	}
	/**
	 * 公告详情
	 */
	static noticesDetails(data) {
		console.log(data)
		return tools.request(
			`/api/notices/${data.id}`,
			'GET'
		)
	}
}