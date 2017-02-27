import { IPage } from '../pagination/page';

//export interface IServiceTnt {
//    productId: number;
//    productName: string;
//    productCode: string;
//    releaseDate: string;
//    price: number;
//    description: string;
//    starRating: number;
//    imageUrl: string;
//}

export interface IServiceTnt {
    depot_code_1a: string;
    town: string;
    from_postcode: string;
    to_postcode: string;
    sobota: boolean;
    ex9: boolean;
    ex10: boolean;
    ex12: boolean;
    priority: string;
    wieczorne_dostarczenie: boolean;
    standard_selivery_od: string;
    standard_delivery_do: string;
    pick_up_domestic_zgl: string;
    date_time_pick_up_eksport_sm_zgl: string
    samochod_z_winda_dostepny_w_standardzie?: boolean;
    diplomat_next_day: string;
    serwis_podmiejski?: boolean;
    pick_up_domestic_czas: string;
    pick_up_eksport_sm_czas: string;
    serwis_miejski?: boolean;
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
