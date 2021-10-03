export class ParticularModel {
    constructor(
        public particuID: number, 
        public particuName: String, 
        public relatedAccSN: number, 
        public accID: number,
        public drLock: boolean
    ) { }
}

export class NewParticularModel {
    constructor(
        public nameInDev: String, 
        public particuName: String, 
        public relatedAccSN: number, 
        public accID: number,
        public drLock: boolean
    ) { }
}