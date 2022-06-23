import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co",
    timeout: 3000
});

export default axiosInstance;