import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

export const goTo = (url: string) => {
	uni.navigateTo({
		url: url
	})
}

/**
 * 日期格式化
 */
export const formatDate = (date: Date) => {
	// return new Date(date).toLocaleString('zh-CN', {
	// 	hour12: false
	// })
	
	const d = new Date(date);
  
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hour = String(d.getHours()).padStart(2, '0');
	const minute = String(d.getMinutes()).padStart(2, '0');
	const second = String(d.getSeconds()).padStart(2, '0');
	
	return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

/**
 * 生成随机五位字符串，前三位为大写字母，后两位为数字
 * @returns 生成的五位字符串
 */
export const generateRandomString = () => {
	// 生成前三位大写字母
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let letterPart = '';
	for (let i = 0; i < 3; i++) {
		const randomIndex = Math.floor(Math.random() * letters.length);
		letterPart += letters[randomIndex];
	}

	// 生成后两位数字
	let numberPart = '';
	for (let i = 0; i < 2; i++) {
		numberPart += Math.floor(Math.random() * 10).toString();
	}

	return letterPart + numberPart;
}

/**
 * 计算两个经纬度之间的距离
 * @param lat1 纬度1
 * @param lng1 经度1
 * @param lat2 纬度2
 * @param lng2 经度2
 */
export const getDistance = (
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number,
	toFixed: number = 0
) => {
	const FINAL = 6378137.0
	const flat = calcDegree(lat1)
	const flng = calcDegree(lng1)
	const tlat = calcDegree(lat2)
	const tlng = calcDegree(lng2)

	let result = Math.sin(flat) * Math.sin(tlat)
	result += Math.cos(flat) * Math.cos(tlat) * Math.cos(flng - tlng)
	return (Math.acos(result) * FINAL).toFixed(toFixed);
}


/** 
 * 求某个经纬度的值的角度值 
 * @param {Object} d 
 */
export const calcDegree = (d: number) => {
	return d * Math.PI / 180.0;
}

interface Coordinate {
	latitude: number,
	longitude: number
}
export const createCoordinate = (
	start: Coordinate,
	end: Coordinate,
	stride: number
) => {
	const latAverage = Math.abs(end.latitude - start.latitude) / (stride + 1)
	const lngAverage = Math.abs(end.longitude - start.longitude) / (stride + 1)

	let res: Coordinate[] = []

	for (let i = 0; i < stride; i++) {
		res.push({
			latitude: (start.latitude + latAverage * i),
			longitude: start.longitude + lngAverage * i
		})
	}

	return res
}

export const useShare = () => {  
    onShareAppMessage((res) => {  
        console.log(res);  
		return {
			title: '测试分享标题'
		}  
	})
	
	onShareTimeline(() => {
		return {
			title: '测试分享朋友圈标题'
		}
	})

	return {
		onShareAppMessage,
		onShareTimeline
	}
}

export const callPhone = (phone: string) => {
	uni.makePhoneCall({
		phoneNumber: phone
	})
}