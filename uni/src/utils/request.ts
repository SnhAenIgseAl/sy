import { BASE_URL } from '@/config/api.config'
import { useUserStore } from '@/stores'

const getUserStore = async () => {
    return await useUserStore()
}

interface RequestConfig {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	data?: any,
	params?: RequestParams[]
}

export const request = async (
	url: string,
	config: RequestConfig
) => {
	const userStore = await getUserStore()
	const [...params] = config.params ?? []

	let paramStr = ''
	params.forEach(param => {
		for (let key in param) {
			paramStr += `${key}=${param[key]}&`
		}
	})

	return new Promise<ResponseData>((resolve, reject) => {
		uni.request({
			url: BASE_URL + url + '?' + paramStr,
			method: config.method ?? 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + (userStore?.userToken ?? null)
			},
			data: config.data || null,
			success: (res) => {
				resolve(res.data as ResponseData<any>)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}