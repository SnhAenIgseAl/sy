import { defineStore } from 'pinia'
import { ref } from 'vue'
import { wxLogin, getUserInfo } from '@/api/index'



export const useUserStore = defineStore('user', () => {

	// 用户信息状态
	const userState = ref<User | null>(null)

	// 用户凭证
	const userToken = ref<string>('')

	// 用户刷新凭证
	// const reToken = ref<string>('')

	// 用户登录状态
	const isLogin = ref<boolean>(false)

	// 第一次登录
	const isFirstLogin = ref<boolean>(true)
	
	// 刷新用户 token
	// const refreshUserToken = async () => {
	// 	return new Promise<User>(async (resolve, reject) => {
	// 		refreshToken().then(res => {
	// 			userToken.value = res.jwt
	// 			reToken.value = res.refreshToken
	// 		})
	// 	})
	// }

	// 设置用户信息状态
	const setUserInfoAsync = async () => {
		return new Promise<User>(async (resolve, reject) => {
			if (userToken.value) {
				let res = await getUserInfo()
				if (res.error) {
					userState.value = null
					isLogin.value = false
				} else {
					userState.value = res
					isLogin.value = true
					resolve(userState.value as User)
				}
			}
		})
	}

	// 获取用户状态信息
	const getUserStateAsync = async () => {
		return new Promise<User>(async (resolve, reject) => {
			if (userToken.value) {
				let res = await getUserInfo()
				if (res.error) {
					userState.value = null
					isLogin.value = false
				} else {
					userState.value = res
					isLogin.value = true
					resolve(userState.value as User)
				}
			}
		})
	}

	const login = async () => {
		console.log('login');
		
		const code = await new Promise<string>((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					console.log(res.code);
					resolve(res.code)
				}
			})
		})

		wxLogin(code).then(async res => {
			if (res.user) {
				userToken.value = res.jwt
				await setUserInfoAsync()
			}
		})
	
		// const { openid } = await new Promise<any>((resolve, reject) => {
		// 	wxLogin(code).then(res => {
		// 		resolve(res)
		// 	})
		// })
		
		// await userRegister({
		// 	username: "游客" + openid,
		// 	email: "游客" + openid + '@example.com',
		// 	password: openid + 'User!',
		// })
	
		// await userLogin({
		// 	identifier: "游客" + openid + '@example.com',
		// 	password: openid + 'User!',
		// }).then(async res => {
		// 	if (res.user) {
		// 		userToken.value = res.jwt
		// 		await setUserInfoAsync()
		// 	}
		// })
	}

	// 登出
	const logout = async () => {
		userState.value = null
		userToken.value = ''
		// userAddress.value = null
		isLogin.value = false
	}

	return {
		userState,
		userToken,
		// reToken,
		isLogin,
		isFirstLogin,
		// defaultAvatar,
		// userAddress,
		// refreshUserToken,
		setUserInfoAsync,
		getUserStateAsync,
		login,
		logout
	}
}, {
	persist: true
})