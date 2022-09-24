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
	 * 修改用户信息
	 */
	static updateInfo(data) {
		return tools.request(
			`/api/member/updateInfo`,
			'POST',
			data
		)
	}
}