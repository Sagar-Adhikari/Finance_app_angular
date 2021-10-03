export class PaginationView<T> {
    constructor(
        public total: number,
        public page: number,  
        public contents: T[],
    ) {}
}