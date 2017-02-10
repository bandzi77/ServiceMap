import { IPage } from '../pagination/page';

export interface IServiceTnt {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}

export interface IServiceFilter {
    postCode: string;
    cityName: string;
    currentPage?: number;
}

export interface IServiceTntResult {
    serviceTnt: IServiceTnt[];
    paging: IPage[];
}
