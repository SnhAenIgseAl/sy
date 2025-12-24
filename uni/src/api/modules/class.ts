import { request } from "@/utils/request"

export const getClassTitle = () => {
    return new Promise<any>((resolve, reject) => {
        request(`/class-titles`, {
            method: 'GET',
        }).then(res => {
            resolve(res)
        })
    })
}

export const getClassL1 = (
    title: string
) => {
    return new Promise<any>((resolve, reject) => {
        request(`/class-titles`, {
            method: 'GET',
            params: [
                { 'populate': 'class_l1.img' },
                { 'populate': 'class_l1.details' },
                { 'filters[title]': title },
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const getClassL2 = (
    id: string
) => {
    return new Promise<any>((resolve, reject) => {
        request(`/class-l1s/${id}`, {
            method: 'GET',
            params: [
                { 'populate': 'class_l2.img' },
                { 'populate': 'class_l2.details' }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const getClassL3 = (
    id: string
) => {
    return new Promise<any>((resolve, reject) => {
        request(`/class-l2s/${id}`, {
            method: 'GET',
            params: [
                { 'populate': 'class_l3.img' },
                { 'populate': 'class_l3.details' }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}

export const getDesc = (id: string) => {
    return new Promise<any>((resolve, reject) => {
        request(`/details/${id}`, {
            method: 'GET',
            params: [
                { 'populate': 'desc_video' },
                { 'populate': 'desc_imgs' }
            ]
        }).then(res => {
            resolve(res)
        })
    })
}