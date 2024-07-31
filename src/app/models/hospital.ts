export class Hospital {
    constructor(init?: Partial<Hospital>) {
        Object.assign(this, init);
    }
    id: string = '';
    name: string = '';
    cases: number = 0;


}