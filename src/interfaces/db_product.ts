export interface DbProduct {
    product_id: number;
    name: string;
    category: string;
    brand: string;
    sale_price: number;
    market_price: number;
    seller: string;
    rating: number;
    reviews: number;
    description: string;
    product_url: string;
    image_url: string;
}