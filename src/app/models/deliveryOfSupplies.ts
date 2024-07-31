import { AssignedSupplies } from "./assignedSupplies";
import { Hospital } from "./hospital";
import { Supply } from "./suppliesWarehouse";

export class DeliveryOfSupplies {
    constructor(init?: Partial<DeliveryOfSupplies>) {
    }
    id: number = 0;
    count: number = 0;
    delivery_date: Date = new Date();
    hospital: Hospital = new Hospital();
    assignedSupplies: AssignedSupplies = new AssignedSupplies();
}
