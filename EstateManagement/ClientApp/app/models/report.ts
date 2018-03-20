export class TypeRatioReport {
    constructor(
        public houses?: number,
        public flats?: number
    ) { };
}

export class PropertyPerCityRatioReport {
    constructor(
        public city: string,
        public amount: number
    ) { };
}
    