import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssignedSupplies } from "src/app/models/assignedSupplies";
import { Supply } from "src/app/models/suppliesWarehouse";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SuppliesWarehouseService {
    /**
    * external api call
    * @const environment stores the external API base URL
    */
    private API_URL = `${environment.api_url}`;
    constructor(private _http: HttpClient) { }

  
    getSuppliesWarehouse(): Observable<Supply[]> {
        return this._http.get<Supply[]>(`${this.API_URL}/supplies`);
    }

    createSupply(supply: Supply): Observable<Supply> {
        return this._http.post<Supply>(`${this.API_URL}/supply`, supply);
    }
}
