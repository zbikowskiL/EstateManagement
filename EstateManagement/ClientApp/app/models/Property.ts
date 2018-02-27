export class Property {
    constructor();

    constructor(
        public Id?: number,
        public Type?: number,
        public Description?: string,
        public Rooms?: number,
        public Area?: number,
        public Washer?: boolean,
        public Refrigerator?: boolean,
        public Iron?: boolean,
        //s
        public adressId?: number,
        public ownerId?: number
    ) { };
}