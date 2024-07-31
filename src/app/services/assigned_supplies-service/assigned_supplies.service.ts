import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssignedSupplies, AssignedSuppliesRequest } from "src/app/models/assignedSupplies";
import { ResponseProductMostAssigned } from "src/app/models/responseModel/responseproductMostAssigned";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AssignedSuppliesService {
    /**
    * external api call
    * @const environment stores the external API base URL
    */
    private API_URL = `${environment.api_url}`;
    constructor(private _http: HttpClient) { }

    createAssignedSupplies(assigneds: AssignedSuppliesRequest): Observable<AssignedSuppliesRequest> {
        return this._http.post<AssignedSuppliesRequest>(`${this.API_URL}/assignedSupplies`, assigneds);
    }

    updateSuppliesWarehouse(supplies: AssignedSupplies[]): Observable<boolean> {
        return this._http.put<boolean>(`${this.API_URL}/assignedSupplies`, supplies);

    }
    getproductMostAssigned(): Observable<ResponseProductMostAssigned> {
        return this._http.get<ResponseProductMostAssigned>(`${this.API_URL}/productMostAssigned`);

    }


}