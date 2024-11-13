export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}

export interface ProductParams {
    orderBy: string;
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    types?: string[];
    brands?: string[];
}