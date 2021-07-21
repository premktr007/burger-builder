import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-88c1d-default-rtdb.firebaseio.com/'
});

export default axiosInstance;