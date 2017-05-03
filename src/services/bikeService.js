import * as httpUtil from '../utils/httpUtil';

const API_BASE_URL = 'http://localhost:8848/api/bikes';

export function fetchBikes() {
 	return httpUtil.get(API_BASE_URL);
}

export function fetchBike(id) {
	return httpUtil.get(API_BASE_URL + '/' + id);
}

export function addBike(data) {
	return httpUtil.post(API_BASE_URL, data);
}

export function removeBike(id) {
	return httpUtil.remove(API_BASE_URL + '/' + id);
}

export function updateBike(id, data) {
	return httpUtil.put(API_BASE_URL + '/' + id, data);
}