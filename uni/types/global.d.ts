import ''

/**
 * 响应数据结构
 */
declare global {
    interface ResponseData<T = any> {
        code: number;
        data: T;
        message: string;
    }
}


export {};