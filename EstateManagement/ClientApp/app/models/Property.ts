export class Property {
    constructor(
        public PropertyId: number,
        public Type: string,
        public Description: string,
        public Rooms: number,
        public Area: number,
        public Washer: boolean,
        public Refrigerator: boolean,
        public Iron: boolean
    ) { };
}