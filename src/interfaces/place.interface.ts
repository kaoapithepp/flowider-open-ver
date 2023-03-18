export interface IPlaceCreateEntity {
    place_name?: string,
    lat_geo?: any,
    long_geo?: any,
    description?: string,
    place_category?: string,
    unit_price?: number,
    open_hr?: string,
    close_hr?: string,

    isQuiet?: boolean,
    isSmokable?: boolean,
    isAtmospheric?: boolean,
    isLoudable?: boolean,


    hasPowerSupply?: boolean,
    hasWifi?: boolean,
    hasRestroom?: boolean,
    hasProjector?: boolean,
    hasHDMI?: boolean,
    hasFlowiderCare?: boolean,
    hasAirCondition?: boolean,
    hasNapZone?: boolean,
    hasSnackAndBeverage?: boolean,
    hasCCTVorSecurity?: boolean
}