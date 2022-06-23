import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 3000
});

export default axiosInstance;