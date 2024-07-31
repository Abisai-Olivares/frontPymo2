
export class ResponseProductMostAssigned {
    constructor(init?: Partial<ResponseProductMostAssigned>) {
        Object.assign(this, init);
    }

    supplies_warehouse_id: number = 0;
    total_count: number = 0;
    product_name: string = '';
}