import axios,{AxiosInstance} from 'axios';
// AxiosInstance => axios 객체생성
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient;