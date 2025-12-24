import { useUserStore } from "@/stores"
import { request } from "@/utils/request"

const getUserStore = async () => {
    return useUserStore()
}

export const wxLogin = (
    code: string
) => {
    return new Promise<any>((resolve, reject) => {
        request('/strapi-plugin-wechat-miniprogram/login', {
            method: 'POST',
            data: {
                openidCode: code
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

// export const refreshToken = async () => {
// 	const userStore = await getUserStore()
//     return new Promise<any>((resolve, reject) => {
//         request('/auth/refresh', {
//             method: 'POST',
// 			data: {
// 				refreshToken: userStore.reToken
// 			}
//         }).then((res) => {
//             resolve(res)
//         })
//     })
// }

export const getUserInfo = () => {
    return new Promise<any>((resolve, reject) => {
        request('/users/me', {
            method: 'GET',
        }).then((res) => {
            resolve(res)
        })
    })
}

export const updateMe = (data) => {
    return new Promise<any>((resolve, reject) => {
        request('/auth/update', {
            method: 'POST',
            data: {
                data: {
                    ...data
                }
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const getMyLikeFavor = (id) => {
    return new Promise<any>((resolve, reject) => {
        request(`/auth/handle`, {
            method: 'POST',
            data: {
                id
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const like = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request('/detail/like', {
            method: 'POST',
            data: {
                id
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const dislike = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request('/detail/dislike', {
            method: 'POST',
            data: {
                id
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const favor = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request('/detail/favor', {
            method: 'POST',
            data: {
                id
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const disfavor = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request('/detail/disfavor', {
            method: 'POST',
            data: {
                id
            }
        }).then((res) => {
            resolve(res)
        })
    })
}

export const getFavorList = async () => {
    const userStore = await getUserStore()
    return new Promise<any>((resolve, reject) => {
        request(`/favorites`, {
            method: 'GET',
            params: [
                { 'populate': 'detail.desc_imgs' },
                { 'filters[user][documentId]': userStore.userState?.documentId }
            ]
        }).then((res) => {
            resolve(res)
        })
    })
}