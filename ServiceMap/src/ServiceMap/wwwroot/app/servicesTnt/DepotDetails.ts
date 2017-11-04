export interface IDepotDetails {
        depotCode: string;
        addressesTown: string;
        addressesPostcode: string;
        addressesStreet: string;
        internationalPackageHoursInfo: string;
        domesticPackageHoursInfo: string;
        saturdayPackageHoursInfo: string;
        passportPickupHoursInfo: string;
        weekPackageHoursInfo: string;
}

export interface IDepotDetailsResult {
    depotDetails: IDepotDetails[];
}

export interface IDepotDetailsFilter {
    depotCode: string;
}