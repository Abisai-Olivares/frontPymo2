import { Hospital } from "./hospital";
import { Supply } from "./suppliesWarehouse";

export class AssignedSupplies {
    constructor(init?: Partial<AssignedSupplies>) {
        Object.assign(this, init);
    }
    id: string = '';
    count: number = 0;
    application_Date: Date = new Date();
    accepted: boolean = false;
    hospital: Hospital = new Hospital();
    suppliesWarehouse: Supply = new Supply();

}

export class AssignedSuppliesRequest {
    constructor(init?: Partial<AssignedSupplies>) {
        Object.assign(this, init);
    }
    id_hospital: string = '';
    request: Supply[] = [];
}