import {serverUrl} from "../constant.js";
export default class superRequest{
	static get(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: serverUrl+url,
				data: {
					qq: "2121140461",
					...data
				},
				header: {
					'content-type':'application/x-www-form-urlencoded'
				},
				method:"GET",
				success: (res) => {
					let resData = res.data;
					// 获取真实数据之前，务必判断状态是否为200
					if (resData && resData.status == 200) {
						resolve(resData.data);
					} else {
						reject(res);
					}
				},
				fail:(err) => {
					reject(err);
				}
			});
		})
	}
	static post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: serverUrl+url,
				data: {
					qq: "2121140461",
					...data
				},
				header: {
					'content-type':'application/x-www-form-urlencoded'
				},
				method:"POST",
				success: (res) => {
					let resData = res.data;
					// 获取真实数据之前，务必判断状态是否为200
					if (resData && resData.status == 200) {
						resolve(resData.data);
					} else {
						reject(res);
					}
				},
				fail:(err) => {
					reject(err);
				}
			});
		})
	}
}