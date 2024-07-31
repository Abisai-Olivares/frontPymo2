import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hospital } from "src/app/models/hospital";
import { ResponseHospitalDetails } from "src/app/models/responseModel/responseHospitalDetails";
import { ResponseHospitalsAnalysis } from "src/app/models/responseModel/responseHospitalsAnalysis";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    /**
    * external api call
    * @const environment stores the external API base URL
    */
    private API_URL = `${environment.api_url}`;
    constructor(private _http: HttpClient) { }

    /**
     *  this method is used to send an HTTP POST request to an external API
     * @param hospital  contains the object 'hospital'
     * @returns  The method returns an observable of type hospital
     */
    createHospital(hospital: Hospital): Observable<Hospital> {
        return this._http.post<Hospital>(`${this.API_URL}/hospital`, hospital);
    }

    /**
     * this method i
     * @returns the method return an array hospitals
     */
    getHospitals(): Observable<Hospital[]> {
        return this._http.get<Hospital[]>(`${this.API_URL}/hospital`);
    }

    getHospitalDetails(hospitalID: string): Observable<ResponseHospitalDetails> {
        return this._http.get<ResponseHospitalDetails>(`${this.API_URL}/hospitalDetails/${hospitalID}`);
    }

    getHospitalAnalysis(): Observable<ResponseHospitalsAnalysis[]> {
        return this._http.get<ResponseHospitalsAnalysis[]>(`${this.API_URL}/hospitalAnalysis`);
    }

    getHospitalMostCases(): Observable<Hospital> {
        return this._http.get<Hospital>(`${this.API_URL}/hospitalMostCases`);
    }

}

