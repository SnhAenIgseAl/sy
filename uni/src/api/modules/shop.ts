import { useUserStore } from "@/stores"
import { request } from "@/utils/request"

const getUserStore = async () => {
    return useUserStore()
}

export const getShopList = () => {
    return new Promise<any>((resolve, reject) => {
        request('/shop-classes', {
            method: 'GET',
            params: [
                { 'populate': 'shops.primary_img' }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const getShopDetail = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request(`/shops/${id}`, {
            method: 'GET',
            params: [
                { 'populate': '*' },
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const exchangeShop = (
    id: string,
    address: string,
    postscript: string
) => {
    return new Promise<any>((resolve, reject) => {
        request(`/shops/exchange`, {
            method: 'POST',
            data: {
                id,
                address,
                postscript
            }
        }).then(res => {
            resolve(res)
        })
    })
}

export const getExchangeList = async () => {
    const userStore = await getUserStore()
    return new Promise<any>((resolve, reject) => {
        request(`/exchanges`, {
            method: 'GET',
            params: [
                { 'populate': 'shop.primary_img' },
                { 'filters[user][documentId]': userStore.userState?.documentId }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const getFriendList = async () => {
    const userStore = await getUserStore()
    return new Promise<any>((resolve, reject) => {
        request(`/friends`, {
            method: 'GET',
            params: [
                // { 'populate': 'screenshoot' },
                { 'filters[user][documentId]': userStore.userState?.documentId }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

interface FriendData {
    friend_name: string,
    phone: string,
    desc: string,
    screenshoot: number[]
}

export const createFriend = async (
    data: FriendData
) => {
    const userStore = await getUserStore()
    return new Promise<any>((resolve, reject) => {
        request(`/friends`, {
            method: 'POST',
            data: {
                data: {
                    ...data,
                    user: userStore.userState?.documentId
                }
            }
        }).then(res => {
            resolve(res)
        })
    })
}