import { request } from "@/utils/request"

export const getHomeData = () => {
    return new Promise<any>((resolve, reject) => {
        request('/page-config', {
            method: 'GET',
            params: [
                { 'populate': '*' }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}