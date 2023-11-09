import axios from 'axios';

export const Daraz = {
    url: 'https://www.daraz.com.np/',
    catalogPath: 'catalog',
}

const DarazInstance = axios.create({
    baseURL: Daraz.url,
});

export default DarazInstance;