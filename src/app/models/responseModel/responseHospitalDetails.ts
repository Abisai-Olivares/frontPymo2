import { AssignedSupplies } from "../assignedSupplies";
import { DeliveryOfSupplies } from "../deliveryOfSupplies";

export class ResponseHospitalDetails {
    constructor(init?: Partial<ResponseHospitalDetails>) {
        Object.assign(this, init);

    }
    id_hospital: string = '';
    name_hospital: string = '';
    assigned: number = 0;
    delivered: number = 0;
    casesCovid: number = 0;
    historyAssignedSupples: AssignedSupplies[] = [];
    historyDeliveryOfSupplies: DeliveryOfSupplies[] = [];

}

