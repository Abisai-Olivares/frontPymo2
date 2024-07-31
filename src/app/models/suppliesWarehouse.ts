export class Supply {
    constructor(init?: Partial<Supply>) {
        Object.assign(this, init);
    }
    id: string = '';
    name: string = '';
    count: number = 0;

}