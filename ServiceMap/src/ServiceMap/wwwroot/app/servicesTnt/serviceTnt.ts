import { IPage } from '../pagination/page';

export interface IServiceTnt {
    depotCode: string;
    town: string;
    fromPostcode: string;
    toPostcode: string;
    sobota: boolean;
    ex9: boolean;
    ex10: boolean;
    ex12: boolean;
    priority: string;
    wieczorneDostarczenie?: boolean;
    standardDeliveryOd: string;
    standardDeliveryDo: string;
    pickUpDomesticZgl: string;
    dateTimePickUpEksportSmZgl: string
    samochodZwindaDostepnyWstandardzie?: boolean;
    diplomatNextDay: string;
    serwisMiejski?: boolean;
    serwisPodmiejski?: boolean;
    pickUpDomesticCzas: string;
    pickUpEksportSmCzas: string;
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
