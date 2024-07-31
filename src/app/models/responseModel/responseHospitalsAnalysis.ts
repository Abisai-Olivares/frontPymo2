export class ResponseHospitalsAnalysis {
    constructor(init?: Partial<ResponseHospitalsAnalysis>) {
        Object.assign(this, init);
    }

    name_hospital: string = '';
    cases: number = 0;
    percentage_deliveries: number = 0;
}