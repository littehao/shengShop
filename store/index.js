import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	islogin:false,
	token:"",
	user:null,
	statusBarHeight:0,//状态栏高度
	bottom:0,//底部安全距离 
	config:{},
	downApk:null,
	platform:"android",
	version:'1.0.0',
	windowHeight:null
}

const mutations = {
	setUser(state, user) {
		state.user = user;
		uni.setStorageSync("user", user);
	},
	setToken(state, token) {
		state.token = token;
		if (token) uni.setStorageSync("token", token);
	},
	setVersion(state, data){
		state.version = data;
	},
	setwindowHeight(state, data){
		state.windowHeight = data
	},
	setStatusBarHeight: (state, data) => { //状态栏高度
		state.statusBarHeight = data
	},
	setBottom: (state, data) => {
		state.bottom = data
	},
	setdownApk:(state, data)=>{
		state.downApk = data
	},
	setPlatform:(state, data)=>{
		state.platform = data
	},
	setconfig: (state, data) => {
		state.config = data
	},
}

const getters = {
	getToken: state => state.token,
	getUser: state => state.user,
	getstatusBarHeight: state => state.statusBarHeight,
	getConfig: (state) => state.config,
	getbottom: (state) => state.bottom,
	getdownApk: (state) => state.downApk,//apk地址
	getPlatform: (state) => state.platform,//平台
	getVersion: (state) => state.version,//版本号
	getwindowHeight: (state) => state.windowHeight
}

const store = new Vuex.Store({
	state,
	mutations,
	getters
})
export default store
