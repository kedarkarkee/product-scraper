import axios from "axios"

export const Gyapu = {
    url: 'https://www.gyapu.com/',
    searchPath: 'api/elastic/search'
}
const GyapuInstance = axios.create({
    baseURL: Gyapu.url
});

export default GyapuInstance;