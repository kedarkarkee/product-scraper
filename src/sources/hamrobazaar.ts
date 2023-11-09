import axios from 'axios';

export const Hamrobazaar = {
    url: 'https://api.hamrobazaar.com/',
    searchPath: 'api/Search/Products',
}

const HamrobazaarInstance = axios.create({
    baseURL: Hamrobazaar.url,
    headers: {
        apikey: '09BECB8F84BCB7A1796AB12B98C1FB9E'
    }
});

export default HamrobazaarInstance;