import { GyapuProduct } from "../interfaces/gyapu_product";
import GyapuInstance, { Gyapu } from "../sources/gyapu";

namespace GyapuScraper {

    export const findProducts = async (keyword: string, limit = 10): Promise<GyapuProduct[]> => {
        const { data } = await GyapuInstance.get(Gyapu.searchPath, {
            params: {
                'q': keyword,
                'size': limit,
                'page': 1
            }
        })
        const products = data.data.products;
        return products.map(p => {
            return {
                name: p.name,
                description: p.meta_description,
                price: p.min_sales_price,
                imageUrl: Gyapu.url + p.image[0].document.path.replaceAll(' ', '%20'),
                rating: p.average_rating,
                source: 'gyapu'
            }
        })

    }
}

export default GyapuScraper;