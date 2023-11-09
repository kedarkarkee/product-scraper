import { GyapuProduct } from "../interfaces/gyapu_product";
import { HamrobazaarProduct } from "../interfaces/hamrobazaar_product";
import GyapuInstance, { Gyapu } from "../sources/gyapu";
import HamrobazaarInstance, { Hamrobazaar } from "../sources/hamrobazaar";

namespace HamrobazaarScraper {

    export const findProducts = async (keyword: string, limit = 10): Promise<HamrobazaarProduct[]> => {
        const { data } = await HamrobazaarInstance.post(Hamrobazaar.searchPath, {
            "filterParams": {
                "category": "",
                "brand": "",
                "condition": 1,
                "isPriceNegotiable": null,
                "priceFrom": 0,
                "priceTo": 0,
                "categoryIds": "",
                "brandIds": "",
                "advanceFilter": ""
            },
            "pageNumber": 1,
            "pageSize": 100,
            "searchParams": {
                "searchBy": "",
                "searchValue": keyword.toLowerCase(),
                "Latitude": 0,
                "Longitude": 0,
                "searchByDistance": 0
            },
            "sortParam": 0,
            "Latitude": 0,
            "Longitude": 0,
            "deviceId": "e5e7cc9ed2b3b76c",
            "deviceSource": "Android",
            "isHBSelect": false,
            "tempCategory": "",
            "tempSubCategory": "",
            "attributeFilter": [],
            "locationDescription": ""
        })
        const products = data.data;
        return products.map(p => {
            return {
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                imageUrl: p.imageUrl,
                source: 'hamrobazaar'
            }
        })

    }
}

export default HamrobazaarScraper;